import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getCategoryColor = (category) => {
  const colors = {
    Advertising: 'bg-red-200 text-red-800',
    Analytics: 'bg-blue-200 text-blue-800',
    Social: 'bg-purple-200 text-purple-800',
    Fingerprinting: 'bg-orange-200 text-orange-800',
  };
  return colors[category] || 'bg-gray-200 text-gray-800';
};

const TrackerScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/tracker/scan`, { url });
      setResult(res.data);
    } catch (err) {
      setError('Failed to scan the site. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const useDemoUrl = () => {
    setUrl('https://www.nytimes.com');
  };

  const chartData = result
    ? {
        labels: [...new Set(result.trackers.map((t) => t.category))],
        datasets: [
          {
            data: [...new Set(result.trackers.map((t) => t.category))].map(
              (cat) => result.trackers.filter((t) => t.category === cat).length
            ),
            backgroundColor: ['#f87171', '#60a5fa', '#c084fc', '#fb923c', '#9ca3af'],
            borderWidth: 1
          }
        ]
      }
    : null;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Tracker & Cookie Scanner
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            For demo use, you can try scanning:
            <span
              className="text-cyan-600 font-medium cursor-pointer hover:underline ml-1"
              onClick={useDemoUrl}
            >
              https://www.nytimes.com
            </span>
          </p>

         
          <div className="bg-white p-5 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g. https://example.com)"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleScan}
              disabled={loading}
              className="px-5 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Scan'}
            </button>
          </div>

          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

         
          {result ? (
            <div className="bg-white p-5 rounded-xl shadow-md space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Results for{' '}
                    <span className="text-cyan-600">{result.scannedUrl}</span>
                  </h3>
                  {result.cookies && (
                    <p className="text-sm text-gray-600">
                      🍪 Cookies detected: {result.cookies.total} (Essential:{' '}
                      {result.cookies.essential}, Tracking:{' '}
                      {result.cookies.tracking})
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.totalTrackers > 0
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {result.totalTrackers} Tracker
                  {result.totalTrackers !== 1 ? 's' : ''}
                </span>
              </div>

              {result.totalTrackers > 0 ? (
                <div className="grid gap-4">
                  {result.trackers.map((t, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col gap-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-gray-800">{t.name}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(
                            t.category
                          )}`}
                        >
                          {t.category}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm break-words">
                        🌐 {t.domain}
                      </p>
                      {t.infoLink && (
                        <a
                          href={t.infoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-600 text-sm hover:underline"
                        >
                          More Info
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-600 font-medium">
                  ✅ No known trackers found on this site.
                </p>
              )}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-gray-500 text-center mt-10">
                Enter a website URL above and click <b>Scan</b> to check for trackers.
              </div>
            )
          )}
        </div>

        
        <div className="space-y-6 bg-cyan-700 rounded-2xl p-2 ">
         
          {result && result.totalTrackers > 0 && chartData && (
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tracker Categories
              </h3>
              <div className='h-48'>
              <Doughnut
                data={chartData}
                options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
                className='h-48'
              />
              </div>
            </div>
          )}

 
          <div className="bg-blue-50 p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Did you know?</h3>
            <p className="text-sm text-blue-800">
              Over 80% of websites use some form of tracker to monitor user behavior. 
              Many are for analytics, but some can track you across the entire web.
            </p>
          </div>

       
          <div className="bg-green-50 p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-green-900 mb-2">✅ What you can do</h3>
            <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
              <li>Use a privacy-focused browser or extension.</li>
              <li>Regularly clear cookies and site data.</li>
              <li>Opt out of non-essential cookies when prompted.</li>
            </ul>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default TrackerScanner;
