import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from '../components/dashboard/SideBar';
import DashboardHome from './DashboardHome';
import EmailBreachCheck from './EmailBreachCheck';
import PermissionMonitor from './permissionMonitor';
import Fingerprint from './Fingerprint';
import TrackerScanner from './TrackerScanner';
import VaultPage from './VaultPage';
import FakeEmailGenerator from './FakeEmailGenerator';
import About from './About';

import { pageVariants, pageTransition } from '../utils/animations';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      
      <main className="flex-1 p-6 bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <DashboardHome />
                </motion.div>
              }
            />
            <Route
              path="about"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="email-breach"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <EmailBreachCheck />
                </motion.div>
              }
            />
            <Route
              path="permission-monitor"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PermissionMonitor />
                </motion.div>
              }
            />
            <Route
              path="fingerprint"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Fingerprint />
                </motion.div>
              }
            />
            <Route
              path="tracker-scanner"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <TrackerScanner />
                </motion.div>
              }
            />
            <Route
              path="vault"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <VaultPage />
                </motion.div>
              }
            />
            <Route
              path="fake-email"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <FakeEmailGenerator />
                </motion.div>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;

