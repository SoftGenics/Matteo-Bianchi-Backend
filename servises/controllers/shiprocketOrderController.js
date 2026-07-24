const cashfreeModel = require("../models/cashfreeModel");

const { createShipment, generateAWB, generatePickup, getPickupLocations, generateLabel, generateInvoice, trackShipment } = require("../controllers/shiprocketServiceController");


const acceptOrder = async (req, res) => {

    try {
        getPickupLocations()
        const { order_id } = req.params;


        const order = await cashfreeModel.findOne({
            where: {
                order_id
            }
        });


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }


        // Already accepted check

        if (order.orderStatus === "accepted") {
            return res.status(400).json({
                success: false,
                message: "Order already accepted"
            });
        }



        // 1. CREATE SHIPMENT

        const shipment = await createShipment(order);

        const shipment_id = shipment.shipment_id;
        const shiprocket_order_id = shipment.order_id;


        console.log("Shipment ID:", shipment_id);



        // 2. SAVE ACCEPT + SHIPMENT DETAILS FIRST

        order.orderStatus = "accepted";

        order.shipment_id = shipment_id;

        order.delivery_status = "pickup_pending";


        await order.save();



        console.log("Shipment Saved");



        // 3. GENERATE AWB

        try {

            const awb = await generateAWB(shipment_id);

            console.log("AWB Response:", awb);

            // order.tracking_number = awb.awb_code || null;
            order.tracking_number = awb.response?.data?.awb_code || null;
            order.courier_name = awb.response?.data?.courier_name || null;

            await order.save();

        } catch (awbError) {
            console.log(
                // "AWB Failed:",
                "AWB :",
                awbError.response?.data || awbError.message
            );

        }


        // 4. GENERATE PICKUP

        try {

            await generatePickup(shipment_id);


        } catch (pickupError) {

            console.log(
                "Pickup Failed:",
                pickupError.response?.data || pickupError.message
            );

        }


        // 5. GENERATE LABEL

        try {

            const label = await generateLabel(shipment_id);

            console.log("Label Response:", label);
            console.log("Label:", JSON.stringify(label, null, 2));

            order.label_url = label.label_url || null;

            await order.save();

        } catch (labelError) {

            console.log(
                "Label Failed:",
                labelError.response?.data || labelError.message
            );

        }


        // 6. GENERATE INVOICE

        try {

            const invoice = await generateInvoice(shiprocket_order_id);

            console.log("Invoice Response:", invoice);
            console.log("Invoice:", JSON.stringify(invoice, null, 2));


            order.invoice_url = invoice.invoice_url || null;

            await order.save();

        } catch (invoiceError) {

            console.log(
                "Invoice Failed:",
                invoiceError.response?.data || invoiceError.message
            );

        }

        return res.status(200).json({
            success: true,
            message: "Order Accepted & Shipment Created",
            shipment
        });




    } catch (error) {


        console.log(
            "Accept Order Error:",
            error.response?.data || error.message
        );


        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const trackOrder = async (req, res) => {

    try {

        const { tracking_number } = req.body;
        // console.log("object", tracking_number)
        if (!tracking_number) {
            return res.status(400).json({
                success: false,
                message: "Tracking number is required"
            });
        }

        const tracking = await trackShipment(tracking_number);

        // 👇 FROM THIS LINE

        const order = await cashfreeModel.findOne({
            where: {
                tracking_number
            }
        });

        if (order) {

            const status = Number(
                tracking.tracking_data.shipment_status
            );

            switch (status) {

                case 42:
                    order.delivery_status = "picked_up";
                    break;

                case 18:
                    order.delivery_status = "in_transit";
                    break;

                case 17:
                    order.delivery_status = "out_for_delivery";
                    break;

                case 20:
                    order.delivery_status = "pickup_exception";
                    break;

                case 21:
                    order.delivery_status = "rto";
                    break;

                case 7:
                    order.delivery_status = "delivered";
                    break;

                default:
                    break;
            }

            await order.save();
        }

        // 👆 YAHI TAK

        return res.status(200).json({
            success: true,
            data: tracking
        });

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: error.response?.data || "Tracking failed"
        });
    }
};

module.exports = {
    acceptOrder,
    trackOrder
};