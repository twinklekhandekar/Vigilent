
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
      
      
      const xposedUrl = `https://api.xposedornot.com/breached?email=${encodeURIComponent(email)}`;

     
      const response = await axios.get(xposedUrl, {
        headers: {
          "Authorization": `Bearer ${process.env.XPOSED_API_KEY}`,
          "user-agent": "PrivacyGuard-App",
        },
      });
      
      
      const breaches = response.data || [];

      return res.json({ breaches });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = {
    checkEmailBreach,
  };
  
