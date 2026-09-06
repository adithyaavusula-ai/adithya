const nodemailer = require('nodemailer');
const mongoose   = require('mongoose');
const Contact    = require('../models/Contact');

/* ─────────────────────────────────────────────
   Nodemailer transporter
   Uses SMTP credentials from .env
   ───────────────────────────────────────────── */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',  // e.g. 'gmail', 'outlook'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  // Use an App Password for Gmail
    },
  });
};

/* ─────────────────────────────────────────────
   POST /api/contact
   ───────────────────────────────────────────── */
const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // ── 1. Server-side validation ──────────────
    const errors = {};

    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'A valid email address is required.';
    }
    if (!phone || !/^[0-9+\s\-()\\.]{7,20}$/.test(phone.trim())) {
      errors.phone = 'A valid phone number is required.';
    }
    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed. Please check your inputs.',
        errors,
      });
    }

    // ── 2. Save to MongoDB (only if connected) ────
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    let contact = null;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      contact = await Contact.create({
        name:      name.trim(),
        email:     email.trim().toLowerCase(),
        phone:     phone.trim(),
        subject:   subject ? subject.trim() : 'No Subject',
        message:   message.trim(),
        ipAddress: ip,
      });
      console.log(`✅ Contact saved [${contact._id}] from ${email}`);
    } else {
      console.warn(`⚠️  MongoDB not connected — skipping DB save for message from ${email}`);
    }

    // ── 3. Send notification email ─────────────
    try {
      const transporter = createTransporter();

      const mailOptions = {
        from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to:      process.env.EMAIL_RECEIVER || 'adithyaavusula@gmail.com',
        replyTo: email.trim(),
        subject: `📬 New Contact: ${subject || 'Portfolio Message'} — from ${name.trim()}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#06b6d4,#a855f7);padding:28px 32px;">
              <h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">New Portfolio Message</h1>
              <p style="margin:6px 0 0;opacity:.85;font-size:14px;color:#fff;">Someone reached out via your contact form</p>
            </div>
            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:10px 0;color:#94a3b8;font-weight:600;width:110px;">Name</td><td style="padding:10px 0;color:#f1f5f9;">${name.trim()}</td></tr>
                <tr><td style="padding:10px 0;color:#94a3b8;font-weight:600;">Email</td><td style="padding:10px 0;"><a href="mailto:${email.trim()}" style="color:#22d3ee;text-decoration:none;">${email.trim()}</a></td></tr>
                <tr><td style="padding:10px 0;color:#94a3b8;font-weight:600;">Phone</td><td style="padding:10px 0;color:#f1f5f9;">${phone.trim()}</td></tr>
                <tr><td style="padding:10px 0;color:#94a3b8;font-weight:600;">Subject</td><td style="padding:10px 0;color:#f1f5f9;">${subject || 'No Subject'}</td></tr>
                <tr><td style="padding:10px 0;color:#94a3b8;font-weight:600;vertical-align:top;">Message</td><td style="padding:10px 0;"></td></tr>
              </table>
              <div style="background:#1e293b;border-left:3px solid #22d3ee;padding:16px 20px;border-radius:0 8px 8px 0;margin-top:4px;">
                <p style="margin:0;color:#e2e8f0;line-height:1.7;white-space:pre-wrap;">${message.trim()}</p>
              </div>
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #334155;font-size:12px;color:#475569;">
                <p style="margin:0;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                <p style="margin:4px 0 0;">ID: ${contact ? contact._id : 'not-saved'} | IP: ${ip}</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Email notification sent to ${process.env.EMAIL_RECEIVER}`);
    } catch (emailErr) {
      // Don't fail the whole request if email fails — the data is saved
      console.error('⚠️  Email send failed:', emailErr.message);
    }

    // ── 4. Success response ────────────────────
    return res.status(201).json({
      success: true,
      message: 'Message received! Adithya will get back to you soon.',
      id: contact ? contact._id : null,
    });

  } catch (err) {
    console.error('❌ Contact form error:', err);

    // Handle MongoDB duplicate or validation errors gracefully
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(422).json({ success: false, message: messages.join(', ') });
    }

    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred. Please try again later.',
    });
  }
};

module.exports = { handleContactForm };
