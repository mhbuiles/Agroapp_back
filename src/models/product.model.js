const { Schema , model } = require('mongoose');

const productSchema = new Schema({
  name : String,
  price : Number,
  location : String,
  image : String,
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true,
    description: String,
  },
}, {
  timestamps : true,
});

const Product = model( 'Product' , productSchema );

module.exports = Product;
