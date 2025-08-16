// components/dashboard/DashboardLayout.jsx
import { useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar"; // We'll make a reusable Navbar

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FFF9F3]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300`}
        style={{ marginLeft: sidebarOpen ? 256 : 0 }}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
