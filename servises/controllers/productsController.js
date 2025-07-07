const registration = require('../models/registration');
const { Op, Sequelize } = require('sequelize');
const products = require('../models/product')
const Specification = require('../models/specification')
const offer = require('../models/offer')
const multer = require('multer');
const path = require('path');



// const productsData = async (req, res) => {

//     const product_categories = req.body.product_categories;
//     const brand_name = req.body.brand_name;
//     const brand_id = req.body.brand_id;
//     const place = req.body.place;
//     const product_title = req.body.product_title;
//     const product_description = req.body.product_description;
//     const product_price = req.body.product_price;
//     const discount_price = req.body.discount_price;
//     const discount_percentes = req.body.discount_percentes;
//     const color = req.body.color;
//     const image_url = req.files['image_url'][0].filename;
//     const product_ad = req.body.product_ad;
//     const count_in_stock = req.body.count_in_stock;
//     const offer = req.body.offer;
//     const rating = req.body.rating;

//     try {
//         // Check if all required fields are provided
//         if (!product_categories || !brand_name || !brand_id || !place || !product_title || !product_description
//             || !product_price || !discount_price || !discount_percentes || !color || !image_url
//             || !product_ad || !count_in_stock || !offer || !rating) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         // Create a new products 
//         const data = await products.create({
//             product_categories,
//             brand_name,
//             brand_id,
//             place,
//             product_title,
//             product_description,
//             product_price,
//             discount_price,
//             discount_percentes,
//             color,
//             image_url,
//             product_ad,
//             count_in_stock,
//             offer,
//             rating,
//         });

//         // Respond with the created banner
//         res.status(200).send(data);
//     } catch (error) {
//         console.error('Error creating carousel banner:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }

// const getAllData = async (req, res) => {
//     try {
//         const data = await products.findAll()
//         if (!data) {
//             return res.status(404).json({ error: 'Banner not found' });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         console.error('Error fetching products data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const fillterData = async (req, res) => {
//     try {
//         // Example query parameters: /api/products?product_categories=category&brand_name=brand1
//         const queryParameters = req.query;

//         // Build a filter object based on query parameters
//         const filter = {
//             [Op.or]: [],
//         };

//         // Check if product_categories is present and add it to the filter[Op.or] array
//         if (queryParameters.product_categories) {
//             filter[Op.or].push({ product_categories: queryParameters.product_categories });
//         }

//         // Check if brand_name is present and add it to the filter[Op.or] array
//         if (queryParameters.brand_name) {
//             filter[Op.or].push({ brand_name: queryParameters.brand_name });
//         }

//         if (queryParameters.discount_price) {
//             filter[Op.or].push({ discount_price: queryParameters.discount_price });
//         }

//         // Fetch products based on the filter
//         const data = await products.findAll({
//             where: filter,
//         });

//         // Respond with the filtered products
//         res.status(200).send(data);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// // ***************************************************************

// const getDataById = async (req, res) => {
//     const productId = req.params.id;
//     try {
//         const data = await products.findOne({ where: { id: productId } })
//         if (!data) {
//             return res.status(404).json({ error: 'product not found' });
//         }

//         res.status(200).send(data);
//     } catch (error) {
//         console.error('Error fetching product by ID:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const productDeleteById = async (req, res) => {
//     const productId = req.params.product_id;

//     try {
//         // Find the banner by its ID and delete it
//         const deletedProducts = await products.destroy({ where: { product_id: productId } });

//         if (!deletedProducts) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         // Respond with a success message
//         res.status(200).send({ id: productId, message: 'product deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting product by ID:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// const editProductById = async (req, res) => {
//     const productId = req.params.id;
//     const { product_categories,
//         brand_name,
//         brand_id,
//         place,
//         product_title,
//         product_description,
//         product_price,
//         discount_price,
//         discount_percentes,
//         color,
//         image_url,
//         product_ad,
//         count_in_stock,
//         offer,
//         rating, } = req.body;

//     try {
//         // Find the banner by its ID
//         const data = await products.findByPk(productId);

//         if (!data) {
//             return res.status(404).json({ error: 'Banner not found' });
//         }
//         // Update the banner's properties
//         await products.update({
//             product_categories,
//             brand_name,
//             brand_id,
//             place,
//             product_title,
//             product_description,
//             product_price,
//             discount_price,
//             discount_percentes,
//             color,
//             image_url,
//             product_ad,
//             count_in_stock,
//             offer,
//             rating,
//         }, {
//             where: {
//                 id: productId,
//             },
//         }
//         );

//         // Respond with the Product banner
//         const updatedData = await products.findByPk(productId);
//         res.status(200).json({ updatedProducts: updatedData, message: 'Products updated successfully' });
//     } catch (error) {
//         console.error('Error editing Product by ID:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Set the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});



const upload = multer({ storage: storage });

const Addproduct = async (req, res) => {
    try {
        upload.fields([
            { name: 'product_all_img', maxCount: 10 },
            { name: 'product_thumnail_img', maxCount: 10 },
            { name: 'ideal_for_img', maxCount: 10 },
            { name: 'work_for_img', maxCount: 1 },
            { name: 'video_url', maxCount: 1 },
            { name: 'video_thumbnail', maxCount: 1 },
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed' });
            }

            // Access the uploaded files via req.files
            const allimages = req.files['product_all_img']

            // console.log(allimages,'allimages')
            if (!allimages) {
                return res.status(400).json({ message: 'No files were uploaded for product_thumbnail_img' });
            }

            const allimagesUrls = allimages.map((allImage) => {
                return `uploads/${allImage.filename}`;
            });

            const thumbnailImage = req.files && req.files['product_thumnail_img'] ? req.files['product_thumnail_img'][0] : null;
            const idealForImage = req.files && req.files['ideal_for_img'] ? req.files['ideal_for_img'][0] : null;
            const workForImage = req.files && req.files['work_for_img'] ? req.files['work_for_img'][0] : null;

            const imageUrl = thumbnailImage ? `uploads/${thumbnailImage.filename}` : null;
            const imageUrlIdealFor = idealForImage ? `uploads/${idealForImage.filename}` : null;
            const imageUrlWorkFor = workForImage ? `uploads/${workForImage.filename}` : null;

            const ideal_for = idealForImage ? [{
                ideal_for_title: req.body.ideal_for_title || '', // Empty if not provided
                ideal_for_img: imageUrlIdealFor,
            }] : [];

            const product_work_for = workForImage ? [{
                work_for_title: req.body.work_for_title || '', // Empty if not provided
                work_for_img: imageUrlWorkFor,
            }] : [];

            // ✅ Handle video and thumbnail
            const videoFile = req.files['video_url']?.[0];
            const videoThumbnailFile = req.files['video_thumbnail']?.[0];

            const videoUrl = videoFile ? `uploads/${videoFile.filename}` : null;
            const videoThumbnailUrl = videoThumbnailFile ? `uploads/${videoThumbnailFile.filename}` : null;

            const colors = req.body.color ? JSON.parse(req.body.color) : []; // Parse JSON input

            // Parse lenshColor as an array
            // let lenshColor = [];
            // try {
            //     lenshColor = Array.isArray(req.body.lenshColor) ? req.body.lenshColor : JSON.parse(req.body.lenshColor);
            // } catch (error) {
            //     return res.status(400).json({ message: "Invalid frameColor format" });
            // }

            // Parse frameColor as an array
            // let frameColor = [];
            // try {
            //     frameColor = Array.isArray(req.body.frameColor) ? req.body.frameColor : JSON.parse(req.body.frameColor);
            // } catch (error) {
            //     return res.status(400).json({ message: "Invalid frameColor format" });
            // }

            // Create a new product record in the database
            const data = await products.create({

                // new update
                product_all_img: allimagesUrls || '', // Empty if no image is uploaded
                product_name: req.body.product_name || '', // Empty if not provided
                product_title: req.body.product_title || '',
                product_description: req.body.product_description || '',
                product_price: req.body.product_price || 0, // Default to 0 if not provided
                product_thumnail_img: imageUrl || '', // Empty if no image is uploaded
                product_ad: req.body.product_ad || false, // Default to false
                offer: req.body.offer || '',
                count_in_stock: req.body.count_in_stock || 0, // Default to 0

                // new update
                frame_shape: req.body.frame_shape || '',
                frem_type: req.body.frem_type || '',
                gender: req.body.gender || '',
                color: req.body.color || '',

                // Set rating and discount to null if not provided
                rating: req.body.rating ? req.body.rating : null,
                discount: req.body.discount ? req.body.discount : null,
                color: colors, // Save directly
                frameColor: req.body.frameColor,
                lenshColor: req.body.lenshColor,
                highlights: req.body.highlights || '',
                ideal_for: ideal_for.length ? ideal_for : null, // Set to null if no data
                product_work_for: product_work_for.length ? product_work_for : null, // Set to null if no data
                product_expiry_date: req.body.product_expiry_date || null, // Set to null if not provided
                product_categories: req.body.product_categories || '',
                brand_name: req.body.brand_name || '',
                brand_id: req.body.brand_id || null, // Nullable
                place: req.body.place || '',
                frameDescription: req.body.frameDescription || '',
                lensInformation: req.body.lensInformation || '',
                frameMaterial: req.body.frameMaterial || '',
                templeColor: req.body.templeColor || '',

                // ✅ Add these
                video_url: videoUrl,
                video_thumbnail: videoThumbnailUrl
            });

            return res.json({ message: 'Product added successfully', data: data });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getproduct = async (req, res) => {

    try {
        const limitedData = await products.findAll({
            include: [
                {
                    model: Specification, // Assuming you have a relationship between Products and Review
                },
                {
                    model: offer, // Assuming you have a relationship between Products and Review
                },
            ]
        });
        const product = limitedData.slice(0, 1000).map((item) => item);

        return res.status(200).send({
            success: 'success',
            result: product,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const newArrivel = async (req, res) => {
    try {
        // Step 1: Try to get latest products by date (e.g., createdAt or updatedAt)
        const latestProducts = await products.findAll({
            where: {
                createdAt: {
                    [Op.lte]: new Date(), // Optional: to ensure it's not future-dated
                },
            },
            include: [
                { model: Specification },
                { model: offer },
            ],
            order: [['createdAt', 'DESC']], // Order by latest
            limit: 10, // Get latest 10 products
        });

        // Step 2: If no latest products found, get random products instead
        let resultProducts = latestProducts;
        if (latestProducts.length === 0) {
            const randomProducts = await products.findAll({
                include: [
                    { model: Specification },
                    { model: offer },
                ],
                order: [Sequelize.literal('RAND()')], // For MySQL. Use RANDOM() for Postgres
                limit: 10,
            });
            resultProducts = randomProducts;
        }

        return res.status(200).send({
            success: 'success',
            result: resultProducts,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// const productdetail = async (req, res) => {
//     try {
//         const productId = req.params.productId;

//         let product = await products.findOne({
//             where: {
//                 product_id: productId
//             },
//             include: [
//                 {
//                     model: Specification, // Assuming you have a relationship between Products and Review
//                 },
//                 {
//                     model: offer, // Assuming you have a relationship between Products and Review
//                 },
//             ]
//         })

//         product = JSON.parse(JSON.stringify(product))

//         product.ideal_for = JSON.parse(JSON.stringify(product.ideal_for))


//         return res.status(200).send({
//             success: 'success',
//             result: product,
//         });


//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

const productdetail = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!productId || isNaN(Number(productId))) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Fetch product details
        let product = await products.findOne({
            where: { product_id: productId },
            include: [
                { model: Specification },
                { model: offer },
            ],
        });

        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        product = JSON.parse(JSON.stringify(product));

        const { frem_type, lens_type } = product; // Extract frem_type and lens_type

        // Fetch 4 suggested products based on frem_type or lens_type
        // const suggestedProducts = await products.findAll({
        //     where: {
        //         product_id: { [Op.ne]: productId }, // Exclude current product
        //         ...(product.frem_type || product.lens_type ? {
        //             [Op.or]: [
        //                 product.frem_type ? { frem_type: product.frem_type } : {},
        //                 product.lens_type ? { lens_type: product.lens_type } : {},
        //             ]
        //         } : {}) // Skip filtering if both values are null
        //     },
        //     limit: 4,
        //     order: [['createdAt', 'DESC']],
        // });

        // Step 1: Try to find products with matching frem_type or lens_type
        let suggestedProducts = await products.findAll({
            where: {
                product_id: { [Op.ne]: productId },
                [Op.or]: [
                    product.frem_type ? { frem_type: product.frem_type } : null,
                    product.lens_type ? { lens_type: product.lens_type } : null,
                ].filter(Boolean), // remove nulls
            },
            limit: 4,
            order: [['createdAt', 'DESC']],
        });

        // Step 2: If no matching products found, get 4 random products
        if (!suggestedProducts || suggestedProducts.length === 0) {
            suggestedProducts = await products.findAll({
                where: {
                    product_id: { [Op.ne]: productId },
                },
                limit: 4,
                order: Sequelize.literal('RAND()'), // MySQL only
            });
        }


        return res.status(200).send({
            success: 'success',
            result: product,
            suggestedProducts: JSON.parse(JSON.stringify(suggestedProducts)),
        });

    } catch (error) {
        console.error("Error in product detail:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const productDeleteById = async (req, res) => {
    const productId = req.params.product_id;

    try {
        // Find the banner by its ID and delete it
        const deletedProducts = await products.destroy({ where: { product_id: productId } });

        if (!deletedProducts) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Respond with a success message
        res.status(200).send({ id: productId, message: 'product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fillterData = async (req, res) => {
    try {
        // Example query parameters: /api/products?product_categories=category&brand_name=brand1
        const queryParameters = req.query;

        // Build a filter object based on query parameters
        const filter = {
            [Op.or]: [],
        };

        // Check if product_categories is present and add it to the filter[Op.or] array
        if (queryParameters.product_categories) {
            filter[Op.or].push({ product_categories: queryParameters.product_categories });
        }

        // Check if brand_name is present and add it to the filter[Op.or] array
        if (queryParameters.brand_name) {
            filter[Op.or].push({ brand_name: queryParameters.brand_name });
        }

        if (queryParameters.discount_price) {
            filter[Op.or].push({ discount_price: queryParameters.discount_price });
        }

        // Fetch products based on the filter
        const data = await products.findAll({
            where: filter,
        });

        // Respond with the filtered products
        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fillterDataget = async (req, res) => {
    try {
        const { fillterData, applyType } = req.body;
        let modifiedProducts = [];
        console.log(fillterData);
        console.log(applyType);

        // console.log(req.user.mobile_num);

        if (applyType === "product_price") {
            for (const eachFilter of fillterData) {
                const minimum = eachFilter.split('-')[0].split('.')[1]
                const maximum = eachFilter.split('-')[1].split('.')[1]

                const filteredProducts = await products.findAll({
                    where: {
                        [applyType]: {
                            [Op.between]: [minimum, maximum], // Case-insensitive filter with wildcard
                        },
                    },
                });

                const newProducts = filteredProducts.filter(
                    (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
                );

                modifiedProducts = [...modifiedProducts, ...newProducts];
            }
            res.status(200).send(modifiedProducts);

        } else if (applyType === "High Price") {
            const filteredProducts = await products.findAll({
                order: [['product_price', 'DESC']],
            });

            const newProducts = filteredProducts.filter(
                (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
            );

            modifiedProducts = [...modifiedProducts, ...newProducts];
            res.status(200).send(modifiedProducts);

        } else if (applyType === "Low Price") {
            const filteredProducts = await products.findAll({
                order: [['product_price', 'ASC']],
            });

            const newProducts = filteredProducts.filter(
                (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
            );

            modifiedProducts = [...modifiedProducts, ...newProducts];
            res.status(200).send(modifiedProducts);

        } else if (applyType === "Discount") {
            const filteredProducts = await products.findAll({
                order: [['discount', 'DESC']],
            });

            const newProducts = filteredProducts.filter(
                (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
            );

            modifiedProducts = [...modifiedProducts, ...newProducts];
            res.status(200).send(modifiedProducts);

        } else if (applyType === "Rating") {
            const filteredProducts = await products.findAll({
                order: [['rating', 'DESC']],
            });

            const newProducts = filteredProducts.filter(
                (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
            );

            modifiedProducts = [...modifiedProducts, ...newProducts];
            res.status(200).send(modifiedProducts);

        } else {
            // let modifiedProducts = [];
            for (const eachFilter of fillterData) {
                const filteredProducts = await products.findAll({
                    where: {
                        [applyType]: {
                            [Op.like]: `%${eachFilter}%`, // Case-insensitive filter with wildcard
                        },
                        createdAt: {
                            [Op.lt]: new Date(),
                            [Op.gt]: new Date(new Date() - 70 * 24 * 60 * 60 * 1000)
                        }
                    },
                });


                const newProducts = filteredProducts.filter(
                    (product) => !modifiedProducts.some((existingProduct) => existingProduct.product_id === product.product_id)
                );

                modifiedProducts = [...modifiedProducts, ...newProducts];
            }

            res.status(200).send(modifiedProducts);
        }
    } catch (error) {
        console.error("Error in fillterDataget:", error);
        res.status(500).send("Internal Server Error");
    }
};

const fillterNewData = async (req, res) => {
    try {
        const limitedData = await products.findAll({
            where: {
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - 180 * 24 * 60 * 60 * 1000)
                }
            },
        });
        const product = limitedData.slice(0, 100).map((item) => item);

        return res.status(200).send({
            success: 'success',
            result: product,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const editProduct = async (req, res) => {
    try {
        const productId = req.params.productId; // Get the product ID from the URL params
        console.log("productId1", productId)
        console.log("first", req.body)
        const {
            product_title,
            gender,
            lens_type,
            frem_type,
            highlights,
            product_price,
            count_in_stock,
            discount,
            color
        } = req.body; // Get fields to update from the request body

        const colors = req.body.color ? JSON.parse(req.body.color) : null; // Parse color JSON input if provided

        // // Find the product by ID
        const product = await products.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // // Update the product's details
        await product.update({
            product_title: product_title || product.product_title,
            product_price: product_price || product.product_price,
            count_in_stock: count_in_stock || product.count_in_stock,
            highlights: highlights || product.highlights,
            color: colors || product.color,
            lens_type: lens_type || product.lens_type,
            frem_type: frem_type || product.frem_type,
            gender: gender || product.gender,
            discount: discount || product.discount,
        });

        // Respond with the updated product details
        return res.status(200).json({ message: 'Product updated successfully', data: product });
        // return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error editing product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { Addproduct, getproduct, newArrivel, productdetail, fillterData, productDeleteById, fillterDataget, fillterNewData, editProduct }

// module.exports = { productsData, getAllData, fillterData, getDataById, productDeleteById, editProductById }

