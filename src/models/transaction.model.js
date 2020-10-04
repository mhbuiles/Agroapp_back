const { Schema , model } = require('mongoose');

const transactionSchema = new Schema({
  user : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  },
  value : {
    type : Number,
    required : true,
  },
  invoice : {
    type : String,
    required : true,
  },
  bouProducts : [ { type : Schema.Types.ObjectId , ref : 'Product' } ],
  transactResponse : {
    type : String,
    required : true,
  },
  epaycoRef : {
    type : String,
    required : true,
  },
}, {
  timestamps : true,
})

const Transaction = model( 'Transaction' , transactionSchema );

module.exports = Transaction;
