const Review = require('../models/review')
const registration = require('../models/registration')
const multer = require('multer');
// const { Op } = require('sequelize');
const Sequelize = require('sequelize')
const { fn, col, literal } = Sequelize;

const path = require('path');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const AddReviewAndRating = async (req, res) => {
    const mobileNo = req.user.mobile_num
    const addressinfo = await registration.findOne({
        where: {
            mobile_num: mobileNo
        }
    });
    // console.log(addressinfo, "aaaaa")
    const user_id = addressinfo.user_id; // Adjust this based on your authentication mechanism

    try {
        const userid = user_id

        upload.fields([{ name: 'review_img', maxCount: 10 }])(req, res, async (err) => {

            const { product_id, rating, review_title, review_comment } = req.body;

            const reviewImg = req.files['review_img'][0];
            // console.log('reviewImg', reviewImg)

            const imageUrl = reviewImg.filename;

            if (!product_id || !userid || !rating || !review_title || !review_comment || !imageUrl) {
                return res.status(203).json({ message: 'All fields are required' });
            }

            const newRating = Number(rating)

            if (newRating < 1 || newRating > 5) {
                return res.status(203).json({ message: 'Rating must be a number between 1 and 5' });
            }

            const result = await Review.create({
                product_id: product_id,
                user_id: userid,
                rating: rating,
                review_title: review_title,
                review_comment: review_comment,
                review_img: imageUrl
            });

            res.status(201).json({
                message: 'Review and rating added successfully',
                result: result
            });

        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getallreview = async (req, res) => {
    try {
        const productid = req.params.productId;
        const reviews = await Review.findAll({
            where: {
                product_id: productid
            },

            attributes: {
                include: [
                    'review_id',
                    'product_id',
                    'user_id',
                    'rating',
                    'review_title',
                    'review_comment',
                    'review_img',
                    // Add other attributes from the Review model as needed
                    [Sequelize.fn('SUM', Sequelize.col('rating')), 'numberOfRaters'],
                ],
            },
            group: ['review_id'], // Group by review_id to avoid multiple rows in the result

            include: [
                {
                    model: registration,
                    attributes: ['name'],
                    // required: false, // Use 'required: false' to perform a LEFT JOIN
                },
            ],
            raw: true, // Include raw data in the result

        })
        const totalReviews = reviews.length;
        console.log(totalReviews, 'totalReviews')
        let totalNumberOfRaters = 0;
        for (const review of reviews) {
            totalNumberOfRaters += review.numberOfRaters;
        }
        // console.log(totalNumberOfRaters); // Total number of raters across all reviews
        // Calculate the total rating by summing up the 'rating' field for all reviews
        let totalRating = 0;
        for (const review of reviews) {
            totalRating += review.rating;
        }
        let Averageproductrating = totalRating / totalReviews
        console.log(Averageproductrating, 'Averageproductrating')

        res.status(201).json({
            message: 'get all review detail by id',
            result: reviews,
            totalReviews: totalReviews,
            totalRating: Averageproductrating,
            totalNumberOfRaters: totalNumberOfRaters
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const getallmyreviews = async (req, res) => {
    try {
        const mobileNo = req.user.mobile_num
        const addressinfo = await registration.findOne({
            where: {
                mobile_num: mobileNo
            }
        });
        // console.log(addressinfo, "aaaaa")
        const userId = addressinfo.user_id; // Adjust this based on your authentication mechanism

        const allreviewdata = await Review.findAll({
            user_id: userId
        })
        console.log(allreviewdata, 'cartProducts')
        res.status(200).json({ allreviewdata });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}
module.exports = {
    AddReviewAndRating,
    getallreview,
    getallmyreviews
}