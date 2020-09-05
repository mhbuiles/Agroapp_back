const Product = require('../models/product.model');
const User = require('../models/user.model');

module.exports = {
   async list( req , res ) {
    console.log('here');
    const products = await Product.find(  ).populate( 'user' , 'name' )
    res.status(200).json(products)
  },
  async list2( req , res ) {
   console.log('here');
   const products = await Product.find(  ).populate( 'user' , 'name' )
   res.status(200).json(products)
 },
  async create( req , res ) {
    try {
      const data = req.body;
      const user = await User.findById( req.user );
      const product = await Product.create( { ...data , user } );
      user.products.push(product);
      await user.save();
      res.status(200).json(product)
    } catch(err) {
      res.status(400).json(err)
    }
  },
  show(req, res) {
    const { id } = req.params;

    Product
      .findById(id)
      .then(product => res.status(200).json(product))
      .catch(() => res.status(400).json({ message: `Could not find product with id ${id}` }));
  },
  update(req, res) {
    const { id } = req.params;
    const data = req.body;

    Product
      .findByIdAndUpdate(id, data, { new: true })
      .then(product => res.status(200).json(product))
      .catch(err => res.status(400).json(err));
  },
  destroy(req, res) {
    const { id } = req.params;

    Product
      .findByIdAndDelete(id)
      .then(product => res.status(200).json(product))
      .catch(() => res.status(400).json({ message: `Could not find product with id ${id}` }));
  }
}
