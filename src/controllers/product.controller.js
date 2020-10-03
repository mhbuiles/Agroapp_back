const Product = require('../models/product.model');
const User = require('../models/user.model');

module.exports = {
   async list( req , res ) {
    const products = await Product.find(  ).populate( 'user' , 'name' )
    res.status(200).json(products)
  },
  async list2( req , res ) {
   const userId = await User.findById( req.user );
   const products = await Product.find( { user : userId } ).populate( 'user' , 'name' )
   res.status(200).json(products)
 },
  async create( req , res ) {
    try {
      const { file = {} , ...data } = req.body;

      const user = await User.findById( req.user );

      const product = await Product.create( { ...data , image : file.secure_url , user } );

      user.products.push(product);
      await user.save( { validateBeforeSave : false } );

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
  async show2(req, res) {
    try{
      const { id } = req.params;

      const idsAB = await Product.find().where('_id').in(id.split(',')).exec();

      res.status(200).json(idsAB)
    } catch(err) {
      res.status(400).json(err)
    }
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
