const express = require('express');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')

var cors = require('cors')

const { testDbConnection } = require('./servises/connection/database')
const app = express();

const registration = require('./servises/routes/registration');
const carousel = require('./servises/routes/carousel');
const slider = require('./servises/routes/slider');
const products = require('./servises/routes/products');
const categories = require('./servises/routes/categories');
const subCategories = require('./servises/routes/subCategories');
const item = require('./servises/routes/item')
// const addtocart = require('./servises/routes/addtocart')
const brand = require('./servises/routes/brand')
const payment = require('./servises/routes/payment')
const address = require('./servises/routes/address')
const specification = require('./servises/routes/specification')
const seller = require('./servises/routes/seller')
const order = require('./servises/routes/order')
const video = require('./servises/routes/video')
const addvideothumnail = require('./servises/routes/addvideothumnail')
const offers = require('./servises/routes/offers')
const review = require('./servises/routes/review')
const color = require('./servises/routes/color')
const lenskartPayment = require('./servises/routes/lenskartPayment')
const trackShipment = require('./servises/routes/trackShipment')
const cashfreePayment = require('./servises/routes/cashfreePayment')

testDbConnection();

let PORT = process.env.PORT || 8000;

// Parse JSON-encoded bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors())
// app.use(cors({
//   origin: "*",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://admin.matteo-bianchi.com",
    "https://matteo-bianchi.com"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// app.use(cors({
//   origin: [
//     "https://admin.matteo-bianchi.com",
//     "https://matteo-bianchi.com"
//   ],
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//   credentials: true,
// }));

// IMPORTANT: Allow preflight requests
app.options("*", cors());


app.use('/uploads', express.static("uploads"));

// Routes
app.use('/', registration);
app.use('/', carousel);
app.use('/', slider);
app.use('/', products);
app.use('/', categories);
app.use('/', subCategories);
app.use('/', item);

// app.use('/', addtocart);
app.use('/', brand);
app.use('/', payment);
app.use('/', address);
app.use('/', specification)
app.use('/', seller)
app.use('/', order)
app.use('/', video)
app.use('/', addvideothumnail)
app.use('/', offers)
app.use('/', review)
app.use('/', color)
app.use('/api/payment', lenskartPayment);
app.use("/api/tracking", trackShipment);
app.use('/api', cashfreePayment)
// Routes

app.get('/hello', (req, res) => {
  res.send({ 'message': 'hello user i am here' })
})

// app listen
app.listen(PORT, () => {
  console.log(`Server started at https//localhost:${PORT}...`)
});


// testing key
// RAZORPAY_KEY_ID=rzp_test_6nQE4mF6koMgtv
// RAZORPAY_KEY_SECRET=MNC39DXbxGdpXRMRpZkF7YV4

// live Key
// RAZORPAY_KEY_ID=rzp_live_RAkH4wvm69Kmlh 
// RAZORPAY_KEY_SECRET=MzItXRdcQ1cW6mdbD6dkg55i