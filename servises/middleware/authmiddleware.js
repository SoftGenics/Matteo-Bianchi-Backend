const jwt = require('jsonwebtoken');
const secretKey = 'Diwkar@321';

// for web
const userAuth = (req, res, next) => {
    let authorizationHeader = req.header('Authorization');

    // Check if the Authorization header exists and has the expected format
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Bearer Token not found' });
    }

    // Extract the token without the "Bearer " prefix
    let token = authorizationHeader.split(" ")[1];
    // console.log("token:-", token);

    jwt.verify(JSON.parse(token), secretKey, (err, valid) => {
        req.user = jwt.verify(JSON.parse(token), secretKey);
        if (err) {
            console.log('err', err.message)
            res.status(401).send("Token not found Please login again")
        } else {
            next();
        }
    })
};


// for mobile
// const userAuth = (req, res, next) => {
//   try {
//     let authorizationHeader = req.header('Authorization');

//     if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Bearer Token not found' });
//     }

//     // ✅ Bearer remove
//     const token = authorizationHeader.split(' ')[1];

//     // ✅ VERIFY TOKEN (NO JSON.parse)
//     const decoded = jwt.verify(token, secretKey);

//     req.user = decoded; // { mobile_num, otp, iat, exp }
//     next();

//   } catch (err) {
//     console.error('Auth error:', err.message);
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

module.exports = { userAuth };
