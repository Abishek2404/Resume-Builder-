import app from '../server/src/app.js';
import connectDB from '../server/src/config/db.config.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
