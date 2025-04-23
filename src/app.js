const express= require('express');
const cors = require('cors');
const userRoutes = require('../routes/v1/userRoutes');
const categoryRoutes = require('../routes/v1/categoryRoutes');
const productRoutes = require('../routes/v1/productRoutes');
const adminRoutes = require('../routes/v1/adminRoutes');
const cartRoutes = require('../routes/v1/cartRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/users', userRoutes);
app.use('/v1/categories', categoryRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/cart', cartRoutes);

module.exports = app;