const { Schema , model , models } = require('mongoose');

const emailRegExp = new RegExp('^[a-z0-9._-]+(?:\.[a-z0-9._-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$');

const userSchema = new Schema({
  name : {
    type : String,
    required : [ true , 'El campo nombre es obligatorio' ],
  },
  lname : {
    type : String,
    required : [ true , 'El campo apellidos es obligatorio' ],
  },
  email :{
    type : String,
    required : [ true , 'El campo e-mail es obligatorio' ],
    match : [ emailRegExp , 'El email es inválido' ],
    validate : [
      {
        validator( email ) {
          return models.User.findOne( { email } )
            .then( user => !user )
            .catch( () => false )
        },
        message : 'Ya existe un usuario registrado con este e-mail',
      }
    ]
  },
  phone : {
    type : String,
    required : [ true , 'El campo celular es obligatorio' ],
    minlength : 10,
    maxlength : 10,
  },
  address : {
    type : String,
    required : [ true , 'El campo dirección es obligatorio' ],
  },
  city : {
    type : String,
    required : [ true , 'El campo ciudad es obligatorio'],
  },
  id_type : {
    type : String,
    required : [ true , 'El campo tipo de identificación es obligatorio' ],
    enum : {
      values : [ 'CC' , 'CE' , 'PA' ],
      message : 'No es una opción válida'
    },
  },
  id_number : {
    type : String,
    required : [ true , 'El campo número de identificación es obligatorio' ],
  },
  baccount : {
    type : String,
    required : false,
  },
  bacctype : {
    type : String,
    required : false,
    enum : {
      values : [ 'Ahorros' , 'Corriente' , '' ],
      message : 'No es una opción válida'
    },
  },
  bank : {
    type : String,
    required : false,
    enum : {
      values : [ 'Bancolombia' , 'Banco de Bogotá' , 'Davivienda' , 'Nequi' , 'Daviplata' , 'Banco de Occidente' , 'Banco AVVillas' , 'Banco Popular' , 'Itaú' , 'Colpatria' , 'BBVA' , 'Banco Agrario' , 'Citibank' , 'Banco Caja Social' , 'Banco Falabella' , 'Banco Pichincha' , 'Bancoomeva' , '' ],
      message : 'No es una opción válida'
    },
  },
  password : {
    type : String,
    required : [ true , 'El campo contraseña es obligatorio' ],
  },
  products : [ { type : Schema.Types.ObjectId , ref : 'Product' } ],
  transactions : [ { type : Schema.Types.ObjectId , ref : 'Transaction' } ],
  image : String,
}, {
  timestamps : true,
});

const User = model( 'User' , userSchema );

module.exports = User;
