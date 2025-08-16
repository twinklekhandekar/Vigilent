import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <button
      className="bg-cyan-700 text-white px-6 py-3 rounded-xl hover:bg-cyan-800 transition"
      onClick={handleClick}
    >
      GET STARTED
    </button>
  );
};

export default DashboardButton;
