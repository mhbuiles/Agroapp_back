const express = require('express');
const cors = require('cors');
const db = require('./src/db');
const productRouter = require('./src/routes/product');
const userRouter = require('./src/routes/user');
const app = express();

db();
app.use(cors());
app.use(express.json());
app.use('/products' , productRouter);
app.use('/users' , userRouter);



app.listen( 8000 , () => console.log('App running on http://localhost:8000'));
