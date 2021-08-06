const Character = require('../models/characterModel');
const Class = require('../models/classModel');
const Spell = require('../models/spellModel');
const SpellSlot = require('../models/spellSlotModel');
const factory = require('./handlerFactory');

// Characters:
exports.getAllCharacters = factory.getAll(Character);
exports.getCharacter = factory.getOne(Character);
exports.createCharacter = factory.createOne(Character);
exports.updateCharacter = factory.updateOne(Character);
exports.deleteCharacter = factory.deleteOne(Character);

// Spells:
exports.getAllSpells = factory.getAll(Spell);
exports.getSpell = factory.getOne(Spell);
exports.createSpell = factory.createOne(Spell);
exports.updateSpell = factory.updateOne(Spell);
exports.deleteSpell = factory.deleteOne(Spell);

// Spell Slots:
exports.getAllSpellSlots = factory.getAll(SpellSlot);
exports.getSpellSlot = factory.getOne(SpellSlot);
exports.createSpellSlot = factory.createOne(SpellSlot);
exports.updateSpellSlot = factory.updateOne(SpellSlot);
exports.deleteSpellSlot = factory.deleteOne(SpellSlot);

// Classes:
exports.getAllClasses = factory.getAll(Class);
exports.getClass = factory.getOne(Class);
exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.deleteClass = factory.deleteOne(Class);
