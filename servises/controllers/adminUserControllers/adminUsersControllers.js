const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const admin_users = require('../../models/adminUsers/adminUsers');
// const { clouddebugger } = require('googleapis/build/src/apis/clouddebugger');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const existingUser = await admin_users.findOne({ where: { email } })
        if (existingUser) {
            return res.status(404).json({ success: false, message: "User allredy exist!" })
        }
        const hasePassword = bcrypt.hashSync(password, 10)
        const newUser = await admin_users.create({
            firstName,
            lastName,
            email,
            password: hasePassword
        })
        return res.status(200).json({ newUser: newUser, success: true, message: "User registered successfully!" })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await admin_users.findOne({ where: { email } })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User Not Found!" })
        }

        // status check
        if (existingUser.admin_status !== "Approved") {
            return res.status(403).json({
                message: "Your account is not approved by admin yet"
            })
        }

        // role status check 
        if (existingUser.role !== "Admin") {
            return res.status(401).json({
                message: `Access denied: You are logged in as ${existingUser.role}, but only Admin can access this.`
            })
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password)

        // console.log("isValidPassword", isValidPassword)
        // console.log("password", password)

        if (!isValidPassword) {
            return res.status(404).json({ success: false, message: "Wrong Password!" })
        }
        const admin_access_token = jwt.sign({ admin_id: existingUser.admin_id }, process.env.JWT_SECRET, { expiresIn: "60d" })
        res.cookie(`admin_access_token`, admin_access_token, {
            httpOnly: true,
            secure: false, // production me true
            maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
            // sameSite: "strict", 
        })
        return res.status(200).json({ user: existingUser, success: true, message: "User login Successfully!", admin_access_token })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("admin_access_token", {
            httpOnly: true,
            secure: false, // production me true
            // sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User logout Successfully!"
        });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
};




/////////////////// Seller Authentications /////////////////////////////////

const sellerSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        const existingUser = await admin_users.findOne({ where: { email } })
        if (existingUser) {
            return res.status(404).json({ success: false, message: "User allredy exist!" })
        }
        const hasePassword = bcrypt.hashSync(password, 10)
        const newUser = await admin_users.create({
            firstName,
            lastName,
            email,
            password: hasePassword
        })
        return res.status(200).json({ newUser: newUser, success: true, message: "User registered successfully!" })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
}

const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await admin_users.findOne({ where: { email } })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User Not Found!" })
        }

        // status check
        if (existingUser.admin_status !== "Approved") {
            return res.status(403).json({
                message: "Your account is not approved by admin yet"
            })
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password)

        // console.log("isValidPassword", isValidPassword)
        // console.log("password", password)

        if (!isValidPassword) {
            return res.status(404).json({ success: false, message: "Wrong Password!" })
        }
        const seller_access_token = jwt.sign({ admin_id: existingUser.admin_id }, process.env.JWT_SECRET, { expiresIn: "60d" })

        res.cookie(`seller_access_token`, seller_access_token, {
            httpOnly: true,
            secure: false, // production me true
            maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
            sameSite: "lax",
        })
        return res.status(200).json({ user: existingUser, success: true, message: "User login Successfully!", seller_access_token })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
}

const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("seller_access_token", {
            httpOnly: true,
            secure: false, // production me true
            // sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User logout Successfully!"
        });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAdminUsers = async (req, res) => {
    // console.log("getAdminUsers", req.admin.admin_id)
    try {

        const adminId = req.admin.admin_id; // 👈 token se aaya

        const user = await admin_users.findOne({
            where: { admin_id: adminId }
        });
        // console.log("admin", adminId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const allSellers = async (req, res) => {
    try {
        const sellers = await admin_users.findAll({
            order: [['createdAt', 'DESC']]
        })

        if (!sellers) {
            return res.status(404).json({ message: "sellers not Found" })
        }
        return res.status(200).json({
            message: "Get sellers Successfully.",
            data: sellers
        })
    } catch (error) {
        console.error("internal server error", error)
    }
}


// 🔥 UPDATE ADMIN USER
const updateAdminUser = async (req, res) => {
    try {
        const { admin_id } = req.params;
        const { admin_status, role, permissions } = req.body;

        // 🔍 Find user
        const user = await admin_users.findOne({
            where: { admin_id }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found"
            });
        }

        // ✅ Update admin_status
        if (admin_status !== undefined) {
            user.admin_status = admin_status;
        }

        // ✅ Update role (optional validation)
        const allowedRoles = ["Admin", "Seller_Admin", "User"];

        if (role !== undefined) {
            if (!allowedRoles.includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role"
                });
            }
            user.role = role;
        }

        // 🔁 Toggle Permissions
        const allowedPermissions = ["eyewear", "clothing", "jewellery", "footwear", "bags"];

        if (permissions !== undefined) {
            let updatedPermissions = { ...user.permissions };

            for (let key in permissions) {
                if (allowedPermissions.includes(key)) {
                    // 🔥 TOGGLE (true ⇄ false)
                    updatedPermissions[key] = !user.permissions[key];
                }
            }

            user.permissions = updatedPermissions;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Admin user updated successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { signup, login, logout, sellerSignup, sellerLogin, sellerLogout, getAdminUsers, allSellers, updateAdminUser }