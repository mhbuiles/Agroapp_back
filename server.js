const express = require('express');
const cors = require('cors');
const db = require('./src/db');
const productRouter = require('./src/routes/product');
const app = express();

db();
app.use(cors());
app.use(express.json());
app.use('/products' , productRouter);



app.listen( 8000 , () => console.log('App running on http://localhost:8000'));
