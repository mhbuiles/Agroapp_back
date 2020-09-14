const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { auth } = require('../utils/middlewares');
const { formData } = require('../utils/middlewares');

router.route('/').get( auth , productController.list);
router.route('/myproducts').get( auth , productController.list2);
router.route('/').post( auth, formData , productController.create);
router.route('/:id').get(productController.show);
router.route('/:id').put(productController.update);
router.route('/:id').delete(productController.destroy);


module.exports = router;
