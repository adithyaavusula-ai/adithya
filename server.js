require('dotenv').config();

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const helmet    = require('helmet');
const path      = require('path');

const contactRoutes = require('./routes/contactRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ═══════════════════════════════════════════════
   SECURITY MIDDLEWARE
═══════════════════════════════════════════════ */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
        styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc:    ["'self'", "fonts.gstatic.com"],
        imgSrc:     ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  })
);

/* ═══════════════════════════════════════════════
   CORS
═══════════════════════════════════════════════ */
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept'],
  })
);

/* ═══════════════════════════════════════════════
   BODY PARSING
═══════════════════════════════════════════════ */
app.use(express.json({ limit: '10kb' }));          // parse JSON, limit payload size
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

/* ═══════════════════════════════════════════════
   TRUST PROXY (for accurate IP behind Nginx/Heroku)
═══════════════════════════════════════════════ */
app.set('trust proxy', 1);

/* ═══════════════════════════════════════════════
   STATIC FILES — serve the public folder
═══════════════════════════════════════════════ */
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
  })
);

/* ═══════════════════════════════════════════════
   API ROUTES
═══════════════════════════════════════════════ */
app.use('/api/contact', contactRoutes);

/* ═══════════════════════════════════════════════
   SERVER HEALTH CHECK
═══════════════════════════════════════════════ */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

/* ═══════════════════════════════════════════════
   SPA FALLBACK — serve index.html for all non-API routes
═══════════════════════════════════════════════ */
app.get('*', (req, res) => {
  // Only fallback for non-API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found.' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* ═══════════════════════════════════════════════
   GLOBAL ERROR HANDLER
═══════════════════════════════════════════════ */
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred.'
        : err.message,
  });
});

/* ═══════════════════════════════════════════════
   DATABASE CONNECTION + SERVER START
═══════════════════════════════════════════════ */
const startServer = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.warn(
        '⚠️  MONGO_URI not set in .env — running WITHOUT database. Contact forms will NOT be saved.'
      );
    } else {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB connected successfully');
    }

    app.listen(PORT, () => {
      console.log('');
      console.log('╔══════════════════════════════════════════════╗');
      console.log('║   🚀  Adithya Portfolio Server — Running     ║');
      console.log('╠══════════════════════════════════════════════╣');
      console.log(`║   🌐  http://localhost:${PORT}                   ║`);
      console.log(`║   📦  Environment: ${(process.env.NODE_ENV || 'development').padEnd(25)}║`);
      console.log(`║   🗄️   MongoDB: ${MONGO_URI ? 'Connected' : 'Not configured'}${' '.repeat(MONGO_URI ? 20 : 16)}║`);
      console.log('╚══════════════════════════════════════════════╝');
      console.log('');
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

/* ═══════════════════════════════════════════════
   GRACEFUL SHUTDOWN
═══════════════════════════════════════════════ */
process.on('SIGINT', async () => {
  console.log('\n📴 Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

startServer();
