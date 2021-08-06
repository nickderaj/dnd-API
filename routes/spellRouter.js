const express = require('express');
const factoryController = require('../controllers/factoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', factoryController.getAllSpells);
router.get('/:id', factoryController.getSpell);

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', factoryController.createSpell);
router
  .route('/:id')
  .patch(factoryController.updateSpell)
  .delete(factoryController.deleteSpell);

module.exports = router;
