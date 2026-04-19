const jwt = require("jsonwebtoken");
const admin_users = require('../models/adminUsers/adminUsers');

const checkPermission = (category) => {

  return async (req, res, next) => {
    try {
      const token = req.cookies?.seller_access_token;

      console.log("category", category);
      console.log("token", token);
      console.log("cookies:", req.cookies);

      // ❌ No token
      if (!token) {
        return res.status(401).json({
          message: "No token found"
        });
      }

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Get user from DB
      const user = await admin_users.findByPk(decoded.admin_id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      console.log('user.role', user.role);

      // ✅ Admin access
      if (user.role === "Admin") {
        return next();
      }

      // ✅ Seller Admin permission
      if (user.role === "Seller_Admin" && user.permissions?.[category] === true) {
        return next();
      }

      // ❌ Not allowed
      return res.status(403).json({
        message: "Permission denied for this category"
      });

    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({
        message: "Invalid or expired token"
      });
    }
  };

};

module.exports = checkPermission;