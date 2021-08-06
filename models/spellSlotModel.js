const mongoose = require('mongoose');

const spellSlotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Spell Slots must belong to a Class'],
  },
  cantrips: [String],
  slots: Object,
  invocations: [String],
  ki: [String],
  martialarts: [String],
  sneakattack: [String],
  rages: [String],
  ragedamage: [String],
  sorcerypoints: [String],
});

const SpellSlot = mongoose.model('SpellSlot', spellSlotSchema);

module.exports = SpellSlot;
