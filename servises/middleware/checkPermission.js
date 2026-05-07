const jwt = require("jsonwebtoken");
const admin_users = require('../models/adminUsers/adminUsers');


const checkPermission = (category) => {
  return async (req, res, next) => {
    try {
      // console.log("AUTH HEADER:", req.headers.authorization);
      let authorizationHeader = req.header("Authorization");

      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Bearer Token not found"
        });
      }

      let token = authorizationHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await admin_users.findByPk(decoded.admin_id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      // ✅ IMPORTANT: admin_id set 
      req.admin = user;

      // ✅ Admin full access
      if (user.role === "Admin") {
        return next();
      }

      // ✅ Seller Admin permission check
      if (user.role === "Seller_Admin" && user.permissions?.[category] === true) {
        return next();
      }

      return res.status(403).json({
        message: "Permission denied"
      });

    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token"
      });
    }
  };
};


// const checkPermission = (category) => {

//   return async (req, res, next) => {
//     try {
//       // const token = req.cookies?.seller_access_token;

//       // console.log("category", category);
//       // console.log("token", token);
//       // console.log("cookies:", req.cookies);

//       let authorizationHeader = req.header("Authorization");

//       // ❌ Token missing
//       if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
//         return res.status(401).json({
//           success: false,
//           message: "Bearer Token not found"
//         });
//       }

//       // ✅ Extract token
//       let token = authorizationHeader.split(" ")[1];


//       // ❌ No token
//       if (!token) {
//         return res.status(401).json({
//           message: "No token found"
//         });
//       }

//       // ✅ Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // ✅ Get user from DB
//       const user = await admin_users.findByPk(decoded.admin_id);

//       if (!user) {
//         return res.status(404).json({
//           message: "User not found"
//         });
//       }

//       console.log('user.role', user.role);

//       // ✅ Admin access
//       if (user.role === "Admin") {
//         return next();
//       }

//       // ✅ Seller Admin permission
//       if (user.role === "Seller_Admin" && user.permissions?.[category] === true) {
//         return next();
//       }

//       // ❌ Not allowed
//       return res.status(403).json({
//         message: "Permission denied for this category"
//       });

//     } catch (error) {
//       console.error("Auth error:", error);
//       return res.status(401).json({
//         message: "Invalid or expired token"
//       });
//     }
//   };

// };

module.exports = checkPermission;