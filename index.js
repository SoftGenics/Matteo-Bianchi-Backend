const express = require('express');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')

var cors = require('cors')

const { testDbConnection } = require('./eyewear/connection/database')
const app = express();

const registration = require('./eyewear/routes/registration');
const carousel = require('./eyewear/routes/carousel');
const slider = require('./eyewear/routes/slider');
const products = require('./eyewear/routes/products');
const categories = require('./eyewear/routes/categories');
const subCategories = require('./eyewear/routes/subCategories');
const item = require('./eyewear/routes/item')
const brand = require('./eyewear/routes/brand')
const payment = require('./eyewear/routes/payment')
const address = require('./eyewear/routes/address')
const specification = require('./eyewear/routes/specification')
const seller = require('./eyewear/routes/seller')
const order = require('./eyewear/routes/order')
const video = require('./eyewear/routes/video')
const addvideothumnail = require('./eyewear/routes/addvideothumnail')
const offers = require('./eyewear/routes/offers')
const review = require('./eyewear/routes/review')
const color = require('./eyewear/routes/color')
const lenskartPayment = require('./eyewear/routes/lenskartPayment')
const trackShipment = require('./eyewear/routes/trackShipment')
const cashfreePayment = require('./eyewear/routes/cashfreePayment')

testDbConnection();

let PORT = process.env.PORT || 8000;

// Parse JSON-encoded bodies
// app.use(bodyParser.json());

// Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON-encoded bodies with limit
app.use(bodyParser.json({ limit: '100mb' }));

// Parse URL-encoded bodies with limit
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

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
