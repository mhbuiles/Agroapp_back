const { Schema , model } = require('mongoose');

const productSchema = new Schema({
  name : {
    type : String,
    required : [ true , 'El campo nombre es obligatorio' ],
  },
  price : {
    type : String,
    required : [ true , 'El campo precio es obligatorio' ],
  },
  units : {
    type : String,
    required : [ true , 'El campo unidad de medida es obligatorio' ],
  },
  location : {
    type : String,
    required : [ true , 'El campo ubicación es obligatorio' ],
  },
  description : {
    type : String,
    required : [ true , 'El campo descripción es obligatorio' ],
  },
  image : String,
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
}, {
  timestamps : true,
});

const Product = model( 'Product' , productSchema );

module.exports = Product;
