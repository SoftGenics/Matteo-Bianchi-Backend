// const { where } = require('sequelize');
const addressUser = require('../models/address')
const axios = require("axios");

let shiprocketToken = null;

const getPickupLocations = async () => {

    try {

        const token = await getToken();

        const response = await axios.get(
            "https://apiv2.shiprocket.in/v1/external/settings/company/pickup",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // console.log(
        //     "ALL PICKUP LOCATIONS:",
        //     JSON.stringify(response.data, null, 2)
        // );

        return response.data;


    } catch (error) {

        console.log(
            "Pickup Location Error:",
            error.response?.data || error.message
        );

    }
};

// GET USER ADDRESS
const getAddress = async (order) => {
    try {

        let address;

        if (order.selected_address_id) {

            address = await addressUser.findOne({
                where: {
                    addresses_id: order.selected_address_id
                }
            });

        } else {

            address = await addressUser.findOne({
                where: {
                    mobile_num: order.mobile_number
                },
                order: [["addresses_id", "DESC"]]
            });

        }

        if (!address) {
            throw new Error("Address not found");
        }

        return address;

    } catch (error) {

        console.log("Get Address Error:", error.message);
        throw error;

    }
};

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

        const address = await getAddress(order);


        const payload = {

            order_id: String(order.order_id),

            order_date: new Date().toISOString().split("T")[0],

            pickup_location: "warehouse",

            // CUSTOMER DETAILS

            billing_customer_name: address.contact_name,
            // billing_customer_name: address.name,

            billing_last_name: "",

            billing_address: address.address,

            billing_address_2: address.landmark || "",


            billing_city: address.city,

            billing_pincode: address.pincode,

            billing_state: address.state,

            billing_country: "India",


            billing_email: order.email || "",

            billing_phone: address.mobile_num,


            shipping_is_billing: true,


            // PRODUCT DETAILS

            order_items: [
                {
                    name: order.product_name || "Product",
                    sku: String(order.product_id || "SKU001"),
                    units: order.product_quantity || 1,
                    selling_price: order.selected_Lens_Or_ProductPrice
                }
            ],


            payment_method: order.payment_method === "COD" ? "COD" : "Prepaid",

            sub_total: order.selected_Lens_Or_ProductPrice,


            // PACKAGE DETAILS

            length: 10,

            breadth: 10,

            height: 5,

            weight: 0.5

        };


        console.log("Shiprocket Payload:", payload);



        const response = await axios.post("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
            payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        );
        console.log("Create Shipment Response:", response.data);
        return response.data;

    } catch (error) {

        console.log(
            "Shipment Create Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

// GENERATE AWB
const generateAWB = async (shipment_id) => {

    try {

        const token = await getToken();


        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",

            {
                shipment_id: shipment_id
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


        return response.data;


    } catch (error) {

        console.log(
            "AWB Generate Error:",
            error.response?.data || error.message
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

const generateLabel = async (shipment_id) => {

    const token = await getToken();

    const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/courier/generate/label",
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
};

const generateInvoice = async (shiprocketOrderId) => {

    const token = await getToken();

    const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
        {
            ids: [shiprocketOrderId]
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

}


module.exports = {
    getPickupLocations,
    shiprocketLogin,
    createShipment,
    generateAWB,
    generatePickup,
    trackShipment,
    generateLabel,
    generateInvoice
};



