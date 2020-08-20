const Product = require('../models/product.model');

module.exports = {
  list(req, res) {
    Product
      .find()
      .then((products) => res.status(200).json(products))
  },
  create(req, res) {
    const data = req.body;

    Product
      .create(data)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(400).json(err));
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
