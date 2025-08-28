🔒 Vigilent – Your Personal Privacy Dashboard

Your one-stop solution to monitor, analyze, and protect your digital privacy.
Built with MERN Stack | Real-time Privacy Insights | Secure by Design

✅ Live Demo

🌐 Visit Vigilent

(Login or Register to explore all features)

✨ Features

✔ 📧 Email Breach Check – Instantly verify if your email is in a known data breach.
✔ 🕵️ Fake Email Generator – Generate disposable, anonymous emails for safe browsing.
✔ 🔐 Permission Monitor – Detect which sites have camera, mic, or location access & revoke them.
✔ 📡 Tracker Scanner – Scan websites for hidden tracking scripts.
✔ 🧬 Fingerprint Analyzer – Reveal your unique browser/device fingerprint & tracking risk.
✔ 🗄️ Password Vault – AES-256 encrypted password storage with PBKDF2 key strengthening.

⚡ Tech Stack

Frontend: React, TailwindCSS, Framer Motion
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT + React Context
Security: AES-256 Encryption, PBKDF2, External Privacy APIs

🚀 Planned Enhancements

✅ Dark Mode & PWA Support
✅ OAuth (Google Login)
✅ Export Privacy Data (CSV/JSON)
✅ Privacy Score & History Tracking

🛠 Setup Instructions
1. Clone the Repository
git clone https://github.com/twinklekhandekar/vigilent.git
cd vigilent

2. Install Dependencies
# Backend
cd server
npm install

# Frontend
cd client
npm install

3. Configure Environment Variables

Create .env files:

Backend (/server/.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app


Frontend (/client/.env)

VITE_API_BASE_URL=https://your-backend.onrender.com

4. Run the App
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev


🌍 Deployed Links

Frontend: https://vigilent-weld.vercel.app

Backend API: https://vigilent.onrender.com

🏗 Contributing

Pull requests are welcome. For major changes, please open an issue first.

📜 License

MIT License © 2025 Twinkle Khandekar
