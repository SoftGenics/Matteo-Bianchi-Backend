const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const admin_users = require('../../models/adminUsers/adminUsers');

const signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body
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
        return res.status(200).json({ success: true, message: "User login Successfully!", admin_access_token })

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

module.exports = { signup, login, logout }