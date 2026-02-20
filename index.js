const express = require('express');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser')

var cors = require('cors')

const { testDbConnection } = require('./servises/connection/database')
const app = express();

const registration = require('./servises/routes/registration');
const carousel = require('./servises/routes/eyewearRoutes/carousel');
const slider = require('./servises/routes/eyewearRoutes/slider');
const products = require('./servises/routes/eyewearRoutes/products');
const categories = require('./servises/routes/eyewearRoutes/categories');
const subCategories = require('./servises/routes/eyewearRoutes/subCategories');
const item = require('./servises/routes/eyewearRoutes/item')
const brand = require('./servises/routes/eyewearRoutes/brand')
const payment = require('./servises/routes/eyewearRoutes/payment')
const jewellery = require('./servises/routes/jewelleryDetailsRoutes/jewelleryDetailsRoutes')
const clothings = require('./servises/routes/clothingDetailRoute/clothingDetailRoute')
const eyewear = require('./servises/routes/eyewearDetailsRoutes/eyewearDetailsRoutes')
const bags = require('./servises/routes/bagsDetailsRoutes/bagsDetailsRoutes')
const footwear = require('./servises/routes/footwearDetailsRoutes/footwearDetailsRoutes')
const address = require('./servises/routes/address')
const specification = require('./servises/routes/eyewearRoutes/specification')
const seller = require('./servises/routes/eyewearRoutes/seller')
const order = require('./servises/routes/eyewearRoutes/order')
const video = require('./servises/routes/eyewearRoutes/video')
const addvideothumnail = require('./servises/routes/eyewearRoutes/addvideothumnail')
const offers = require('./servises/routes/eyewearRoutes/offers')
const review = require('./servises/routes/eyewearRoutes/review')
const color = require('./servises/routes/eyewearRoutes/color')
const lenskartPayment = require('./servises/routes/eyewearRoutes/lenskartPayment')
const trackShipment = require('./servises/routes/trackShipment')
const cashfreePayment = require('./servises/routes/cashfreePayment')
const getAllCetegory = require('./servises/routes/getAllCetegoryRoutes')
const adminUser = require('./servises/routes/adminUserRoutes/adminUsersRoute')


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
app.use('/api', jewellery)
app.use('/api', clothings)
app.use('/api', eyewear)
app.use('/api', bags)
app.use('/api', footwear)

app.use('/api', getAllCetegory)
app.use('/', video)
app.use('/', addvideothumnail)
app.use('/', offers)
app.use('/', review)
app.use('/', color)
app.use('/api/payment', lenskartPayment);
app.use('/api/tracking', trackShipment);
app.use('/api', cashfreePayment)
app.use('/api', adminUser)


app.get('/hello', (req, res) => {
  res.send({ 'message': 'hello user i am here' })
})

// app listen
app.listen(PORT, () => {
  console.log(`Server started at https//localhost:${PORT}...`)
});

