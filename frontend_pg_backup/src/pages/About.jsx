// About.jsx
import React from "react";
import { motion } from "framer-motion";
import DashboardButton from "../components/DashboardButton";

const features = [
    {
      icon: "🛡️",
      title: "Privacy Protection",
      description: "Monitor your digital footprint, manage trackers, and safeguard sensitive data from third-party access."
    },
    {
      icon: "📧",
      title: "Email Breach Check",
      description: "Instantly check if your email addresses have been involved in known data breaches and take preventive measures."
    },
    {
      icon: "🔑",
      title: "Password Vault",
      description: "Securely store and manage all your passwords in one encrypted vault, with easy access across devices."
    },
    {
      icon: "📡",
      title: "Tracker Scanner",
      description: "Scan websites and apps for hidden trackers and scripts that monitor your online behavior."
    },
    {
      icon: "🖐️",
      title: "Fingerprint Analyzer",
      description: "Analyze how websites uniquely identify your device using browser fingerprinting techniques and reduce your traceability."
    },
    {
      icon: "🔒",
      title: "Permission Monitor",
      description: "Track and control app permissions, including camera, microphone, location, and notifications, to maintain privacy."
    },
  ];
  

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F3] flex flex-col items-center p-6">
     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl text-center py-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Vigilant
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Your all-in-one privacy dashboard and security companion. Monitor, protect, 
          and gain insights into your online presence effortlessly.
        </p>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <p className="text-gray-700 text-lg text-center max-w-2xl">
          Ready to take control of your online privacy and security? Explore the dashboard 
          to start monitoring your accounts and activity today.
        </p>
       <DashboardButton />
      </motion.div>
    </div>
  );
};

export default About;
