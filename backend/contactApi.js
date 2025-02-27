const express = require('express');
const fs = require('fs'); // For file system operations
const nodemailer = require('nodemailer'); // For sending emails (optional)
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Configure Nodemailer (optional)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Contact form endpoint
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all fields." });
  }

  // Create a contact object
  const contact = {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };

  // Save the contact to a JSON file (for local testing)
  fs.readFile('contacts.json', (err, data) => {
    let contacts = [];
    if (!err) {
      contacts = JSON.parse(data); // Load existing contacts
    }
    contacts.push(contact); // Add the new contact
    fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Error saving contact:', err);
        return res.status(500).json({ error: "Failed to save contact." });
      }

      // Send an email (optional)
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: "Failed to send message." });
        }
        res.json({ success: true, message: "Thank you for reaching out! I'll get back to you soon." });
      });
    });
  });
});

module.exports = router;