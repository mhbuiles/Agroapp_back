const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const { transporter , purchase } = require('../utils/mailer');
const Product = require('../models/product.model');

module.exports = {

 async list( req , res ) {
  const userId = await User.findById( req.user );
  const transactions = await Transaction.find( { user : userId } ).populate( 'user' , 'name' )
  res.status(200).json(transactions)
},
 async create( req , res ) {
   try {
     const { ...data } = req.body;

     const user = await User.findById( req.user );

     const transaction = await Transaction.create( { ...data , user } );
     const prodsBoug = await Product.find().where('_id').in(transaction.bouProducts).exec();

     user.transactions.push(transaction);
     await user.save( { validateBeforeSave : false } );

     const mail = {
       from : `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
       to : user.email,
       subject : 'Resumen de su compra',
       ...purchase( user.name , transaction.value , prodsBoug , transaction.invoice , transaction.transactResponse , transaction.epaycoRef )
     };

     await transporter.sendMail(mail);

     res.status(200).json(transaction)
   } catch(err) {

     res.status(400).json(err)
   }
 },
 show( req , res ) {
   const { id } = req.params;

   Transaction
     .findById( id )
     .then( transaction => res.status(200).json( transaction ) )
     .catch(() => res.status(400).json({ message: `Could not find transaction with id ${id}` }));
 }
}
