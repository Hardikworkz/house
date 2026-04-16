const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const BOOKING_RECIPIENT = process.env.BOOKING_RECIPIENT || process.env.GMAIL_USER;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS blocked for this origin.'));
    },
  }),
);

app.use(bodyParser.json({ limit: '1mb' }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function sanitizeField(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/book-session', async (req, res) => {
  const name = sanitizeField(req.body.name);
  const email = sanitizeField(req.body.email);
  const phone = sanitizeField(req.body.phone);
  const tattooIdea = sanitizeField(req.body.tattooIdea);
  const dateTime = sanitizeField(req.body.dateTime);

  if (!name || !email || !phone || !tattooIdea || !dateTime) {
    res.status(400).json({ message: 'All booking fields are required.' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'Please provide a valid email address.' });
    return;
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    res.status(500).json({
      message: 'Mail service is not configured yet. Add GMAIL_USER and GMAIL_PASS to your .env file.',
    });
    return;
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: BOOKING_RECIPIENT,
    subject: `New Tattoo Booking: ${name}`,
    text: [
      'New Booking Details',
      `Client Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred Date & Time: ${dateTime}`,
      `Idea: ${tattooIdea}`,
    ].join('\n'),
    html: `
      <h2>New Booking Details</h2>
      <p><strong>Client Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Preferred Date & Time:</strong> ${escapeHtml(dateTime)}</p>
      <p><strong>Idea:</strong> ${escapeHtml(tattooIdea)}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending mail:', error);
    res.status(500).json({ message: 'Error sending mail' });
  }
});

app.use((error, _req, res, _next) => {
  if (error.message === 'CORS blocked for this origin.') {
    res.status(403).json({ message: error.message });
    return;
  }

  console.error('Unexpected server error:', error);
  res.status(500).json({ message: 'Unexpected server error' });
});

function startServer() {
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
