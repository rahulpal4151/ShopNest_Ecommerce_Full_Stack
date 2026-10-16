const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectdb = require('./config/db');
const authRoute = require('./routes/authRoutes.js');

dotenv.config();

const app = express();

// 1. Middleware
app.use(cors({
    origin: '*', // Production ke liye isko allow all karna safe rahega jab tak aap apna live domain set na karein
    credentials: true,
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. API Routes (Yeh hamesha UPAR hone chahiye)
app.use('/api/auth', authRoute);
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes.js'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 3. 404 Error handler for API (Agar koi galat API hit kare)
app.use('/api', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// 4. Serve React Frontend (Yeh hamesha LAST mein hona chahiye)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // React Router ko handle karne ke liye app.get('*') use karein
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('ShopNest API is running in Development mode...');
    });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectdb();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();