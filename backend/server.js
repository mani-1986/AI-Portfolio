const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const nlp = require('compromise'); // Import Compromise.js
const contactApi = require('./contactApi'); // Import contact API
const { resume } = require('./constants'); // Import resume data
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Cache setup (1-hour TTL)
const cache = new NodeCache({ stdTTL: 3600 });

// Helper function to delay requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to extract keywords using NLP
const extractKeywords = (message) => {
  const doc = nlp(message); // Parse the message using Compromise.js
  const nouns = doc.nouns().out('array'); // Extract nouns (likely to be keywords)
  const adjectives = doc.adjectives().out('array'); // Extract adjectives
  return [...nouns, ...adjectives]; // Combine nouns and adjectives
};

// Function to identify the type of query
const identifyQueryType = (message) => {
  if (message.toLowerCase().includes("tell me about yourself")) {
    return "about";
  }
  if (message.toLowerCase().includes("experience")) {
    return "experience";
  }
  if (message.toLowerCase().includes("education")) {
    return "education";
  }
  if (message.toLowerCase().includes("skills")) {
    return "skills";
  }
  if (message.toLowerCase().includes("current project")) {
    return "currentProject";
  }
  if (message.toLowerCase().includes("years of experience")) {
    return "experienceYears";
  }
  return "projects"; // Default to projects
};

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // Check if the response is cached
  const cachedResponse = cache.get(message);
  if (cachedResponse) {
    return res.json({ response: cachedResponse });
  }

  // Identify the type of query
  const queryType = identifyQueryType(message);

  let botMessage = "";

  // Declare global variables for keywords and technology
  let keywords = [];
  let technology = "";

  // Handle different types of queries
  switch (queryType) {
    case "about":
      botMessage = resume.summary;
      break;

    case "experience":
      botMessage = resume.experience
        .map((exp) => `${exp.title} at ${exp.company} (${exp.duration}): ${exp.responsibilities.join(" ")}`)
        .join("\n");
      break;

    case "education":
      botMessage = resume.education
        .map((edu) => `${edu.degree} from ${edu.institution} (${edu.duration})`)
        .join("\n");
      break;

    case "skills":
      botMessage = `My skills include: ${resume.skills.join(", ")}.`;
      break;

    case "currentProject":
      botMessage = `My current project is ${resume.experience[0].responsibilities[0]}.`;
      break;

    case "experienceYears":
      // Extract the technology from the query
      keywords = extractKeywords(message);
      technology = keywords.find((keyword) =>
        Object.keys(resume.yearsOfExperience.technologies).some((tech) =>
          tech.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      if (technology) {
        const years = resume.yearsOfExperience.technologies[technology];
        botMessage = `I have ${years} years of experience with ${technology}.`;
      } else {
        botMessage = `I have ${resume.yearsOfExperience.total} years of total experience.`;
      }
      break;

    case "projects":
    default:
      // Filter projects based on extracted keywords
      keywords = extractKeywords(message);
      let filteredProjects = resume.experience.flatMap((exp) => exp.responsibilities);
      if (keywords.length > 0) {
        filteredProjects = filteredProjects.filter((project) =>
          keywords.some((keyword) =>
            project.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }

      // Create a context for the chatbot
      const context = `
        Here are some of my projects:
        ${filteredProjects.map((project) => `- ${project}`).join("\n")}
      `;

      try {
        // Add a delay to avoid hitting the rate limit
        await delay(1000); // 1-second delay

        // Call the OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: context }, // Provide context
              { role: 'user', content: message },   // User's question
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        );

        botMessage = response.data.choices[0].message.content;
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        botMessage = 'Sorry, something went wrong.';
      }
      break;
  }

  // Cache the response
  cache.set(message, botMessage);

  // Send the bot's response back to the frontend
  res.json({ response: botMessage });
});

// Use the contact API
app.use('/api', contactApi);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});