const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  list( req , res ) {
    User
      .find()
      .then((users) => res.status(200).json(users))
  },
  async signup( req , res ) {
    try{
      const data = req.body;
      const { password } = req.body;
      const encryptedPassword = await bcrypt.hash( password , 8 );
      const user = await User.create( { ...data , password : encryptedPassword } )

      const token = jwt.sign(
              { id: user._id },
              process.env.SECRET,
              { expiresIn: 60 * 60 * 24 * 365 }
            );

      res.status(200).json( { token } );
    }
      catch (err) {
        res.status(400).json(err);
    }
  },
  show( req , res ) {
    const { id } = req.params;

    User
      .findById(id)
      .then( user => res.status(200).json(user))
      .catch(() => res.status(400).json({ message: `Could not find user with id ${id}` }));
  },
  update( req , res ) {
    const { id } = req.params;
    const data = req.body;

    User
      .findByIdAndUpdate(id, data, { new: true })
      .then( user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
  },
  destroy( req , res ) {
    const { id } = req.params;

    User
      .findByIdAndDelete(id)
      .then( user => res.status(200).json(user))
      .catch(() => res.status(400).json({ message: `Could not find user with id ${id}` }));
  },
  async signin( req , res ) {
    try {
      const { email , password } = req.body;
      const user = await User.findOne( { email } );

      if (!user) {
        throw Error('El usuario no existe')
      }

      const isValid = await bcrypt.compare( password , user.password );

      if (!isValid) {
        throw Error('Usuario o contraseña incorrecto');
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 60 }
      );

      res.status(200).json( { token , user } );
    }
      catch (err) {
        res.status(401).json({ message : err.message })
    }
  }
}
