const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewController.alerts);

module.exports = router;

router.get('/me', authController.protect, viewController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);
router.get(
  '/create-character',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getCharacterForm
);
router.get(
  '/create-spell',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getSpellForm
);
router.get(
  '/add-spell-to-character',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.addSpellToCharacterForm
);
router.get(
  '/spellsremaining',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.spellsRemainingForm
);
router.get(
  '/spell-list?:id',
  authController.protect,
  viewController.getSpellList
);
router.get(
  '/character-list?:id',
  authController.protect,
  viewController.getCharacterList
);
router.get(
  '/spell/:id',
  authController.protect,
  viewController.getSpellListCurrent
);
router.get(
  '/character/:slug',
  authController.protect,
  viewController.getCharacterListCurrent
);

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/npcs', viewController.getOtherCharacters);
router.get('/tour/:slug', viewController.getCharacter);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
