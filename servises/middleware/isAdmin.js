const jwt = require("jsonwebtoken");
const admin_users = require('../models/adminUsers/adminUsers');

const isAdmin = async (req, res, next) => {
    try {
        let authorizationHeader = req.header("Authorization");

        // ❌ Token missing
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Bearer Token not found"
            });
        }

        // ✅ Extract token
        let token = authorizationHeader.split(" ")[1];

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await admin_users.findByPk(decoded.admin_id)
        
        if (!user) {
            return res.status(404).json({
                message: "Admin User not found"
            })
        }

        // ❌ Role check
        if (user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Only Admin can access this route"
            });
        }

        // ✅ All good
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message
        });
    }
};

module.exports = isAdmin;