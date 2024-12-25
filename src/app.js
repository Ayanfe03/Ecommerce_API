const express= require('express');
const cors = require('cors');
const userRoutes = require('../routes/v1/userRoutes');
const categoryRoutes = require('../routes/v1/categoryRoutes');
const productRoutes = require('../routes/v1/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/users', userRoutes);
app.use('/v1/categories', categoryRoutes);
app.use('/v1/products', productRoutes);

module.exports = app;