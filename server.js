const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

// ------------------------------------
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(mongoSanitize());
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: 'healthy' });
});
// ------------------------------------------

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // data will be store in req.body
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Welcome to the hotel");
});

const personRoutes = require('./routes/personRoutes');
// app.use('/', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
// app.use('/', menuRoutes);

// -------------------------------
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
// server.js
app.use('/api/persons', personRoutes);  // All person routes start with /api/persons
app.use('/api/menu', menuRoutes);      // All menu routes start with /api/menu
// --------------------------------

// app.listen(PORT, () => {
//   console.log("listening on port 3000");
// });


// -------------------------------
// Server start
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
// -------------------------------