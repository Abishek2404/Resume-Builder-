# AI Resume Builder

A full-stack AI Resume Builder built with the MERN stack and powered by Google Gemini AI. It empowers job seekers to effortlessly create, optimize, and manage professional resumes.

## 🚀 Features

- **AI-Powered Content Generation:** Leverage Gemini AI to automatically generate professional summaries, experience bullet points, and skills based on your input.
- **Smart Formatting:** Seamlessly structure your resume for modern job applications.
- **PDF Export:** Export your polished resume directly to a clean, ATS-friendly PDF.
- **Secure User Authentication:** Create an account to save and manage multiple versions of your resume securely.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI Integration:** Google Gemini AI (via LangChain)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Deployment:** Vercel (Serverless Functions)

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Abishek2404/Resume-Builder-.git
cd Resume-Builder-
```

### 2. Install Dependencies

You'll need to install dependencies for both the frontend and the backend.

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### 4. Run the Application

You can run both the frontend and backend locally:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## ☁️ Deployment

This project is fully configured for deployment on **Vercel**. 
Simply connect your GitHub repository to Vercel, and ensure you add the Environment Variables under the project settings before deploying. The `vercel.json` file handles all routing and serverless backend configurations automatically.
