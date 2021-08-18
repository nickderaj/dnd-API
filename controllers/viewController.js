const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Character = require('../models/characterModel');
const User = require('../models/userModel');
const Spell = require('../models/spellModel');
const APIFeatures = require('../utils/apiFeatures');
const { characterMods } = require('./statController');

exports.getOverview = catchAsync(async (req, res, next) => {
  const characters = await Character.find();
  res
    .status(200)
    .render('overview', { title: 'Dungeons & Dragons', characters });
});

exports.getOtherCharacters = catchAsync(async (req, res, next) => {
  const characters = await Character.find();
  res.status(200).render('npcs', { title: 'NPCs', characters });
});

exports.getSpellList = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Spell.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const spells = await features.query;
  res.status(200).render('listSpells', {
    title: 'Spell List',
    spells,
    query: req.query,
  });
});

exports.getCharacterList = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Character.find().sort('npc'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const characters = await features.query;
  res.status(200).render('listCharacters', {
    title: 'Character List',
    characters,
    query: req.query,
  });
});

exports.getSpellListCurrent = catchAsync(async (req, res, next) => {
  const spell = await Spell.findById(req.params.id);
  if (!spell) {
    return next(new AppError('No spell found with that ID', 404));
  }

  res
    .status(200)
    .render('listSpellsClick', { title: `Spell | ${spell.name}`, spell });
});

exports.getCharacterListCurrent = catchAsync(async (req, res, next) => {
  let character = await Character.find({ slug: req.params.slug });
  character = characterMods(character[0]);
  if (!character) {
    return next(new AppError('No character found', 404));
  }
  res
    .status(200)
    .render('listCharactersClick', { title: character.name, character });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert = `Your booking was successful! If your booking doesn't show up immediately, please check back shortly.`;
  next();
};

exports.getCharacter = catchAsync(async (req, res, next) => {
  // 1) Get the data for the requested tour (including guides and reviews)
  const character = await Character.findOne({ slug: req.params.slug }).populate(
    {
      path: 'reviews',
      fields: 'review rating user',
    }
  );
  if (!character) {
    return next(new AppError('There is no character with that name.', 404));
  }

  res.status(200).render('character', { title: character.name, character });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getCharacterForm = catchAsync(async (req, res, next) => {
  res.status(200).render('createCharacter', {
    title: 'Create New Character',
  });
});

exports.spellsRemainingForm = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Character.find().sort('npc'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const characters = await features.query;
  res.status(200).render('spellsRemaining', {
    title: 'Spell Slots Remaining',
    characters,
    query: req.query,
  });
});

exports.getSpellForm = catchAsync(async (req, res, next) => {
  res.status(200).render('createSpell', {
    title: 'Create New Spell',
  });
});

exports.addSpellToCharacterForm = catchAsync(async (req, res, next) => {
  const spells = await Spell.find().sort('name');
  const characters = await Character.find();
  res.status(200).render('createCharSpell', {
    title: 'Add Spell to Character',
    characters,
    spells,
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up Today!',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
