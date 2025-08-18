
const axios = require('axios');
const mockBreaches = [
    {
      name: "Mock Breach 1",
      description: "This is a demo breach for testing",
      breachDate: "2023-08-15",
    },
    {
      name: "Mock Breach 2",
      description: "Another demo breach",
      breachDate: "2022-12-01",
    },
  ];
  
  const checkEmailBreach = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (email === "test@example.com") {
      return res.json({ breaches: mockBreaches });
    }
  
    try {
      
  


      const headers = {
        "user-agent": "PrivacyGuard-App", // mandatory header for this API
      };
      // Here you can integrate real breach API like "HaveIBeenPwned"
      const response = await axios.get(
        `https://xposedornot.com/api/v1/check-email/${encodeURIComponent(email)}`,
        { headers, validateStatus: () => true }
      );

      
      
      const breaches = response.data?.breaches || [];

      return res.json({ breaches });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = {
    checkEmailBreach,
  };
  
