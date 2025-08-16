
import React, { useState } from 'react';

export default function AddEntryModal({ onClose, onAdd }) {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr(null);
    if (!site || !password) return setErr('Site and password required');
    setLoading(true);
    try {
      await onAdd({ site, username, password });
      onClose();
    } catch (e) {
      setErr(e.message || 'Add failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-2">Add Password</h3>
        <input value={site} onChange={e => setSite(e.target.value)} placeholder="Site (e.g. Gmail)" className="w-full border p-2 rounded mb-2" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username (optional)" className="w-full border p-2 rounded mb-2" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded mb-2" />
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <div className="flex justify-end">
          <button onClick={onClose} className="px-3 py-1 mr-2">Cancel</button>
          <button onClick={submit} disabled={loading} className="px-3 py-1 bg-green-600 text-white rounded">{loading ? 'Adding...' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
}
