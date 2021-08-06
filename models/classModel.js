const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class must have a name.'],
  },
  hitdice: {
    type: String,
    required: [true, 'Class must have a hp dice (e.g. "1d8").'],
  },
  featureLevel: {
    type: [String],
    required: [
      true,
      'Class must have a set of features gained through the levels.',
    ],
  },
  features: {
    type: Object,
    required: [true, 'Class must have a description of the features.'],
  },
  sam: {
    type: String,
    required: [true, 'Class must have a spellcasting ability modifier (SAM).'],
  },
  savingthrows: {
    type: [String],
    required: [true, 'Class must have saving throws.'],
  },
  //////////////////////////////////////////////////
  // Linked Schemas
  //////////////////////////////////////////////////
  spellslots: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SpellSlot',
    },
  ],
});

classSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'spellslots',
    select: '-name',
  });
  next();
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
