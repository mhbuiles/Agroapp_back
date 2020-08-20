const mongoose = require('mongoose');

function db() {
  const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
  }

  mongoose.connect('mongodb://localhost:27017/agroappproducts' , options );
  const { connection } = mongoose;
  connection.once( 'open' , () => console.log('Connection stablished'));
  connection.on( 'error' , (err) => console.log('Something went wrong'));

  return connection;
}

module.exports = db;
