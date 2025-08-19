import React, { useState, useEffect } from "react";
import ToggleSwitch from "../components/common/ToggleSwitch";
import axios from "axios";
import DashboardLayout from "../components/dashboard/DashboardLayout";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';


const PermissionMonitor = () => {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState({
     name: "",
     camera: false, 
     microphone: false, 
     location: false, 
     contacts: false 
    });

    useEffect(() => {
      const fetchSites = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(`${API_BASE_URL}/api/permissions`,{
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log("Raw API response:", data);
          console.log("Is array?", Array.isArray(data));
          setSites(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Error fetching sites:", err);
        }
      };
      fetchSites();
    }, []);
    
  const handleToggle = async (id, field) => {
    setSites((prev) =>
      prev.map((site) =>
        site._id === id ? { ...site, [field]: !site[field] } : site
      )
    );

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/permissions/${id}`, { field },{
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Error toggling permission:", err);
    }
  };

  const handleAddSite = async () => {
    if (!newSite.name.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${API_BASE_URL}/api/permissions`, newSite, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSites((prev) => [...prev, data]);
      setNewSite({
        name: "",
        camera: false,
        microphone: false,
        location: false,
        contacts: false,
      });
    } catch (err) {
      console.error("Error adding site:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/permissions/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setSites((prev) => prev.filter((site) => site._id !== id));
    } catch (err) {
      console.error("Error deleting site:", err);
    }
  };

  return (

    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Permission Monitor</h2>
      <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New Site</h3>
    <input
      type="text"
      placeholder="Site/App Name"
      value={newSite.name}
      onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
      className="border p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    />

    <div className="flex flex-wrap gap-4 mb-4">
      {["camera", "microphone", "location", "contacts"].map((perm) => (
        <div key={perm} className="flex items-center gap-2 min-w-[120px]">
          <span className="whitespace-nowrap capitalize">{perm}</span>
          <ToggleSwitch
            isOn={newSite[perm]}
            handleToggle={() =>
              setNewSite({ ...newSite, [perm]: !newSite[perm] })}
          />
        </div>
      ))}
    </div>

    <button
      onClick={handleAddSite}
      className="w-full sm:w-auto bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition">
      Add Site
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {sites.map((site) => (
      <div
        key={site._id}
        className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-semibold">{site.name}</h3>
          <button
            onClick={() => handleDelete(site._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {["camera", "microphone", "location", "contacts"].map((perm) => (
            <div
              key={perm}
              className="flex items-center justify-between w-full"
            >
              <span className=" capitalize">{perm}</span>
              <ToggleSwitch
                isOn={site[perm]}
                handleToggle={() => handleToggle(site._id, perm)}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
</DashboardLayout>
  );
};

export default PermissionMonitor;


