const { Cashfree, CFEnvironment } = require("cashfree-pg");
const { Sequelize, Op } = require("sequelize");
const crypto = require("crypto");
const cashfreeModel = require("../models/cashfreeModel");
const product = require("../models/eyewearModels/product")


function generateOrderId() {
  return "ORDER_" + crypto.randomBytes(8).toString("hex");
}

// =========================
// ✅ Create Cashfree Order
// =========================

// const cashfreePayment = async (req, res) => {
//   console.log("Cashfree create order API hit");
//   const { amount, mobile_number, email } = req.body;

//   if (!amount) {
//     return res.status(400).json({ message: "Amount is required!" });
//   }

//   try {
//     const cf = new Cashfree(
//       CFEnvironment.SANDBOX, // "PRODUCTION" for live
//       process.env.CASHFREE_APP_ID,
//       process.env.CASHFREE_SECRET_KEY
//     );

//     const orderId = generateOrderId();

//     const request = {
//       order_amount: amount,
//       order_currency: "INR",
//       order_id: orderId,
//       customer_details: {
//         customer_id: "CUST_" + Date.now(),
//         customer_email: "test@example.com",
//         customer_phone: "9110189245",
//       },
//     };

//     const response = await cf.PGCreateOrder(request);

//     // 🔹 Always return order_id + payment_session_id
//     res.json({
//       order_id: orderId,
//       payment_session_id: response.data?.payment_session_id,
//       order_status: response.data?.order_status || null,
//     });
//   } catch (err) {
//     console.error("Create Order Error:", err.response?.data || err.message);
//     res.status(500).json({
//       error: "Order creation failed",
//       detail: err.response?.data || err.message,
//     });
//   }
// };


// ============ cashfree localhost testing =============================

// const cashfreePayment = async (req, res) => {
//   console.log("Cashfree create order API hit");
//   const { amount, mobile_number, email } = req.body;

//   if (!amount) {
//     return res.status(400).json({ message: "Amount is required!" });
//   }

//   try {
//     const cf = new Cashfree(
//       CFEnvironment.SANDBOX, // 👉 PRODUCTION in live
//       process.env.CASHFREE_APP_ID,
//       process.env.CASHFREE_SECRET_KEY
//     );

//     const orderId = generateOrderId();

//     // ✅ Dynamic customer details
//     const customer_details = {
//       customer_id: "CUST_" + Date.now(),
//       ...(email && { customer_email: email }),
//       ...(mobile_number && { customer_phone: mobile_number }),
//     };

//     const response = await cf.PGCreateOrder({
//       order_amount: amount,
//       order_currency: "INR",
//       order_id: orderId,
//       customer_details: customer_details,
//     });

//     res.json({
//       order_id: orderId,
//       payment_session_id: response.data?.payment_session_id,
//       order_status: response.data?.order_status || null,
//     });
//   } catch (err) {
//     console.error("Create Order Error:", err.response?.data || err.message);
//     res.status(500).json({
//       error: "Order creation failed",
//       detail: err.response?.data || err.message,
//     });
//   }
// };

// const cashfreeVerifyPayment = async (req, res) => {
//   console.log("Cashfree verify API hit", req.body.orderId);

//   try {
//     const { checkoutData, selectedAddressId, orderId } = req.body;

//     const { power, product } = checkoutData || {};
//     if (!power || !product) {
//       return res.status(400).json({ message: "Invalid checkout data!" });
//     }

//     const { mobile_number, product_id, productQuntity } = product;
//     const { selectedLensOrProducrPrice } = power;

//     if (!orderId) {
//       return res.status(400).json({ error: "orderId is required" });
//     }

//     const cf = new Cashfree(
//       CFEnvironment.SANDBOX, // change to PRODUCTION in live
//       process.env.CASHFREE_APP_ID,
//       process.env.CASHFREE_SECRET_KEY
//     );

//     // ✅ Fetch Payment Status
//     const response = await cf.PGOrderFetchPayments(orderId);
//     const paymentData = response.data?.[0];

//     if (!paymentData) {
//       return res.status(404).json({ error: "Payment details not found" });
//     }

//     // ✅ payment success save in DB 
//     if (paymentData.payment_status === "SUCCESS") {
//       const savedCheckout = await cashfreeModel.create({
//         mobile_number,
//         product_id,
//         order_id: orderId,
//         payment_id: paymentData.cf_payment_id,  // ✅ Save payment_id
//         selected_Lens_Or_ProductPrice: selectedLensOrProducrPrice,
//         delivery_status: "Processing",
//         product_quantity: productQuntity,
//         selected_address_id: selectedAddressId,
//       });

//       // ✅ Console both
//       // console.log("💳 PaymentData from Cashfree:", paymentData);
//       // console.log("✅ Checkout Saved in DB:", savedCheckout.toJSON());

//       return res.status(200).json({
//         message: "✅ Payment Verified & Checkout Saved",
//         paymentData,
//         checkout: savedCheckout,
//       });
//     } else {
//       console.log("❌ Payment Failed/Not Successful:", paymentData);

//       return res.status(400).json({
//         message: "❌ Payment not successful",
//         paymentData,
//       });
//     }
//   } catch (err) {
//     console.error("Verify Error:", err.response?.data || err.message);
//     res.status(500).json({
//       error: "Verification failed",
//       detail: err.response?.data || err.message,
//     });
//   }
// };


// ===================== Cashfree start live payment ===================================
const cashfreePayment = async (req, res) => {
  console.log("Cashfree create order API hit");
  const { amount, mobile_number, email } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required!" });
  }

  try {
    const cf = new Cashfree(
      // CFEnvironment.SANDBOX, // 👉 PRODUCTION in live
      CFEnvironment.PRODUCTION,
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    const orderId = generateOrderId();

    // ✅ Dynamic customer details
    const customer_details = {
      customer_id: "CUST_" + Date.now(),
      ...(email && { customer_email: email }),
      ...(mobile_number && { customer_phone: mobile_number }),
    };

    const response = await cf.PGCreateOrder({
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: customer_details,
    });

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

const cashfreeVerifyPayment = async (req, res) => {
  console.log("Cashfree verify API hit", req.body.orderId);

  try {
    const { checkoutData, selectedAddressId, orderId } = req.body;

    const { power, product } = checkoutData || {};
    if (!power || !product) {
      return res.status(400).json({ message: "Invalid checkout data!" });
    }

    const { mobile_number, product_id, main_category, productQuntity } = product;
    const { selectedLensOrProducrPrice } = power;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    const cf = new Cashfree(
      // CFEnvironment.SANDBOX, // change to PRODUCTION in live
      CFEnvironment.PRODUCTION,
      process.env.CASHFREE_APP_ID,
      process.env.CASHFREE_SECRET_KEY
    );

    // ✅ Fetch Payment Status
    const response = await cf.PGOrderFetchPayments(orderId);
    const paymentData = response.data?.[0];

    if (!paymentData) {
      return res.status(404).json({ error: "Payment details not found" });
    }

    // ✅ payment success save in DB 
    if (paymentData.payment_status === "SUCCESS") {
      const savedCheckout = await cashfreeModel.create({
        mobile_number,
        product_id,
        main_category,
        order_id: orderId,
        payment_id: paymentData.cf_payment_id,  // ✅ Save payment_id
        selected_Lens_Or_ProductPrice: selectedLensOrProducrPrice,
        delivery_status: "Processing",
        product_quantity: productQuntity,
        selected_address_id: selectedAddressId,
      });

      // ✅ Console both
      // console.log("💳 PaymentData from Cashfree:", paymentData);
      // console.log("✅ Checkout Saved in DB:", savedCheckout.toJSON());

      return res.status(200).json({
        message: "✅ Payment Verified & Checkout Saved",
        paymentData,
        checkout: savedCheckout,
      });
    } else {
      console.log("❌ Payment Failed/Not Successful:", paymentData);

      return res.status(400).json({
        message: "❌ Payment not successful",
        paymentData,
      });
    }
  } catch (err) {
    console.error("Verify Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Verification failed",
      detail: err.response?.data || err.message,
    });
  }
};
// ===================== Cashfree start live payment end ===================================

const cashfreeUpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery_status, slug, tracking_number } = req.body;
    console.log("tracking_number", tracking_number)
    console.log("slug", slug)
    console.log("delivery_status", delivery_status)

    const order = await cashfreeModel.findOne({ where: { id } });
    if (!order) return res.status(404).json({ message: "Order not found!" });

    await order.update({
      delivery_status: delivery_status ?? order.delivery_status,
      slug: slug ?? order.slug,
      tracking_number: tracking_number ?? order.tracking_number
    });

    res.json({ message: "Order updated!", order });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getCashfreeOrderByMobile = async (req, res) => {
  const { mobile_number } = req.body;

  if (!mobile_number) {
    return res.status(400).json({ message: "Mobile number is required!" });
  }

  try {
    // Get the date exactly 1 year ago from today
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const orders = await cashfreeModel.findAll({
      where: {
        mobile_number,
        createdAt: { [Op.gte]: oneYearAgo } // Filter by last 1 year
      },
      order: [['createdAt', 'DESC']]
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found in the last year for this mobile number." });
    }

    res.status(200).json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    console.error("Error fetching order by mobile number:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCashfreeOrderById = async (req, res) => {
  const { id } = req.params;  // order id URL params se aayega

  if (!id) {
    return res.status(400).json({ message: "Order ID is required!" });
  }

  try {
    const order = await cashfreeModel.findOne({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ message: "No order found with this ID." });
    }

    res.status(200).json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const cashfreeDetails = async (req, res) => {
  try {
    const data = await cashfreeModel.findAll()
    if (!data) {
      return res.status(400).json({ error: 'lenskartCheckout details not found' });
    }
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// const bestsellerProduct = async (req, res) => {
//   try {
//     const topProducts = await cashfreeModel.findAll({
//       attributes: [
//         "product_id",
//         [Sequelize.fn("COUNT", Sequelize.col("product_id")), "total_count"]
//       ],
//       group: ["product_id"],
//       order: [[Sequelize.literal("total_count"), "DESC"]],
//       limit: 10
//     });

//     if (!topProducts.length) {
//       return res.status(404).json({ message: "No data found" });
//     }

//     const productIds = topProducts.map(item => item.product_id);

//     // ✅ Step 2: Get unique products from PRODUCT TABLE (NOT cashfreeModel)
//     const productsData = await product.findAll({
//       where: {
//         product_id: {
//           [Op.in]: productIds
//         }
//       }
//     });

//     res.status(200).json({
//       bestsellerProducts: productsData
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


const bestsellerProduct = async (req, res) => {
  try {

    // Step 1: Get Top 6 Most Sold product_id
    const topProducts = await cashfreeModel.findAll({
      attributes: [
        "product_id",
        [Sequelize.fn("COUNT", Sequelize.col("product_id")), "total_count"]
      ],
      group: ["product_id"],
      order: [[Sequelize.literal("total_count"), "DESC"]],
      limit: 10
    });

    let productIds = topProducts.map(item => item.product_id);

    // Step 2: Agar 6 se kam milte hain to random products add karo
    if (productIds.length < 6) {
      const remaining = 6 - productIds.length;

      const randomProducts = await product.findAll({
        where: {
          product_id: {
            [Op.notIn]: productIds
          }
        },
        order: Sequelize.literal("RAND()"),
        limit: remaining
      });

      const randomIds = randomProducts.map(p => p.product_id);
      productIds = [...productIds, ...randomIds];
    }

    // Step 3: Final Unique Product Data
    const finalProducts = await product.findAll({
      where: {
        product_id: {
          [Op.in]: productIds
        }
      }
    });

    res.status(200).json({
      bestsellerProducts: finalProducts
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  cashfreePayment,
  cashfreeVerifyPayment,
  cashfreeUpdateOrder,
  getCashfreeOrderById,
  getCashfreeOrderByMobile,
  cashfreeDetails,
  bestsellerProduct
};
