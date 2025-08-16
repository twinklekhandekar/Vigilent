import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import heroBg from '../assets/bg.png';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Email Breach Check", description: "Quickly find if your email has been exposed in any data breaches.", icon: "shield-check" },
    { title: "Tracker Scanner", description: "Detect and block hidden trackers following your online activity.", icon: "eye-off" },
    { title: "Password Vault", description: "Securely store and manage your passwords in one encrypted place.", icon: "lock-password" },
    { title: "Permission Monitor", description: "View and control which websites have access to your camera, microphone, and location.", icon: "key" },
    { title: "Fake Email Generator", description: "Generate disposable email addresses to keep your real inbox safe from spam.", icon: "mail-add" },
    { title: "Fingerprint Analyzer", description: "Analyze and understand your browser’s unique fingerprint to protect your identity.", icon: "fingerprint" },
  ];

  return (
    <div className="min-h-screen font-roboto flex flex-col relative px-4 sm:px-1 lg:px-6">

      
      <header className="flex justify-between items-center py-0.1 z-20 relative">
        <div className="flex items-center gap-0.1">
          <img src={logo} alt="Vigilant Logo" className="w-16 sm:w-16 md:w-18 lg:w-20" />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e374f]">Vigilant</span>
        </div>
        <button
          className="bg-[#304357] text-white px-8 py-3 rounded-4xl hover:bg-[#1e2b38] transition text-lg sm:text-xl"
          onClick={() => navigate('/login')}
        >
          LOGIN <i className="ri-arrow-right-up-line"></i>
        </button>
      </header>

      
      <motion.section
        className="w-full h-[70vh] md:h-[50vh] flex flex-col items-center justify-center text-center relative min-h-[80vh] mb-10 rounded-2xl"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
      >
        <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2b3e51] mb-8 leading-tight">
            Privacy without Compromise.
          </h1>
          <button
  className="bg-[#304357] text-white group px-10 py-4 rounded-xl transition text-lg sm:text-xl md:text-2xl relative overflow-hidden"
  onClick={() => navigate('/register')}
>
  <div className="flex items-center justify-center gap-2">
    <span className="transition-transform duration-300 group-hover:translate-x-2">
      Get Started
    </span>
    <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-2"></i>
  </div>
</button>
</div>
</motion.section>

      <motion.section
        className="py-8 px-6 md:px-16 bg-white -mt-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
        >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">FEATURES</h2>
          <div className="w-16 h-1 bg-[#4A90E2] mx-auto mt-2 rounded-full"></div>
        </div>

        <motion.div className="grid gap-8 md:grid-cols-3 text-center" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow hover:shadow-lg transition border-2 border-blue-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <i className={`ri-${f.icon}-line text-4xl text-[#4A90E2] mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="py-16 bg-white px-6 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-center mb-15 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div className="p-6 bg-gray-50 rounded-xl shadow-2xl hover:shadow-md transition" variants={fadeUp}>
            <div className="text-blue-500 text-4xl mb-4"><i className="ri-search-eye-line"></i></div>
            <h3 className="font-semibold text-lg mb-2">1. Scan</h3>
            <p className="text-gray-600">Enter your email or run a privacy scan to detect breaches and risks instantly.</p>
          </motion.div>

          <motion.div className="p-6 bg-gray-50 rounded-xl shadow-2xl hover:shadow-md transition" variants={fadeUp}>
            <div className="text-blue-500 text-4xl mb-4"><i className="ri-shield-keyhole-line"></i></div>
            <h3 className="font-semibold text-lg mb-2">2. Analyze</h3>
            <p className="text-gray-600">We process your data securely using encryption and privacy-first algorithms.</p>
          </motion.div>

          <motion.div className="p-6 bg-gray-50 rounded-xl shadow-2xl hover:shadow-md transition" variants={fadeUp}>
            <div className="text-blue-500 text-4xl mb-4"><i className="ri-lightbulb-flash-line"></i></div>
            <h3 className="font-semibold text-lg mb-2">3. Insights</h3>
            <p className="text-gray-600">Get a detailed privacy report with clear steps to protect your accounts.</p>
          </motion.div>
        </div>
      </motion.section>

      
      <motion.section
        className="py-16 bg-gray-50 px-6 md:px-20 text-center rounded-xl mb-1 border-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Privacy, Our Priority</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Vigilant never stores your sensitive data. All scans are performed locally or through encrypted channels, ensuring your information stays secure and private.
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <i className="ri-lock-line text-blue-500 text-2xl"></i>
            <span>End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-shield-check-line text-blue-500 text-2xl"></i>
            <span>No Data Stored</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-global-line text-blue-500 text-2xl"></i>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-sky-200 text-white text-center px-6 md:px-20 rounded-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-4">Take Control of Your Privacy Today</h2>
        <p className="max-w-xl mx-auto mb-6">
          Join thousands of users protecting their digital lives with Vigilant. Get started for free and secure your data now.
        </p>
        <button
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          onClick={() => navigate('/register')}
        >
          Get Started <i className="ri-arrow-right-line ml-2"></i>
        </button>
      </motion.section>

     <footer className="bg-gray-900 text-gray-400 py-6 px-6 md:px-20 rounded-2xl mt-1 mb-1">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Vigilant. All rights reserved.</p>
          <p className="text-s mt-1">Created by <span className="font-semibold">Twinkle Khandekar</span></p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;




