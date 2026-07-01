const Order = require("../models/order");
const cashfreeModel = require("../models/cashfreeModel");

const { createShipment, generatePickup } = require("../services/shiprocketService");

const acceptOrder = async (req, res) => {

    try {

        const { orderId } = req.params;

        const order = await cashfreeModel.findByPk(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // already accepted
        if (order.status === "accepted") {
            return res.status(400).json({
                success: false,
                message: "Already accepted"
            });
        }

        // update local status
        order.status = "accepted";

        await order.save();

        // CREATE SHIPMENT
        const shipment = await createShipment(order);

        // shipment ids
        const shipment_id =
            shipment.shipment_id;

        const awb_code =
            shipment.awb_code;

        // save shipment details
        order.shipment_id = shipment_id;

        order.awb_code = awb_code;

        order.shipping_status = "pickup_pending";

        await order.save();

        // GENERATE PICKUP
        await generatePickup(shipment_id);

        return res.status(200).json({
            success: true,
            message: "Order Accepted & Pickup Generated",
            shipment
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    acceptOrder
};