const db = require('../../models');
const ExtraOffers = require("../../models/bargainModels/extraOffers");
const BargainAttempts = require("../../models/bargainModels/bargainAttempts");


const Jewellery = db.jewelleryDetails;
const Clothings = db.clothingDetails;
const Footwear = db.footwearDetails;
const Eyewear = db.eyewearDetails;
const Purse = db.bagsDetails;
const Products = db.product;


exports.createExtraOffer = async (req, res) => {
  try {
    const {
      main_category,
      max_discount_percent,
      attempt_limit,
      counter_buffer,
    } = req.body;

    const alreadyExist = await ExtraOffers.findOne({
      where: { main_category },
    });

    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: "Offer already exists for this category.",
      });
    }

    const offer = await ExtraOffers.create({
      main_category,
      max_discount_percent,
      attempt_limit,
      counter_buffer,
      status: true,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully.",
      data: offer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllExtraOffers = async (req, res) => {
  try {
    const offers = await ExtraOffers.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: offers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateExtraOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await ExtraOffers.findByPk(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    await offer.update(req.body);

    res.status(200).json({
      success: true,
      message: "Offer updated successfully.",
      data: offer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteExtraOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await ExtraOffers.findByPk(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found.",
      });
    }

    await offer.destroy();

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// exports.checkBargain = async (req, res) => {
//   try {
//     const { user_id, product_id, main_category, offer_price } = req.body;

//     if (!user_id || !product_id || !offer_price) {
//       return res.status(400).json({
//         success: false,
//         message: "user_id, product_id and offer_price are required"
//       });
//     }


//     // ==============================
//     // 2. CATEGORY → MODEL MAP
//     // ==============================

//     const productModels = {
//       products: Products,
//       footwear: FootwearDetails,
//       jewellery: JewelleryDetails,
//       purse: PurseDetails,
//       clothing: ClothingDetails
//     };


//     // ===================================
//     // 3. PRODUCT FIND 
//     // ===================================

//     let product;
//     let finalCategory = main_category;


//     // if main_category available, find in respective table
//     if (main_category) {

//       const ProductModel = productModels[main_category];

//       if (!ProductModel) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid main category"
//         });
//       }

//       product = await ProductModel.findByPk(
//         product_id
//       );

//     } else {

//       // main_category not provided, find in products table first
//       product = await Products.findByPk(
//         product_id
//       );

//     }


//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }


//     // ===================================
//     // 4. PRODUCT PRICE
//     // ===================================

//     // products table → product_price
//     // baaki table → price

//     const originalPrice = Number(
//       product.product_price || product.price
//     );


//     if (!originalPrice) {
//       return res.status(400).json({
//         success: false,
//         message: "Product price is invalid"
//       });
//     }


//     // ===================================
//     // 5. CATEGORY OFFER SETTINGS
//     // ===================================

//     const offerSettings = await ExtraOffers.findOne({
//       where: {
//         main_category: finalCategory,
//         status: true
//       }
//     });


//     if (!offerSettings) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Bargaining is not available for this category"
//       });
//     }


//     // ===================================
//     // 6. USER ATTEMPT COUNT
//     // ===================================

//     const totalAttempts = await BargainAttempts.count({
//       where: {
//         user_id,
//         product_id,
//         main_category: finalCategory
//       }
//     });


//     // Attempt limit check

//     if (totalAttempts >= offerSettings.attempt_limit) {
//       return res.status(403).json({
//         success: false,
//         result: "limit_reached",
//         message:
//           `You have used all ${offerSettings.attempt_limit} bargain attempts`,
//         attempts_left: 0
//       });
//     }


//     // ===================================
//     // 7. MINIMUM ACCEPT PRICE
//     // ===================================

//     const maxDiscount = Number(
//       offerSettings.max_discount_percent
//     );


//     const minimumPrice = originalPrice - (originalPrice * maxDiscount / 100);

//     const userOffer = Number(offer_price);


//     let result;
//     let message;
//     let counterOffer = null;


//     // ===================================
//     // 8. BARGAIN CONDITION
//     // ===================================

//     // if User offer is greater than or equal to original price, accept the offer

//     if (userOffer >= originalPrice) {
//       result = "accepted";
//       message = "Offer accepted successfully";
//     }

//     // if User minimum 

//     else if (userOffer >= minimumPrice) {
//       result = "accepted";
//       message = "Congratulations! Your offer is accepted";
//     }

//     // User minimum offer is less than minimum price but greater than or equal to minimum price - counter_buffer
//     // Counter offer is given to the user

//     else if (userOffer >= minimumPrice - Number(offerSettings.counter_buffer)) {
//       result = "counter";
//       counterOffer = Number(minimumPrice.toFixed(2));
//       message = `We can offer this product for ₹${counterOffer}`;
//     }

//     // Offer is too low, reject the offer
//     else {
//       result = "rejected";
//       message = "Your offer is too low. Please try again";
//     }


//     // ===================================
//     // 9. SAVE BARGAIN ATTEMPT
//     // ===================================

//     const attempt = await BargainAttempts.create({
//         user_id,
//         product_id,
//         main_category: finalCategory,
//         offer_price: userOffer,
//         result,
//         attempt_no: totalAttempts + 1
//       });


//     // ===================================
//     // 10. RESPONSE
//     // ===================================

//     return res.status(200).json({
//       success: true,
//       message,
//       result,
//       offer_approved: result === "accepted",
//       original_price: originalPrice,
//       offered_price: userOffer,
//       minimum_price: Number(minimumPrice.toFixed(2)),
//       counter_offer: counterOffer,
//       attempt_no: totalAttempts + 1,
//       attempts_left: offerSettings.attempt_limit - (totalAttempts + 1),
//       data: attempt

//     });

//   } catch (error) {

//     console.log(
//       "Bargain Error:",
//       error
//     );

//     return res.status(500).json({

//       success: false,

//       message:
//         "Bargain request failed",

//       error:
//         error.message

//     });

//   }
// };


exports.checkBargain = async (req, res) => {
  try {
    console.log("Bargain Api Call")
    const user_id = req.user && req.user.user_id;
    const { product_id, main_category, offer_price } = req.body;
    console.log("main cat", main_category)

    // =========================
    // VALIDATION
    // =========================

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "product_id is required"
      });
    }

    if (
      offer_price === undefined ||
      offer_price === null ||
      offer_price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter offer price"
      });
    }

    const userOffer = Number(offer_price);

    if (
      !Number.isFinite(userOffer) ||
      userOffer <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid offer price"
      });
    }

    // =========================
    // CATEGORY MODEL MAP
    // =========================

    const productModels = {
      products: Products,
      footwear: Footwear,
      jewellery: Jewellery,
      eyewear: Eyewear,
      purse: Purse,
      clothings: Clothings
    };

    let product = null;
    let finalCategory = main_category;

    // =========================
    // CATEGORY AVAILABLE HAI
    // =========================

    if (main_category) {
      const ProductModel = productModels[main_category.toLowerCase()];
      if (!ProductModel) {
        return res.status(400).json({
          success: false,
          message: "Invalid main category"
        });
      }

      product = await ProductModel.findByPk(product_id);

    } else {
      product = await Products.findByPk(product_id);
      if (product) {
        finalCategory = "products";
      }
    }

    // =========================
    // PRODUCT NOT FOUND
    // =========================

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // =========================
    // PRODUCT PRICE
    // =========================

    let originalPrice;

    // products table
    if (finalCategory === "products") {
      originalPrice = Number(product.product_price);

    } else {
      originalPrice = Number(product.price);
    }

    if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product price is invalid"
      });
    }

    // =========================
    // EXISTING DISCOUNT
    // =========================

    let existingDiscount;

    // products table
    if (finalCategory === "products") {
      existingDiscount = Number(product.discount || 0);

    } else {
      existingDiscount = Number(product.discount_percent || 0);
    }

    if (!Number.isFinite(existingDiscount) || existingDiscount < 0 || existingDiscount > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Product discount is invalid"
      });
    }

    // =========================
    // CURRENT SELLING PRICE
    // =========================

    // Existing discount apply 

    const currentSellingPrice = originalPrice - (originalPrice * existingDiscount / 100);

    // =========================
    // EXTRA OFFER MODEL
    // =========================

    if (!ExtraOffers) {
      return res.status(500).json({
        success: false,
        message:
          "ExtraOffers model not found"
      });
    }

    // =========================
    // CATEGORY BARGAIN SETTINGS
    // =========================

    const offerSettings = await ExtraOffers.findOne({
      where: {
        main_category: finalCategory,
        status: true
      }
    });

    if (!offerSettings) {
      return res.status(400).json({
        success: false,
        message:
          "Bargaining is not available for this category"
      });
    }

    // =========================
    // EXTRA BARGAIN DISCOUNT
    // =========================

    const bargainDiscount = Number(offerSettings.max_discount_percent);

    if (!Number.isFinite(bargainDiscount) || bargainDiscount < 0 || bargainDiscount > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Bargain discount is invalid"
      });
    }

    // =========================
    // MINIMUM BARGAIN PRICE
    // =========================

    const minimumPrice = currentSellingPrice - (currentSellingPrice * bargainDiscount / 100);

    // =========================
    // TOTAL ATTEMPTS
    // =========================

    const totalAttempts =
      await BargainAttempts.count({
        where: {
          user_id:
            user_id,
          product_id:
            product_id,
          main_category:
            finalCategory
        }
      });

    const attemptLimit =
      Number(
        offerSettings
          .attempt_limit
      );

    // =========================
    // ATTEMPT LIMIT CHECK
    // =========================

    if (
      totalAttempts >=
      attemptLimit
    ) {
      return res.status(403).json({
        success: false,
        result: "limit_reached",
        message: `You have used all ${attemptLimit} bargain attempts`,
        attempt_limit: attemptLimit,
        attempts_used: totalAttempts,
        attempts_left: 0
      });
    }

    // =========================
    // COUNTER BUFFER
    // =========================

    // const counterBuffer = Number(offerSettings.counter_buffer || 20);
    const counterBuffer = Number(currentSellingPrice - (currentSellingPrice * (bargainDiscount + offerSettings.counter_buffer) / 100))

    let result;
    let message;
    let counterOffer = null;

    // =========================
    // BARGAIN CONDITIONS
    // =========================

    if (userOffer >= currentSellingPrice) {
      result = "accepted";
      message = "Offer accepted successfully";
    }


    else if (userOffer >= minimumPrice) {
      result = "accepted";
      message = "Congratulations! Your offer is accepted";
    }

    else if (userOffer >= minimumPrice - counterBuffer) {
      result = "counter";
      // counterOffer = Number(minimumPrice.toFixed(2));
      // message = `We can offer this product for ₹${counterOffer}`;
      counterOffer = null;
      message =
        "Your offer is close. Please increase your offer and try again.";
    }

    // Offer bahut low hai

    else {
      result = "rejected";
      message = "Your offer is too low. Please try again";
    }

    // =========================
    // SAVE BARGAIN ATTEMPT
    // =========================

    const attempt = await BargainAttempts.create({
      user_id: user_id,
      product_id: product_id,
      main_category: finalCategory,
      offer_price: userOffer,
      result: result,
      attempt_no: totalAttempts + 1
    });

    // =========================
    // FINAL RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      message: message,
      result: result,

      offer_approved: result === "accepted",

      original_price: Number(originalPrice.toFixed(2)),

      existing_discount_percent: existingDiscount,

      current_selling_price: Number(currentSellingPrice.toFixed(2)),

      bargain_discount_percent: bargainDiscount,

      minimum_bargain_price: Number(minimumPrice.toFixed(2)),

      offered_price: userOffer,

      counter_offer: counterOffer,

      attempt_no: totalAttempts + 1,

      attempt_limit: attemptLimit,

      attempts_left: Math.max(0, attemptLimit - (totalAttempts + 1)),

      data: attempt
    });

  } catch (error) {
    console.log(
      "Bargain Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Bargain request failed",
      error:
        error.message
    });
  }
};

