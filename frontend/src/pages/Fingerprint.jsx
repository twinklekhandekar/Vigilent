import React, { useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Fingerprint = () => {
  const [fingerprintId, setFingerprintId] = useState(null);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  async function sha256Hex(msg) {
    const encoded = new TextEncoder().encode(msg);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function runFingerprint() {
    setError(null);
    setSaveMessage(null);
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      const rawData = JSON.stringify(result.components);
      const hashedId = await sha256Hex(rawData);

      setFingerprintId(hashedId);
      setFingerprintData(result.components);
    } catch (error) {
      console.error('Error running fingerprint:', error);
      setError('Failed to generate fingerprint.');
    }
  }

  function reset() {
    setFingerprintId(null);
    setFingerprintData(null);
    setError(null);
    setSaveMessage(null);
  }

  async function saveToBackend() {
    if (!fingerprintData) {
      alert('No fingerprint data to save.');
      return;
    }
    setSaving(true);
    setSaveMessage(null);
    setError(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/fingerprint`, {
        id: fingerprintId,
        data: fingerprintData,
        createdAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
      setSaveMessage('Fingerprint saved successfully.');
      console.log('Response from backend:', res.data);
    } catch (error) {
      console.error('Error sending to backend:', error);
      setSaveMessage('Failed to save fingerprint.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fingerprint Analyzer</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              className="px-5 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
              onClick={runFingerprint}
              disabled={saving}
            >
      Run Scan
    </button>
    <button
      className="px-5 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      onClick={reset}
      disabled={saving}
    >
      Reset
    </button>
  </div>

  {error && (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
  )}

  {fingerprintId ? (
    <>
      <div className="mb-3 font-mono break-all bg-gray-100 p-3 rounded-lg text-sm">
        {fingerprintId}
      </div>

      <pre className="bg-gray-50 p-3 rounded-lg max-h-72 overflow-auto text-xs">
        {JSON.stringify(fingerprintData, null, 2)}
      </pre>

      <div className="flex flex-wrap gap-3 mt-5">
        <button
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={() => {
            const blob = new Blob(
              [JSON.stringify({ id: fingerprintId, data: fingerprintData }, null, 2)],
              { type: 'application/json' }
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fingerprint-${fingerprintId}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          disabled={saving}
        >
          Export JSON
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          onClick={saveToBackend}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save to DB'}
        </button>
      </div>

      {saveMessage && (
        <div
          className={`mt-4 p-3 rounded-md ${
            saveMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}
        >
          {saveMessage}
        </div>
      )}
    </>
  ) : (
    <p className="text-gray-600 text-sm">Click "Run Scan" to generate fingerprint data.</p>
  )}
</div>

<div className=" bg-cyan-700 p-5 rounded-xl shadow-md">
          <div  className="bg-white p-5 rounded-xl shadow-md mb-3">
        <h3 className="text-lg font-semibold mb-2">What is Fingerprint?</h3>
        <p className="text-gray-700 text-sm">
          A browser fingerprint is a collection of information from your device and browser
          that uniquely identifies you online. It includes your OS, browser, screen size,
          fonts, language, timezone, installed plugins, and more. Even without cookies,
          trackers can use this data to recognize and track your device across websites.
        </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
        {fingerprintData && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-md font-semibold mb-1">Uniqueness Score</h3>
          <p className="text-sm text-gray-700">
            This score indicates how unique your fingerprint is compared to other users.
            The higher the score, the easier it is to track you.
          </p>
          <div className="mt-2 w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div className="bg-cyan-600 h-3 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      )}

        </div>
</div>
</div>

    </DashboardLayout>
  );
};

export default Fingerprint;