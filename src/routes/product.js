const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { auth } = require('../utils/middlewares');

router.route('/').get(productController.list);
router.route('/myproducts').get(productController.list2);
router.route('/').post( auth , productController.create);
router.route('/:id').get(productController.show);
router.route('/:id').put(productController.update);
router.route('/:id').delete(productController.destroy);


module.exports = router;
