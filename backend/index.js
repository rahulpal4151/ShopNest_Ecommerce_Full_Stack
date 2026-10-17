const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectdb = require('./config/db');
const authRoute = require('./routes/authRoutes.js')

dotenv.config();

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use(express.urlencoded({extended:true}))

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}

app.use('/api/auth', authRoute);
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes.js'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectdb();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
