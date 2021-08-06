const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Spell must have a name.'],
  },
  desc: {
    type: String,
    required: [true, 'Spell must have a description.'],
    higherLevel: String,
  },
  range: {
    type: String,
    required: [true, 'Spell must have a range.'],
  },
  duration: {
    type: String,
    required: [true, 'Spell must have a duration.'],
  },
  castingtime: {
    type: String,
    required: [true, 'Spell must have a duration.'],
  },
  concentration: {
    type: String,
    required: [true, 'Spell must have a duration.'],
  },
  level: {
    type: String,
    required: [true, 'Spell must have a level.'],
  },
  higherlevel: {
    type: String,
  },
  class: {
    type: [String],
    required: [true, 'Spell must require to at least one class.'],
  },
});

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;
