// components/dashboard/Navbar.jsx
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <nav className="bg-[#F5F1EB] shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
        <span className="bg-cyan-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
          V
        </span>
        Vigilant
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="bg-transparent border border-cyan-700 text-cyan-700 px-3 py-1 rounded hover:bg-cyan-700 hover:text-white transition"
        >
          ☰
        </button>
        <button
          onClick={logout}
          className="bg-cyan-700 text-white px-3 py-1 rounded hover:bg-cyan-800 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
