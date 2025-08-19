// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Sidebar from '../components/dashboard/SideBar';
import { pageVariants, pageTransition } from '../utils/animations';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tip, setTip] = useState("");
  const [privacyScore, setPrivacyScore] = useState(87);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const navigate = useNavigate();

  const tips = [
    "Use unique passwords for each account.",
    "Enable two-factor authentication.",
    "Review app permissions regularly.",
    "Avoid using public Wi-Fi for sensitive activities.",
    "Keep your software up-to-date.",
  ];

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const firstName = user?.first_name || "User";

  return (
    <div
      className="min-h-screen flex bg-[#FFF9F3] relative"
      onClick={() => {
        if (sidebarOpen) setSidebarOpen(false);
      }}
    >
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      
      <motion.div
        style={{
          marginLeft: sidebarOpen ? 256 : 0,
          transform: sidebarOpen ? "scale(0.95)" : "scale(1)",
          transformOrigin: "left center",
          transition: "all 0.3s ease",
          initial:"initial",
          animate:"in",
          exit:"out",
          variants:{pageVariants},
          
        }}
        className="flex-1 flex flex-col min-h-screen"
      >
        
        <nav className="bg-[#F5F1EB] shadow-md px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
            <span className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
              V
            </span>
            Vigilant
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-transparent border border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-700 hover:text-white transition"
            >
              ☰
            </button>
            <button
              onClick={logout}
              className="bg-cyan-700 text-white px-3 py-1 rounded hover:bg-cyan-800 transition"
            >
              Logout
            </button>
          </div>
        </nav>

        
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">

            
            <div className="flex flex-col gap-6 h-full">
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white p-6 rounded-xl shadow-sm h-64"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/1200x/2f/57/1a/2f571a34d7334e863d41b7f09b35dd99.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="absolute top-4 left-4 text-gray-500 text-3xl">
                  Hello 👋,
                </span>
                <span className="absolute top-14 left-4 text-5xl font-bold text-cyan-900">
                  {firstName}
                </span>
                <div className="absolute top-4 right-4 text-right text-lg font-bold text-white">
                  {today}
                </div>
                <div className="absolute top-12 right-4 text-right text-lg font-mono font-bold text-white">
                  {time}
                </div>
              </motion.div>

              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-4 w-full bg-gradient-to-b from-cyan-100 via-white to-cyan-100"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1 ">
                 
                  {[
                    { icon: "🛡️", label: "Fake Email Generator", path: "/dashboard/fake-email" },
                    
                    { icon: "📡", label: "Tracker Scanner",path: "/dashboard/tracker-scanner" },
                    { icon: "📧", label: "Email Breach Check",path: "/dashboard/email-breach" },
                    { icon: "🔑", label: "Permission Monitor",path: "/dashboard/permission-monitor"  },
                    { icon: "🖐️", label: "Fingerprint Analyzer" ,path: "/dashboard/fingerprint"},
                    { icon: "🔒", label: "Password Vault",path: "/dashboard/vault" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      onClick={() => navigate(card.path)}
                      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center hover:scale-105 transition-transformn duration-300"
                    >
                      <div className="text-3xl">{card.icon}</div>
                      <p className="mt-2 font-semibold text-gray-800 text-center">
                        {card.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            
            <div className="flex flex-col gap-4 h-full">
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1"
              >

                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
                  <div className="relative w-28 h-28">
                    <svg className="w-28 h-28">
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke="#06b6d4"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * 0.25}
                        transform="rotate(-90 56 56)"
                      />
                    </svg>
                    <div className="absolute inset-4 rounded-full bg-[#FFF9F3] flex items-center justify-center text-3xl font-bold text-cyan-700">
                      75%
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 text-center font-medium">
                    Privacy Score
                  </p>
                </div>

                
                <div className="bg-gradient-to-r from-cyan-100 to-white p-7 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between h-full">
                  <h2 className="font-semibold text-lg mb-0.5">💡 Tip of the Day</h2>
                  <p className="text-gray-700 leading-snug">{tip}</p>
                </div>

                
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between">
                  <h2 className="font-semibold text-lg mb-2">🔒 Permissions</h2>
                  <p className="text-gray-600 mb-2">
                    5 apps with camera access
                  </p>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-cyan-500 rounded-full w-3/4"></div>
                  </div>
                </div>

                
                <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between">
                  <h2 className="font-semibold text-lg mb-2">🗝 Password Vault</h2>
                  <p className="text-gray-600 mb-2">12 passwords stored</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-cyan-500 rounded-full w-2/3"></div>
                  </div>
                </div>
              </motion.div>


<div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6 rounded-2xl shadow-lg text-white flex flex-col gap-6">
  
 
  <div className="flex justify-between items-center">
    <h2 className="font-bold text-lg">Activity Summary</h2>
    <span className="text-sm opacity-80">Last 24h</span>
  </div>
  <div className="grid grid-cols-3 gap-4 text-center">
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full mb-2">
        🛡️
      </div>
      <p className="text-sm font-semibold">5 Scans</p>
    </div>
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full mb-2">
        🔑
      </div>
      <p className="text-sm font-semibold">12 Passwords</p>
    </div>
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 rounded-full mb-2">
        📡
      </div>
      <p className="text-sm font-semibold">3 Trackers</p>
    </div>
  </div>



</div>

            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default Dashboard;





