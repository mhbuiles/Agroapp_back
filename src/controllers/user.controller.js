const User = require('../models/user.model');

module.exports = {
  list(req, res) {
    User
      .find()
      .then((users) => res.status(200).json(users))
  },
  create(req, res) {
    const data = req.body;

    User
      .create(data)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  },
  show(req, res) {
    const { id } = req.params;

    User
      .findById(id)
      .then( user => res.status(200).json(user))
      .catch(() => res.status(400).json({ message: `Could not find user with id ${id}` }));
  },
  update(req, res) {
    const { id } = req.params;
    const data = req.body;

    User
      .findByIdAndUpdate(id, data, { new: true })
      .then( user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  },
  destroy(req, res) {
    const { id } = req.params;

    User
      .findByIdAndDelete(id)
      .then( user => res.status(200).json(user))
      .catch(() => res.status(400).json({ message: `Could not find user with id ${id}` }));
  }
}
