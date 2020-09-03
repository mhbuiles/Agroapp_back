const { Schema , model } = require('mongoose');

const productSchema = new Schema({
  name : String,
  price : Number,
  location : String,
  image : String,
  description: String,
}, {
  timestamps : true,
});

const Product = model( 'Product' , productSchema );

module.exports = Product;
