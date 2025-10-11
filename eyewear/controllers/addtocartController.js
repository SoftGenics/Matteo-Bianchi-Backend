
const products = require('../models/product');
const cartItem = require('../models/cartItem');

cartItem.belongsTo(products, { foreignKey: 'product_id' });



// const getCartProduct = async (req, res) => {
//     console.log('INFO -> GetCartProduct INFO API CALLED')
//     try {
//         // Assuming you have access to the user's ID after authentication
//         const userId = req.userData.user_id; // Adjust this based on your authentication mechanism

//         // Query the database to get the user's cart products
//         const cartProducts = await Cart.findAll({
//             where: { user_id: userId },
//             include: [Products], // Include product information in the result
//         });

//         // If cartProducts is an array of cart items, you can send it as a JSON response
//         console.log(cartProducts, 'cartProducts')
//         res.status(200).json({ cartProducts });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error generated while processing your request', error });
//     }
// }


const addProductToCart = async (req, res) => {
    console.log('INFO -> add product INFO API CALLED')

    try {
        // Assuming you have access to the user's ID after authentication
        const userId = req.userData.id; // Adjust this based on your authentication mechanism
        // Assuming you receive the product_id and quantity in the request body
        const { product_id, quantity } = req.body;
        console.log(product_id, quantity, 'product_id, quantity')
        // Check if the product with the given product_id exists
        const iscartitem = await cartItem.findOne({
            where: {
                product_id: product_id,
                id: userId
            }
        })

        if (iscartitem) {
            console.log('product all ready exit Already Exist')

            return res.status(203).json({ message: 'Already Exist' });
        }

        const cartitem = await cartItem.create({
            id: userId,
            product_id: product_id,
            quantity: quantity,
        });

        res.status(200).json({ message: 'Product added to the cart successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error generated while processing your request', error });
    }
};



// const removeProductFromCart = async (req, res) => {
//     console.log('INFO -> removeProductFromCart INFO API CALLED')

//     try {
//         // Assuming you have access to the user's ID after authentication
//         const userId = req.userData.user_id; // Adjust this based on your authentication mechanism
//         const product_id = req.params.product_id
//         // Assuming you receive the product_id in the request body
//         // const { product_id } = req.body;
//         console.log(product_id, userId, 'userId')
//         // Check if the product with the given product_id exists
//         // const product = await Products.findByPk(product_id);

//         // if (!product) {
//         //     return res.status(404).json({ message: 'Product not found' });
//         // }

//         // Check if the user has the product in their cart
//         const existingCartItem = await Cart.findOne({
//             where: {
//                 user_id: userId,
//                 product_id: product_id,
//             },
//         });

//         if (!existingCartItem) {
//             return res.status(404).json({ message: 'Product not found in the user\'s cart' });
//         }

//         // If the cart item exists, remove it from the cart
//         await existingCartItem.destroy();

//         res.status(200).json({ message: 'Product removed from the cart successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error generated while processing your request', error });
//     }
// };



// const updateProductQuantity = async (req, res) => {
//     console.log('INFO -> updateProduct INFO API CALLED')

//     try {

//         // Assuming you have access to the user's ID after authentication
//         const userId = req.userData.user_id; // Adjust this based on your authentication mechanism

//         // Assuming you receive the product_id and new quantity in the request body
//         const { product_id, newQuantity } = req.body;
//         // console.log(req.body)
//         // Check if the product with the given product_id exists
//         // const product = await Products.findByPk(product_id);

//         // if (!product) {
//         //     return res.status(404).json({ message: 'Product not found' });
//         // }

//         // Check if the user has the product in their cart
//         const existingCartItem = await Cart.findOne({
//             where: {
//                 user_id: userId,
//                 product_id: product_id,
//             },
//         });

//         if (!existingCartItem) {
//             return res.status(404).json({ message: 'Product not found in the user\'s cart' });
//         }

//         // // Update the quantity of the cart item
//         existingCartItem.quantity = newQuantity;
//         await existingCartItem.save();
//         console.log('Product quantity updated successfully', existingCartItem)
//         res.status(200).json({ message: 'Product quantity updated successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error generated while processing your request', error });
//     }
// };

module.exports = {
    addProductToCart,
    // getCartProduct,
    // updateProductQuantity,
    // removeProductFromCart
}



