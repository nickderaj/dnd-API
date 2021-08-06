const express = require('express');
const factoryController = require('../controllers/factoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', factoryController.getAllSpellSlots);
router.get('/:id', factoryController.getSpellSlot);

router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', factoryController.createSpellSlot);
router
  .route('/:id')
  .patch(factoryController.updateSpellSlot)
  .delete(factoryController.deleteSpellSlot);

module.exports = router;
