const mongoose = require('mongoose');
const slugify = require('slugify');

const proficiencyTypes = [
  'acrobatics',
  'animal handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight of hand',
  'stealth',
  'survival',
];
// const statTypes = [
//   'strength',
//   'dexterity',
//   'constitution',
//   'intelligence',
//   'wisdom',
//   'charisma',
// ];

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A character must have a name'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A character name must be less than or equal to 40 characters.',
    ],
  },
  slug: String,
  level: {
    type: Number,
    required: [true, 'A character must have a level'],
  },
  health: {
    type: Number,
    required: [true, 'A character must have a max health'],
  },
  race: {
    type: String,
    required: [true, 'A character must have a race'],
  },
  strength: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a strength stat'],
  },
  dexterity: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a dexterity stat'],
  },
  constitution: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a constitution stat'],
  },
  intelligence: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a intelligence stat'],
  },
  wisdom: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a wisdom stat'],
  },
  charisma: {
    type: Number,
    default: 0,
    min: [1, 'Stat must be at least 1'],
    max: [30, 'Stat can be at most 30'],
    set: (val) => Math.round(val * 10) / 10,
    required: [true, 'A character must have a charisma stat'],
  },
  proficiencies: {
    type: [String],
    default: '',
    enum: {
      values: proficiencyTypes,
      message: `List of possible proficiencies: ${proficiencyTypes.join(', ')}`,
    },
  },
  image: {
    type: String,
    default: 'defaultchar.jpg',
  },
  initiative: {
    type: Number,
    default: 0,
  },
  ac: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  npc: {
    type: Boolean,
    default: false,
  },
  stats: {
    type: Object,
    default: {},
  },
  inventory: {
    type: Object,
    default: { Gold: 0 },
  },
  //////////////////////////////////////////////////
  // Linked Schemas
  //////////////////////////////////////////////////
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
    required: [true, 'A character must have a class'],
  },
  spells: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Spell',
    },
  ],
});

// MIDDLEWARE
characterSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

characterSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'class',
    // select: 'name -spellslots',
  }).populate({
    path: 'spells',
    select: 'name castingtime range concentration level',
  });
  next();
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
