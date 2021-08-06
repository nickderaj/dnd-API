const express = require('express');
const factoryController = require('../controllers/factoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', factoryController.getAllClasses);
router.get('/:id', factoryController.getClass);

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', factoryController.createClass);
router
  .route('/:id')
  .patch(factoryController.updateClass)
  .delete(factoryController.deleteClass);

module.exports = router;
