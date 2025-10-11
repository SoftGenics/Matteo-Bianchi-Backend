const registration = require('../models/registration');
const jwt = require('jsonwebtoken');
const fast2sms = require('fast-two-sms');

// Your existing code...
const generateJWT = (mobile_num, otp) => {
  const payload = { mobile_num, otp };
  const secretKey = 'Diwkar@321'; // Replace with your secret key
  const expirationTime = 90 * 24 * 60 * 60;
  const token = jwt.sign(payload, secretKey, { expiresIn: expirationTime }); // You can adjust the expiration time
  return token;
};

const generateOTP = () => {
  // Generate a random 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const FAST2SMS_API_KEY = 'jr3OEi8MvxyBd5FeNPGW91Qm0XcgfpHoIbDu4YCLAKawh6Jq2VX29IdZVegDY1iGwKtujmQErPSRA3xN'
const sendOTP = async (mobile_num, otp) => {
  const message = `Your OTP for registration is: ${otp}`;
  const response = await fast2sms.sendMessage({ authorization: FAST2SMS_API_KEY, message, numbers: [mobile_num] });
  return response;
};

const login = async (req, res) => {
  const mobile_num  = req.body.mobile_num;
  console.log("num", mobile_num)

  try {
    // Check if the user already exists in the database
    const existingUser = await registration.findOne({ where: { mobile_num: mobile_num } });

    if (!existingUser) {
      // User does not exist in the database; generate OTP, JWT, and send OTP
      const otp = generateOTP();
      const token = generateJWT(mobile_num, otp);

      // Save the new user in the database
      await registration.create({
        name: 'GUEST',
        mobile_num: mobile_num,
        email_id: null,
        gender: null,
        dob: null,
      });

      const smsResponse = await sendOTP(mobile_num, otp);

      if (smsResponse) {
        // OTP sent successfully
        console.log('OTP is successfully sent', otp, token);

        return res.status(200).send({
          otp, token: token, status: 'true'
        });
      } else {
        // Failed to send OTP via SMS
        console.log('Failed to send OTP via SMS');
        res.status(500).json({ message: 'Failed to send OTP via SMS' });
      }
    } else {
      // User already exists; send OTP only
      const otp = generateOTP();
      const token = generateJWT(mobile_num, otp);
      const smsResponse = await sendOTP(mobile_num, otp);

      if (smsResponse) {
        // OTP sent successfully
        console.log('OTP is successfully sent', otp);

        return res.status(200).send({
          otp, token: token, status: 'true'
        });
      } else {
        // Failed to send OTP via SMS
        res.status(500).json({ message: 'Failed to send OTP via SMS' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
   login
}