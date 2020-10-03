const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const { auth } = require('../utils/middlewares');

router.route('/').get( auth , transactionController.list);
router.route('/').post( auth , transactionController.create);
router.route('/:id').get(transactionController.show);

module.exports = router;
