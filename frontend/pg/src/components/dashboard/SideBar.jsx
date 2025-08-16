import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const features = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/dashboard/about" },
    { label: "Email Breach Check", path: "/dashboard/email-breach" },
    { label: "Fake Email Generator", path: "/dashboard/fake-email" },
    { label: "Permission Monitor", path: "/dashboard/permission-monitor" },
    { label: "Fingerprint Analyzer", path: "/dashboard/fingerprint" },
    { label: "Tracker Scanner", path: "/dashboard/tracker-scanner" },
    { label: "Password Vault", path: "/dashboard/vault" },
  ];

  const handleNavigate = (path) => {
    setSidebarOpen(false); // close sidebar

    // wait for sidebar animation (~0.5s)
    setTimeout(() => {
      navigate(path);
    }, 300); // match duration of sidebar animation
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "tween", duration: 0.3 } },
    closed: { x: -256, transition: { type: "tween", duration: 0.3 } },
  };

  return (
    <motion.aside
      initial="closed"
      animate={sidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 font-semibold text-gray-800">
        <div className="p-2 border-2 border-cyan-900 mb-0 rounded-4xl">
          {/* Logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11ZM7.52746 16H16.4725C16.2238 13.75 14.3163 12 12 12C9.68372 12 7.77619 13.75 7.52746 16Z"></path>
          </svg>
        </div>
      </div>

      <ul className="p-5 space-y-2">
        {features.map((feature, i) => (
          <li key={i}>
            <button
              onClick={() => handleNavigate(feature.path)}
              className="block w-full text-left p-2 rounded bg-gray-100 hover:bg-sky-200"
            >
              {feature.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
