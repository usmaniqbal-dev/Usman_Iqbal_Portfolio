const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../dist')));

// Create Nodemailer transporter
// Note: For production, use environment variables for sensitive data
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, message',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Email content - Sent to your email address
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'hackboy9870071@gmail.com', // Your email address to receive contact form submissions
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: rgba(255, 255, 255, 0.9);
              margin: 10px 0 0 0;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            }
            .field-label {
              font-weight: 600;
              color: #667eea;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
            }
            .message-box {
              background: #f0f4ff;
              padding: 20px;
              border-radius: 8px;
              margin-top: 10px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              color: #6c757d;
              font-size: 12px;
              margin: 0;
            }
            .timestamp {
              color: #6c757d;
              font-size: 12px;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Message</h1>
              <p>Someone contacted you through your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Sender Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Sender Email</div>
                <div class="field-value">
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                </div>
              </div>
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <div class="timestamp">
                Received on: ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio website contact form.</p>
              <p style="margin-top: 5px;">Portfolio URL: https://wmnogjp7uedwg.ok.kimi.link</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        NEW CONTACT FORM MESSAGE
        ========================
        
        From: ${name}
        Email: ${email}
        
        MESSAGE:
        ${message}
        
        ------------------------
        Received: ${new Date().toLocaleString()}
        From: Portfolio Website Contact Form
        ========================
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Contact form email sent successfully to hackboy9870071@gmail.com from ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Contact emails will be sent to: hackboy9870071@gmail.com`);
});

module.exports = app;
