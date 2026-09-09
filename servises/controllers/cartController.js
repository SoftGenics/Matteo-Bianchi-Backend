const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../models");

const Cart = db.Cart;

const Products = db.product;
const Bags = db.bagsDetails;
const Jewellery = db.jewelleryDetails;
const Footwear = db.footwearDetails;
const Clothing = db.clothingDetails;
const Eyewear = db.eyewearDetails;


// 🔥 Category ke according model
const categoryModels = {
    bags: Bags,
    jewellery: Jewellery,
    footwear: Footwear,
    clothing: Clothing,
    eyewear: Eyewear
};

// ---------------- MULTER STORAGE ----------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Sirf ek image
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
}).single("prescription");

// ---------------- MULTER STORAGE ----------------


// ======================================================
// ADD PRODUCT TO CART
// ======================================================

// const addProductToCart = async (req, res) => {
//     console.log("INFO -> ADD PRODUCT TO CART API CALLED");

//     try {

//         const userId = req.user && req.user.user_id;

//         const { power, productDetails } = req.body;
//         console.log("power", power);
//         console.log("productDetails", productDetails);

//         if (!power || !productDetails) {
//             return res.status(400).json({ message: "Invalid cart data!" });
//         }

//         const { add, axis, leftLens, rightLens, selectedLensOrProducrPrice, selectLansType, selectedType, prescription } = power;
//         const { CYL: leftCyl, SPH: leftSph } = leftLens || {};
//         const { CYL: rightCyl, SPH: rightSph } = rightLens || {};

//         const { mobile_number, product_id, main_category, productQuntity, image } = productDetails;


//         // ==================================================
//         // VALIDATION
//         // ==================================================

//         if (!product_id) {
//             return res.status(400).json({
//                 message: "product_id is required"
//             });
//         }


//         // ==================================================
//         // PRODUCT MODEL SELECT
//         // ==================================================

//         let ProductModel;

//         /*
//          if  main_category not available
//           =====================
//           => product table

//           main_category hai
//           =================
//           => respective category table
//         */

//         if (!main_category) {

//             ProductModel = Products;

//         } else {

//             ProductModel = categoryModels[main_category];

//             if (!ProductModel) {
//                 return res.status(400).json({
//                     message: "Invalid main_category"
//                 });
//             }
//         }


//         // ==================================================
//         // CHECK PRODUCT
//         // ==================================================

//         const product = await ProductModel.findByPk(product_id);

//         if (!product) {
//             return res.status(404).json({
//                 message: "Product not found"
//             });
//         }


//         // ==================================================
//         // SAME CART ITEM CHECK
//         // ==================================================

//         /*
//           Same user
//           Same product
//           Same category

//           Aur eyewear ke case me same prescription
//         */

//         const existingCartItem = await Cart.findOne({
//             where: {
//                 user_id: userId,
//                 product_id: product_id,
//                 main_category: main_category || null,
//                 Image: image,

//                 prescription: prescription || null,
//                 add: add || null,
//                 axis: axis || null,
//                 left_cyl: leftCyl || null,
//                 left_sph: leftSph || null,
//                 right_cyl: rightCyl || null,
//                 right_sph: rightSph || null,
//                 lens_type: selectLansType || null,
//                 price: selectedLensOrProducrPrice,
//                 lens_name: selectedType || null
//             }
//         });


//         // ==================================================
//         // ALREADY EXISTS
//         // ==================================================

//         if (existingCartItem) {

//             existingCartItem.quantity = Number(existingCartItem.quantity) + Number(productQuntity);

//             await existingCartItem.save();

//             return res.status(200).json({
//                 message: "Product quantity updated successfully",
//                 cart: existingCartItem
//             });
//         }


//         // ==================================================
//         // NEW CART ITEM
//         // ==================================================


//         const cartItem = await Cart.create({
//             user_id: userId,
//             product_id: product_id,
//             main_category: main_category || null,
//             Image: image,
//             quantity: productQuntity || 1,
//             mobile_num: mobile_number,

//             price: selectedLensOrProducrPrice,
//             prescription: prescription || null,

//             add: add || null,
//             axis: axis || null,

//             left_cyl: leftCyl || null,
//             left_sph: leftSph || null,

//             right_cyl: rightCyl || null,
//             right_sph: rightSph || null,

//             lens_type: selectLansType || null,
//             lens_name: selectedType || null
//         });


//         return res.status(201).json({
//             message: "Product added to cart successfully",
//             cart: cartItem
//         });


//     } catch (error) {

//         console.error("ADD CART ERROR:", error);

//         return res.status(500).json({
//             message: "Error while adding product to cart",
//             error: error.message
//         });
//     }
// };

const addProductToCart = async (req, res) => {
    console.log("INFO -> ADD PRODUCT TO CART API CALLED");

    upload(req, res, async (err) => {
        // Multer error
        if (err) {
            console.error("Multer error:", err);

            return res.status(400).json({
                message: "Image upload failed",
                error: err.message,
            });
        }

        try {

            const userId = req.user && req.user.user_id;

            let { power, productDetails } = req.body;

            // PARSE JSON DATA => power, productDetails

            if (typeof power === "string") {
                power = JSON.parse(power);
            }

            if (typeof productDetails === "string") {
                productDetails = JSON.parse(productDetails);
            }

            console.log("power", power);
            console.log("productDetails", productDetails);

            if (!power || !productDetails) {
                return res.status(400).json({ message: "Invalid cart data!" });
            }

            const { add, axis, leftLens, rightLens, selectedLensOrProducrPrice, selectLansType, selectedType } = power;
            const { CYL: leftCyl, SPH: leftSph } = leftLens || {};
            const { CYL: rightCyl, SPH: rightSph } = rightLens || {};

            const { mobile_number, product_id, main_category, productQuntity, image } = productDetails;

            // ==================================================
            // VALIDATION
            // ==================================================



            if (!product_id || !image || !selectedLensOrProducrPrice) {
                const imagePath = path.resolve(
                    "uploads",
                    req.file.filename
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }

                return res.status(400).json({
                    message: "product_id, price and link are required",
                });
            }

            // path of the uploaded prescription image
            const prescription = req.file ? `uploads/${req.file.filename}` : null;

            console.log("PRESCRIPTION PATH:", prescription);
            console.log("prescription", prescription);

            if (!product_id) {
                return res.status(400).json({
                    message: "product_id is required"
                });
            }


            // ==================================================
            // PRODUCT MODEL SELECT
            // ==================================================

            let ProductModel;

            /*
             if  main_category not available
              =====================
              => product table
    
              main_category available
              =================
              => respective category table
            */

            if (!main_category) {

                ProductModel = Products;

            } else {

                ProductModel = categoryModels[main_category.toLowerCase().trim()];

                if (!ProductModel) {
                    return res.status(400).json({
                        message: "Invalid main_category"
                    });
                }
            }


            // ==================================================
            // CHECK PRODUCT
            // ==================================================

            const product = await ProductModel.findByPk(product_id);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }


            // ==================================================
            // SAME CART ITEM CHECK
            // ==================================================

            /*
              Same user
              Same product
              Same category
    
              Aur eyewear ke case me same prescription
            */

            const existingCartItem = await Cart.findOne({
                where: {
                    user_id: userId,
                    product_id: product_id,
                    main_category: main_category || null,
                    Image: image,

                    prescription: prescription || null,
                    add: add || null,
                    axis: axis || null,

                    left_cyl: leftCyl || null,
                    left_sph: leftSph || null,

                    right_cyl: rightCyl || null,
                    right_sph: rightSph || null,

                    lens_type: selectLansType || null,
                    price: selectedLensOrProducrPrice,

                    lens_name: selectedType || null
                }
            });


            // ==================================================
            // ALREADY EXISTS
            // ==================================================

            if (existingCartItem) {

                existingCartItem.quantity = Number(existingCartItem.quantity) + Number(productQuntity);

                await existingCartItem.save();

                return res.status(200).json({
                    message: "Product quantity updated successfully",
                    cart: existingCartItem
                });
            }


            // ==================================================
            // NEW CART ITEM
            // ==================================================


            const cartItem = await Cart.create({
                user_id: userId,
                product_id: product_id,
                main_category: main_category || null,
                Image: image,
                quantity: productQuntity || 1,
                mobile_num: mobile_number,

                price: selectedLensOrProducrPrice,
                prescription: prescription || null,
                add: add || null,
                axis: axis || null,

                left_cyl: leftCyl || null,
                left_sph: leftSph || null,

                right_cyl: rightCyl || null,
                right_sph: rightSph || null,

                lens_type: selectLansType || null,
                lens_name: selectedType || null
            });




            return res.status(201).json({
                message: "Product added to cart successfully",
                cart: cartItem
            });

        } catch (error) {
            console.error("ADD CART ERROR:", error);

            // Error aane par uploaded image delete
            if (req.file) {
                const imagePath = path.resolve(
                    "uploads",
                    req.file.filename
                );

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            return res.status(500).json({
                message: "Error while adding product to cart",
                error: error.message
            });

        }
    });
};

// ======================================================
// GET CART PRODUCTS
// ======================================================

const getCartProduct = async (req, res) => {
    console.log("INFO -> GET CART API CALLED");

    try {
        const userId = req.user && req.user.user_id;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const cartItems = await Cart.findAll({
            where: {
                user_id: userId
            },
            order: [
                ["createdAt", "DESC"]
            ]
        });

        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({
                message: "Cart is empty",
                cartProducts: []
            });
        }

        const cartProducts = await Promise.all(
            cartItems.map(async (cartItem) => {

                let ProductModel;


                //   main_category NULL

                if (!cartItem.main_category) {
                    ProductModel = Products;
                } else {
                    ProductModel = categoryModels[cartItem.main_category];
                }

                let product = null;

                if (ProductModel) {
                    product = await ProductModel.findByPk(
                        cartItem.product_id
                    );
                }

                return {
                    // =========================
                    // CART DATA
                    // =========================
                    cart_id: cartItem.cart_id,
                    user_id: cartItem.user_id,
                    product_id: cartItem.product_id,
                    main_category: cartItem.main_category,
                    quantity: cartItem.quantity,
                    Image: cartItem.Image,
                    price: cartItem.price,
                    prescription: cartItem.prescription,

                    lens_type: cartItem.lens_type,
                    lens_name: cartItem.lens_name,
                    add: cartItem.add,
                    axis: cartItem.axis,
                    left_cyl: cartItem.left_cyl,
                    left_sph: cartItem.left_sph,
                    right_cyl: cartItem.right_cyl,
                    right_sph: cartItem.right_sph,

                    // =========================
                    // PRODUCT DATA
                    // =========================
                    product_title: product?.product_title || "",
                    name: product?.name || product?.product_title || "",

                    // पूरा product object agar future me chahiye
                    product: product
                };
            })
        );

        return res.status(200).json({
            message: "Cart products fetched successfully",
            cartProducts
        });

    } catch (error) {

        console.error("GET CART ERROR:", error);

        return res.status(500).json({
            message: "Error while fetching cart products",
            error: error.message
        });
    }
};

// ======================================================
// REMOVE PRODUCT FROM CART
// ======================================================

const removeProductFromCart = async (req, res) => {

    console.log("INFO -> REMOVE CART PRODUCT API CALLED");

    try {

        const userId = req.user.user_id;

        const {
            cart_id
        } = req.params;


        // ==================================================
        // FIND CART ITEM
        // ==================================================

        const cartItem = await Cart.findOne({
            where: {
                cart_id: cart_id,
                user_id: userId
            }
        });


        if (!cartItem) {

            return res.status(404).json({
                message: "Product not found in cart"
            });
        }


        // ==================================================
        // DELETE
        // ==================================================

        await cartItem.destroy();


        return res.status(200).json({
            message: "Product removed from cart successfully"
        });


    } catch (error) {

        console.error("REMOVE CART ERROR:", error);

        return res.status(500).json({
            message: "Error while removing product from cart",
            error: error.message
        });
    }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
    addProductToCart,
    getCartProduct,
    removeProductFromCart
};