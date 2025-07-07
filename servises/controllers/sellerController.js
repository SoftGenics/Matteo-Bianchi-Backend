const Seller = require('../models/seller')
const path = require('path');
// const google = require('@googleapis/forms');
const { authenticate } = require('@google-cloud/local-auth');

const { google } = require('googleapis');
const service = google.sheets("v4");
const credentials = require("./credentials.json");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');


const createseller = async (req, res) => {
    const data = fs.readFileSync('answers.json');
    const answers = JSON.parse(data);

    //Loop through each answer object and insert into the database
    answers.forEach(async (answer) => {
        try {
            const { answer: sellerData } = answer;
            console.log(answer.company_name)
            const allReviewData = await Seller.findAll({
                where: {
                    company_name: answer.company_name,
                },
            });

            if (allReviewData && allReviewData.length > 0) {
                console.log("Data is already present for:", answer.company_name);
                res.send("Data is already present");
            } else {
                const addressResult = await Seller.create(answer);
                console.log('Inserted:', addressResult);
                res.status(200).send(addressResult);
                // Handle success response or continue with further operations
            }
        } catch (error) {
            console.error('Error while inserting:', error);
            // Handle the error as needed
        }
    });
}





async function runSample(req, res) {
    // Load credentials from a JSON file (replace with your credentials file)


    try {
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const spreadsheetId = '1fTWtk-NMKvBv5X9xtw3U37gFIY-PUmPFe1ulO8iN_jU';
        const range = 'A:I';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values || [];

        const answers = [];

        if (rows.length > 1) {
            rows.shift(); // Remove header row

            for (const row of rows) {
                answers.push({ 'company_name': row[1], 'brand_name': row[2], 'category': row[3], 'brand_usp': row[4], 'marketplaces': row[5], 'contact_name': row[6], 'contact_number': row[7], 'email_address': row[8] });

            }

            fs.writeFileSync('answers.json', JSON.stringify(answers));
            console.log('Answers saved to answers.json');
            res.status(200).send(response.data);
        } else {
            console.log('No data found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}


const getallseller = async (req, res) => {
    try {
        const allreviewdata = await Seller.findAll()
        console.log(allreviewdata, 'Referral')
        res.status(200).json({ allreviewdata });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}



const createCridenciel = async (req, res) => {
    const length = 14;
    const chars = "asdf#@$%ghjklqwertyuiopzxcvbnm";
    let passwords = "";
    for (let i = 0; i < length; i++) {
        passwords += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const password = bcrypt.hashSync(passwords, 8)
    console.log(password)
    const email_address = req.body.email_address;
    const status = true;
    try {
        const updateData = {
            password,
            status
        };

        // Find and update the address in the database
        const updatedpassword = await Seller.findOne(
            {
                where: {
                    email_address: email_address,
                }
            },
        );

        if (!updatedpassword) {
            return res.status(404).json({ error: 'email not found or you do not have permission to update it.' });
        }
        updatedpassword.set(updateData);
        //   Object.assign(updatedAddress,updateData);

        // Save the updated address to the database
        await updatedpassword.save();


        console.log(updatedpassword, 'updatedpassword');
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'softgenics.neeraj@gmail.com', // Admin Gmail ID
                pass: 'paajirebxodgjpcl', // Admin Gmail Password
            },
        })
        //  Send Email
        let info = transporter.sendMail({
            from: 'softgenics.neeraj@gmail.com',
            to: `${email_address}`,
            subject: "Avikka - seller Cridencial",
            html: `<a href="http://localhost:3000/login">Click Here</a> <p>Your Password</p><h4>${passwords}</h4>`
        })
        res.status(200).json(updatedpassword);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the password.' });
    }

}
const sellerlogin = async (req, res) => {
    const email_address = req.body.email_address;
    const password = req.body.password;

    // You can adjust the expiration time
    console.log(email_address, password)
    const seller = await Seller.findOne(
        {
            where: {
                email_address: email_address,
            }
        },
    );

    if (seller) {
        console.log(email_address, password)
        bcrypt.compare(password, seller.password, function (err, result) {
            const seller_id = seller.seller_id;
            if (result) {
                const token = jwt.sign(seller_id, process.env.JWT_KEY,);
                res.status(200).json(token);
            }
            else {
                res.status(400).json("password is not correct");
            }
        })
    }
    else {
        res.status(400).json("email is not correct");
    }
}
//send otp
const sendotp = (req, res) => {

    const email_address = req.body.email_address;

    const length = 6;
    const chars = "1234567890";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const payload = { email_address: email_address, otp: otp }
    const token = jwt.sign(payload, process.env.JWT_KEY,);

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'softgenics.neeraj@gmail.com', // Admin Gmail ID
            pass: 'paajirebxodgjpcl', // Admin Gmail Password
        },
    })
    //  Send Email
    let info = transporter.sendMail({
        from: 'softgenics.neeraj@gmail.com',
        to: `${email_address}`,
        subject: "Avikka - seller Cridencial",
        html: `<p>Reset passeord otp </p><h4>${otp}</h4>`
    })
    res.status(200).json(token);
}
//verify otp
const otpverify = (req, res) => {
    const verifyotp = req.userData.otp;
    const email = req.userData.email;
    const otp = req.body.otp;

    const payload = { email_address: email }
    const token = jwt.sign(payload, process.env.JWT_KEY);
    if (verifyotp == otp) {
        res.send(token)
    }
    else {
        res.send("fail wrong otp")
    }
}
const changepassword = async (req, res) => {
    const pass = req.body.password;
    const email = req.userData.email;

    const password = bcrypt.hashSync(pass, 8)
    const updateData = {
        password
    }
    const updatedpassword = await Seller.findOne(
        {
            where: {
                email_address: email,
            }
        },
    );

    if (!updatedpassword) {
        return res.status(404).json({ error: 'email not found or you do not have permission to update it.' });
    }
    else {
        updatedpassword.set(updateData);
        //   Object.assign(updatedAddress,updateData);

        // Save the updated address to the database
        await updatedpassword.save();
        res.send("Password save successfully");
    }


}
module.exports = {
    createseller,
    runSample,
    getallseller,
    createCridenciel,
    sellerlogin,
    sendotp,
    otpverify,
    changepassword
}