const express = require('express');
const factoryController = require('../controllers/factoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(factoryController.getAllCharacters)
  .post(factoryController.createCharacter);

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/:id')
  .get(factoryController.getCharacter)
  .patch(factoryController.updateCharacter)
  .delete(factoryController.deleteCharacter);

// router.use('/:characterId/spells', spellController.setcharacterId, spellRouter);

module.exports = router;
