import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const API_BASE = `${API_BASE_URL}/vault`;

export default function VaultPage() {
  const { token } = useAuth();
  const [password, setPassword] = useState('');
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [appPass, setAppPass] = useState('');
  const [entries, setEntries] = useState([]);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [stats, setStats] = useState({ total: '--', lastAdded: '--', mostUsed: '--' });

  const handleVerify = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = { password };
      const res = await axios.post(
        `${API_BASE}/verify`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setVerified(true);
        setStatus('Vault unlocked ✅');
      } else {
        setStatus(res.data.message || 'Invalid password');
      }
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error verifying vault');
    }
    setLoading(false);
  };

  const fetchEntries = async () => {
    if (!verified) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/entries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data || []);
      updateStats(res.data || []);
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error fetching entries');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
     // 👈 add thi
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((item) => item._id !== id));
      setStatus('Entry deleted ✅');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error deleting entry');
    }
    setLoading(false);
  };

  const updateStats = (entries) => {
    if (!entries.length) {
      setStats({ total: 0, lastAdded: '--', mostUsed: '--' });
      return;
    }
    const total = entries.length;
    const lastAdded = new Date(entries[entries.length - 1].createdAt).toLocaleDateString();
    const siteCount = {};
    entries.forEach((e) => (siteCount[e.siteName] = (siteCount[e.siteName] || 0) + 1));
    const mostUsed = Object.entries(siteCount).sort((a, b) => b[1] - a[1])[0][0];
    setStats({ total, lastAdded, mostUsed });
  };

  useEffect(() => {
    if (verified) fetchEntries();
  }, [verified]);

  const handleAdd = async () => {
    if (!verified) return setStatus('Please verify vault first');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE}/add`,
        { siteName, username, password: appPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus(res.data.message || 'Entry added');
      setSiteName('');
      setUsername('');
      setAppPass('');
      fetchEntries();
    } catch (err) {
      setStatus(err.response?.data?.message || 'Error adding entry');
    }
    setLoading(false);
  };

  const toggleShowPassword = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const LockIcon = () => (
    <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.073 10.073 0 012.471-4.042M3 3l18 18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.477 10.477a3 3 0 014.243 4.243" />
    </svg>
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <LockIcon /> Password Vault
        </h1>

        {!verified && (
          <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Securely store your passwords</h2>
              <p className="text-gray-500 mb-4">
                Enter your account password to unlock the vault and manage your saved credentials.
              </p>
              <input
                type="password"
                placeholder="Account password"
                className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-800 transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Unlock Vault'}
              </button>
              {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
            </div>
            <div className=" hidden md:block flex-1 text-center">
                <div className=' bg-cyan-900 p-13 rounded-2xl'>
                <h1 className='text-white font-bold text-2xl'>“Your passwords are securely stored and encrypted. Unlock to manage your secrets safely.”</h1>
                </div>
            </div>
          </div>
        )}

        {!verified && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Total Entries</p>
              <p className="font-bold text-xl">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Last Added</p>
              <p className="font-bold text-xl">{stats.lastAdded}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Most Used Site</p>
              <p className="font-bold text-xl">{stats.mostUsed}</p>
            </div>
          </div>
        )}

        {verified && (
          <>
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Site name"
                className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type={showPassword['new'] ? 'text' : 'password'}
                placeholder="Password"
                className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={appPass}
                onChange={(e) => setAppPass(e.target.value)}
              />
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                disabled={loading}
              >
                Add
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {entries.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-6">No entries found</p>
              ) : (
                entries.map((entry, i) => (
                  <div
                    key={entry._id}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between relative"
                  >
                            <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{entry.siteName}</h3>
          <button
            onClick={() => handleDelete(entry._id)}
            className="text-red-500 hover:text-red-700"
          >
            
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Username:</span> {entry.username}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <span className="font-semibold">Password:</span>
                      <span>{showPassword[entry._id] ? entry.password : '••••••••'}</span>
                      <button
                        onClick={() => toggleShowPassword(entry._id)}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        {showPassword[entry._id] ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {status && verified && <p className="mt-4 text-sm text-gray-600">{status}</p>}
      </div>
    </DashboardLayout>
  );
}
