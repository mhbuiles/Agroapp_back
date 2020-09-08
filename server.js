require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/db');
const productRouter = require('./src/routes/product');
const userRouter = require('./src/routes/user');
const app = express();
const { auth } = require('./src/utils/middlewares');
const port = process.env.PORT || 8000;

db();
app.use(cors());
app.use(express.json());
app.use('/products' , productRouter);
app.use('/users' , userRouter);


app.listen( port , () => console.log('App running on http://localhost:8000'));
