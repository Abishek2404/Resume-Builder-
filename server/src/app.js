// ============================================
// app.js - Express Application Setup
// ============================================
// Configures the Express app with CORS, body parsing,
// API routes, and error handling.
// ============================================

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express(); // Express app instance (Express.js: Application Setup)

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
].filter(Boolean);

// --- Middleware ---
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // JSON body parser (Express.js: Middleware)

// --- Routes ---
app.use('/api', routes); // Route mounting (Express.js: Route Organization)

// Root route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running...");
});


// --- Error Handling ---
app.use(notFoundHandler);
app.use(errorHandler);


export default app;
