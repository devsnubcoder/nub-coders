import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const EMAIL_API_URL = 'https://mails.nubcoder.com/api/emails/send-api';
const EMAIL_API_KEY = 'nm_live_030ae0f292f6a7757ca18ca2ce2201e50a555e9413c7ebd4c787254d5fe251c4';
const FROM_EMAIL = 'support@nubcoder.com';
const TO_EMAIL = 'nubcoders@gmail.com';

router.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  }
  try {
    const response = await fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': EMAIL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Contact Form: ${subject}`,
        text: `\nNew Contact Form Submission\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n        `
      })
    });
    if (!response.ok) {
      return res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
    }
    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while sending your message' });
  }
});

export default router;
