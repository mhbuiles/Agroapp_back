const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/').get(userController.list);
router.route('/').post(userController.signup);
router.route('/:id').get(userController.show);
router.route('/:id').put(userController.update);
router.route('/:id').delete(userController.destroy);
router.route('/signin').post(userController.signin);

module.exports = router;
