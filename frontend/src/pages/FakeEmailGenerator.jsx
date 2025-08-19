// pages/FakeEmailGenerator.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Copy, Trash2, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from './config';

import DashboardLayout from "../components/dashboard/DashboardLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FakeEmailGenerator = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!user) {
      // Clear emails when no user is logged in
      setEmails([]);
      return;
    }

    fetchEmails();
  }, [user]);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/fake-emails/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
        
       );
      setEmails(res.data.emails);
    } catch (err) {
      setError("Failed to load emails");
      console.error(err); // log for debugging

    } finally {
      setLoading(false);
    }
  };

  const generateEmail = async () => {
    setProcessingId("generate");
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE_URL}/api/fake-emails/generate`, {},
        {headers:{Authorization:`Bearer ${token}`}}
      );
      setEmails((prev) => [res.data.email, ...prev]);
    } catch (err) {
      setError("Failed to generate email");
    } finally {
      setProcessingId(null);
    }
  };

  const deleteEmail = async (id) => {
    setProcessingId(id);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/api/fake-emails/${id}`,{
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      setEmails((prev) => prev.filter((email) => email._id !== id));
    } catch (err) {
      setError("Failed to delete email");
    } finally {
      setProcessingId(null);
    }
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setError(null);
      alert(`Copied ${email} to clipboard!`);
    });
  };

  const recentEmails = emails.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
    
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fake Email Generator</h2>
          <p className="text-gray-500 text-sm mb-6">
            Generate temporary emails to protect your real inbox from spam or for testing purposes.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
          )}

          <button
            onClick={generateEmail}
            disabled={processingId === "generate"}
            className="mb-6 flex items-center gap-2 px-6 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <RefreshCw className="w-4 h-4" />
            {processingId === "generate" ? "Generating..." : "Generate New Email"}
          </button>

          {loading ? (
            <p className="text-gray-600">Loading emails...</p>
          ) : emails.length === 0 ? (
            <p className="text-gray-600">No fake emails generated yet.</p>
          ) : (
            <ul className="space-y-4">
              {emails.map(({ _id, email, createdAt }) => (
                <li
                  key={_id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1 mb-2 md:mb-0">
                    <p className="font-mono text-gray-800 break-all">{email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => copyToClipboard(email)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                    <button
                      onClick={() => deleteEmail(_id)}
                      disabled={processingId === _id}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      {processingId === _id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Emails</h3>
          {recentEmails.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent emails</p>
          ) : (
            <ul className="space-y-2">
              {recentEmails.map(({ _id, email }) => (
                <li
                  key={_id}
                  className="flex justify-between items-center p-2 border rounded hover:bg-gray-50 transition"
                >
                  <p className="font-mono text-gray-800 text-sm truncate">{email}</p>
                  <button
                    onClick={() => copyToClipboard(email)}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FakeEmailGenerator;

