const express    = require('express');
const rateLimit  = require('express-rate-limit');
const { handleContactForm } = require('../controllers/contactController');

const router = express.Router();

/* ─────────────────────────────────────────────
   Rate limiter: max 3 requests per 15 minutes
   per IP address — prevents spam & abuse
   ───────────────────────────────────────────── */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages from this IP. Please wait 15 minutes before trying again.',
  },
  handler: (req, res, next, options) => {
    console.warn(`⚠️  Rate limit exceeded: ${req.ip}`);
    res.status(429).json(options.message);
  },
  skip: (req) => process.env.NODE_ENV === 'development', // skip rate limit in dev
});

/* ─────────────────────────────────────────────
   POST /api/contact
   ───────────────────────────────────────────── */
router.post('/', contactLimiter, handleContactForm);

/* ─────────────────────────────────────────────
   Health check (useful for uptime monitors)
   ───────────────────────────────────────────── */
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Contact API is live.', timestamp: new Date().toISOString() });
});

module.exports = router;
