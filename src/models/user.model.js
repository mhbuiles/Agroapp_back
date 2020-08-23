const { Schema , model } = require('mongoose');

const userSchema = new Schema({
  name : String,
  lname : String,
  email : String,
  phone : String,
  address : String,
  id_type : String,
  id_number : String,
}, {
  timestamps : true,
});

const User = model( 'User' , userSchema );

module.exports = User;
