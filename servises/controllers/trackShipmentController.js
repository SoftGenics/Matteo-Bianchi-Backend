const axios = require("axios");

const trackShipment = async (req, res) => {
  const { courier, trackingNumber } = req.body;

  try {
    // STEP 1: Register tracking in AfterShip (only if not already exists)
    try {
      await axios.post(
        "https://api.aftership.com/v4/trackings",
        {
          tracking: {
            tracking_number: trackingNumber,
            slug: courier,
          },
        },
        {
          headers: {
            "aftership-api-key": process.env.AFTERSHIP_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      // Ignore error if tracking already exists
      if (err.response?.data?.meta?.code !== 4003) {
        throw err;
      }
    }

    // STEP 2: Fetch tracking info
    const response = await axios.get(
      `https://api.aftership.com/v4/trackings/${courier}/${trackingNumber}`,
      {
        headers: {
          "aftership-api-key": process.env.AFTERSHIP_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Tracking API error:", err.response?.data || err.message);
    res.status(400).json({
      message: "Error fetching tracking info",
      error: err.response?.data || err.message,
    });
  }
};


module.exports = { trackShipment };
