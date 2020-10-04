const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

function db() {
  const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
  }

  mongoose.connect( uri , options );
  const { connection } = mongoose;
  connection.once( 'open' , () => console.log('Connection stablished'));
  connection.on( 'error' , (err) => console.log('Something went wrong'));

  return connection;
}

module.exports = db;
