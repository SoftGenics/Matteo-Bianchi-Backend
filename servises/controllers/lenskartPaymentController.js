const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const lenskartPayment = require('../models/lenskartPayment');
const lenskartCheckout = require('../models/lenskartCheckout')
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getLenskartPayment = async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ message: "Amount is required!" });
    }

    const options = {
        // amount: Number(amount) * 100,
        amount: Math.round(amount * 100), // Convert to smallest unit
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    try {
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

// const varifyLenskartPayment = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, checkoutData } = req.body;
//     // Save Checkout Data
//     // const { power, product, selectLansType, selectedLensOrProducrPrice, selectedType } = checkoutData;
//     // const { add, axis, leftLens, rightLens } = power;
//     // const { CYL: leftCyl, SPH: leftSph } = leftLens;
//     // const { CYL: rightCyl, SPH: rightSph } = rightLens;
//     // const { mobile_number, product_id } = product;

//     try {
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         if (expectedSign === razorpay_signature) {
//             const payment = new lenskartPayment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//             });
//             await payment.save();
//             res.json({ message: "Payment Successfully Verified" });
//         } else {
//             res.status(400).json({ message: "Payment Verification Failed!" });
//         }
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         res.status(500).json({ message: "Internal Server Error!" });
//     }
// };

const varifyLenskartPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, checkoutData, selectedAddressId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !checkoutData) {
        return res.status(400).json({ message: "Missing required data!" });
    }

    //Extract Checkout Data
    const {
        power, product
    } = checkoutData;


    if (!power || !product) {
        return res.status(400).json({ message: "Invalid checkout data!" });
    }

    const { add, axis, leftLens, rightLens, selectedLensOrProducrPrice, selectLansType, selectedType } = power;
    const { CYL: leftCyl, SPH: leftSph } = leftLens || {};
    const { CYL: rightCyl, SPH: rightSph } = rightLens || {};
    const { mobile_number, product_id, selectedColor, productQuntity } = product;
   
    try {
        // Verify Razorpay Signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ message: "Payment Verification Failed!" });
        }

        // Save Data to Database in a Transaction
        await lenskartPayment.sequelize.transaction(async (transaction) => {
            // Save Payment Data
            const payment = await lenskartPayment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            }, { transaction });

            // Save Checkout Data
            await lenskartCheckout.create({
                paymentId: payment.id, // Foreign key to Payment
                add: add,
                axis: axis,
                left_cyl: leftCyl,
                left_sph: leftSph,
                right_cyl: rightCyl,
                right_sph: rightSph,
                selectLansType: selectLansType,
                selected_Lens_Or_ProductPrice: selectedLensOrProducrPrice,
                selected_type: selectedType,
                mobile_number: mobile_number,
                product_id: product_id,
                delivery_status: "Processing",
                frem_color: selectedColor.frameColor,
                lens_color: selectedColor.lensColor,
                product_quantity: productQuntity,
                selected_address_id : selectedAddressId,
            }, { transaction });
        });

        // Respond to Client
        res.json({ message: "Payment Successfully Verified" });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

const paymentDetails = async (req, res) => {
    try {
        const data = await lenskartCheckout.findAll()
        if (!data) {
            return res.status(400).json({ error: 'lenskartCheckout details not found' });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getLenskartPayment,
    varifyLenskartPayment,
    paymentDetails
};
