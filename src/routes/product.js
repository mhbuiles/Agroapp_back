const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.route('/').get(productController.list);
router.route('/').post(productController.create);
router.route('/:id').get(productController.show);
router.route('/:id').put(productController.update);
router.route('/:id').delete(productController.destroy);

module.exports = router;
