import app from '../server/src/app.js';
import connectDB from '../server/src/config/db.config.js';

// Initialize the database connection.
// Mongoose will automatically buffer database queries until the connection is established.
connectDB().catch(console.error);

// Export the Express app directly so Vercel's Node.js runtime can handle the request lifecycle properly.
export default app;
