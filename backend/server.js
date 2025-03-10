const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const path = require('path');
const nlp = require('compromise'); // Import Compromise.js
const contactApi = require('./contactApi'); // Import contact API
const { resume } = require('./constants'); // Import resume data
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;
const projects = require('./projects');
const skills = require('./skills');

// Middleware
// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Allow requests from the frontend
  methods: ['GET', 'POST', 'OPTIONS'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json()); // Parse JSON request bodies

// **Serve Vue frontend**
const distPath = path.join(__dirname, '../frontend/dist');
app.use('/AI-Portfolio', express.static(distPath));

// Routes
app.get('/api/projects', (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/skills', (req, res) => {
  try {
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
    return "yearsOfExperience";
  }
  return "projects"; // Default to projects
};

// Handle preflight requests for /api/chat
app.options('/api/chat', (req, res) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

   // Validate the message
   if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing message in request body' });
  }

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
const contactRouter = require('./contactApi');
app.use('/api', contactRouter);

// Catch-all route to serve index.html for all frontend routes
// This handles the client-side routing for Vue app
app.get('/AI-Portfolio/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// **Fallback to index.html for Vue history mode**
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});