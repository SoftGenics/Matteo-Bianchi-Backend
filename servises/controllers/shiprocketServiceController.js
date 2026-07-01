const axios = require("axios");

let shiprocketToken = null;

// LOGIN
const shiprocketLogin = async () => {
    try {

        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/auth/login",
            {
                email: process.env.SHIPROCKET_EMAIL,
                password: process.env.SHIPROCKET_PASSWORD
            }
        );

        shiprocketToken = response.data.token;

        return shiprocketToken;

    } catch (error) {
        console.log("Shiprocket Login Error", error.response?.data);
        throw error;
    }
};

// GET TOKEN
const getToken = async () => {

    if (!shiprocketToken) {
        await shiprocketLogin();
    }

    return shiprocketToken;
};

// CREATE SHIPMENT
const createShipment = async (order) => {

    try {

        const token = await getToken();

        const payload = {
            order_id: order.order_id,
            order_date: new Date(),

            pickup_location: "HOME",

            billing_customer_name: order.customer_name,

            billing_last_name: "",

            billing_address: order.address,

            billing_city: order.city,

            billing_pincode: order.pincode,

            billing_state: order.state,

            billing_country: "India",

            billing_email: order.email,

            billing_phone: order.phone,

            shipping_is_billing: true,

            order_items: order.items,

            payment_method: order.payment_method,

            sub_total: order.total,

            length: 10,
            breadth: 10,
            height: 5,
            weight: 0.5
        };

        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log(
            "Shipment Create Error",
            error.response?.data
        );

        throw error;
    }
};

// GENERATE PICKUP
const generatePickup = async (shipment_id) => {

    try {

        const token = await getToken();

        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
            {
                shipment_id: [shipment_id]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log(
            "Pickup Error",
            error.response?.data
        );

        throw error;
    }
};

// TRACK ORDER
const trackShipment = async (awb) => {

    try {

        const token = await getToken();

        const response = await axios.get(
            `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.log(
            "Tracking Error",
            error.response?.data
        );

        throw error;
    }
};

module.exports = {
    shiprocketLogin,
    createShipment,
    generatePickup,
    trackShipment
};



