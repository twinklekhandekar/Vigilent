// src/pages/EmailBreachCheck.jsx
import React, { useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../utils/animations';
import Sidebar from '../components/dashboard/SideBar';


const EmailBreachCheck = () => {
  const [email, setEmail] = useState('test@example.com');
  const [history, setHistory] = useState([]);
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sortNewest, setSortNewest] = useState(true);
  const [filterDemo, setFilterDemo] = useState(false);

  const handleCheck = async () => {
    setChecked(false);
    setLoading(true);
    setBreaches([]);

    try {
      const res = await axios.post('http://localhost:5000/api/breach/check', { email });
      const fetchedBreaches = res.data.breaches || [];
      setBreaches(fetchedBreaches);

      
      setHistory(prev => [
        { email, breaches: fetchedBreaches, checkedAt: new Date().toLocaleString() },
        ...prev
      ]);
    } catch (err) {
      setBreaches([]);
      setHistory(prev => [
        { email, breaches: [], checkedAt: new Date().toLocaleString() },
        ...prev
      ]);
    } finally {
      setLoading(false);
      setChecked(true);
    }
  };

 
  const privacyScore = breaches.length === 0 ? 100 : Math.max(0, 100 - breaches.length * 15);


  const displayedBreaches =  Array.isArray(breaches)
  ? breaches
    .filter(b => (filterDemo ? b.name.toLowerCase().includes('mock') : true))
    .sort((a, b) =>
      sortNewest
        ? new Date(b.breachDate) - new Date(a.breachDate)
        : new Date(a.breachDate) - new Date(b.breachDate)
    )
    : [];

  return (
    <DashboardLayout>


         <motion.div
               style={{

                transformOrigin: "left center",
                
                initial:"initial",
                animate:"in",
                exit:"out",
                variants:{pageVariants},
                transition:{pageTransition}
              }}
      >
      <div className="flex flex-col lg:flex-row gap-6 p-6">
       
        <div className="flex-1 space-y-4 ">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Email Breach Checker</h2>
            <input
              type="email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleCheck}
              disabled={loading}
              className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Check Breaches'}
            </button>
          </div>

          
          {breaches.length > 0 && (
            <div className="flex items-center justify-between p-2">
              <div>
                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={filterDemo}
                    onChange={() => setFilterDemo(!filterDemo)}
                    className="mr-1"
                  />
                  Show Demo Only
                </label>
              </div>
              <button
                onClick={() => setSortNewest(!sortNewest)}
                className="text-sm text-blue-600 underline"
              >
                Sort by Date ({sortNewest ? 'Newest' : 'Oldest'})
              </button>
            </div>
          )}

          {!loading && checked && displayedBreaches.length === 0 && (
            <p className="mt-4 text-green-600 font-medium">
              No known breaches found for this email.
            </p>
          )}

          {displayedBreaches.length > 0 && (
            <div className="mt-6 space-y-3">
              {displayedBreaches.map((b, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-cyan-500"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{b.name}</h3>
                    <span className="text-sm text-gray-500">{b.breachDate}</span>
                  </div>
                  <p className="text-gray-600">{b.description}</p>
                  {b.name.toLowerCase().includes('mock') && (
                    <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
                      Demo Breach
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="p-4 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Privacy Score</h3>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-4 rounded-full ${
                  privacyScore > 70 ? 'bg-green-500' : privacyScore > 40 ? 'bg-yellow-400' : 'bg-red-500'
                }`}
                style={{ width: `${privacyScore}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{privacyScore}/100</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold mb-2">Breach History</h3>
            {history.length === 0 && <p className="text-gray-500 text-sm">No previous checks.</p>}
            {history.map((h, i) => (
              <div
                key={i}
                className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => { setEmail(h.email); setBreaches(h.breaches); setChecked(true); }}
              >
                <p className="font-medium">{h.email}</p>
                <p className="text-xs text-gray-500">{h.checkedAt} | Breaches: {h.breaches.length}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default EmailBreachCheck;



