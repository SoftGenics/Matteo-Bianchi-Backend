const { Cashfree, CFEnvironment } = require("cashfree-pg");
const crypto = require("crypto");

function generateOrderId() {
  return "ORDER_" + crypto.randomBytes(8).toString("hex");
}

// =========================
// ✅ Create Cashfree Order
// =========================
const cashfreePayment = async (req, res) => {
  console.log("Cashfree create order API hit");
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required!" });
  }

  try {
    const cf = new Cashfree(
      CFEnvironment.SANDBOX, // "PRODUCTION" for live
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    const orderId = generateOrderId();

    const request = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: "CUST_" + Date.now(),
        customer_email: "test@example.com",
        customer_phone: "9110189245",
      },
    };

    const response = await cf.PGCreateOrder(request);

    // 🔹 Always return order_id + payment_session_id
    res.json({
      order_id: orderId,
      payment_session_id: response.data?.payment_session_id,
      order_status: response.data?.order_status || null,
    });
  } catch (err) {
    console.error("Create Order Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Order creation failed",
      detail: err.response?.data || err.message,
    });
  }
};

// =============================
// ✅ Verify Cashfree Payment
// =============================
const cashfreeVerifyPayment = async (req, res) => {
  console.log("Cashfree verify API hit", req.body.orderId);
  try {
    const order_id = req.body.orderId;

    if (!order_id) {
      return res.status(400).json({ error: "orderId is required" });
    }

    const cf = new Cashfree(
      CFEnvironment.SANDBOX, // PRODUCTION in live
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    const response = await cf.PGOrderFetchPayments(order_id);

    // ✅ Success case: Always return 200
    res.status(200).json(response.data);

  } catch (err) {
    console.error("Verify Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Verification failed",
      detail: err.response?.data || err.message,
    });
  }
};

module.exports = { cashfreePayment, cashfreeVerifyPayment };
