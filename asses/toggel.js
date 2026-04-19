// controllers/adminController.js

// const admin_users = require("../models/admin_users")

// exports.togglePermission = async (req, res) => {

//   try {

//     const { admin_id, category } = req.body

//     const user = await admin_users.findByPk(admin_id)

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found"
//       })
//     }

//     let permissions = user.permissions

//     if (!(category in permissions)) {
//       return res.status(400).json({
//         message: "Invalid category"
//       })
//     }

//     // toggle permission
//     permissions[category] = !permissions[category]

//     await user.update({ permissions })

//     res.json({
//       message: `${category} permission updated`,
//       permissions
//     })

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error"
//     })

//   }

// }



// const express = require("express")
// const router = express.Router()

// const authMiddleware = require("../middleware/authMiddleware")
// const isAdmin = require("../middleware/isAdmin")
// const adminController = require("../controllers/adminController")

// router.post(
//   "/toggle-permission",
//   authMiddleware,
//   isAdmin,
//   adminController.togglePermission
// )

// module.exports = router