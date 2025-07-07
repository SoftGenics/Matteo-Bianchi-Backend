const { Op } = require('sequelize');
const slider = require("../models/slider"); // Make sure this path matches your file structure

// CREATE SLIDER
const createSlider = async (req, res) => {
    try {
        const { slider_link, slider_name } = req.body;
        const slider_url = req.file ? req.file.filename : null;

        // Check if required fields are present
        if (!slider_link || !slider_name || !slider_url) {
            return res.status(400).json({ error: 'Missing required fields: slider_link, slider_name, or slider_url' });
        }

        // Create new slider
        const data = await slider.create({
            slider_link,
            slider_name,
            slider_url
        });

        return res.status(201).json({ success: true, message: "Slider created successfully!", data });
    } catch (error) {
        console.error("Error creating slider:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET ALL SLIDERS
const getSlider = async (req, res) => {
    try {
        const data = await slider.findAll(); // You can add sorting here if needed
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return res.status(500).json({ error: "Failed to fetch sliders" });
    }
};

const editSliderById = async (req, res) => {
    try {
        const { id } = req.params;
        const { slider_link, slider_name } = req.body;
        const slider_url = req.file ? req.file.filename : null;

        // Find the slider by ID
        const sliderData = await slider.findByPk(id);

        if (!sliderData) {
            return res.status(404).json({ error: 'Slider not found' });
        }

        // Update fields only if provided
        sliderData.slider_link = slider_link || sliderData.slider_link;
        sliderData.slider_name = slider_name || sliderData.slider_name;
        if (slider_url) {
            sliderData.slider_url = slider_url;
        }

        // Save updates
        await sliderData.save();

        return res.status(200).json({
            success: true,
            message: 'Slider updated successfully',
            data: sliderData,
        });
    } catch (error) {
        console.error('Error updating slider:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createSlider,
    getSlider,
    editSliderById
};
