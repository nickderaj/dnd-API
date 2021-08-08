import '@babel/polyfill';
import { login, logout } from './login';
import { createCharacter } from './createCharacter';
import { createSpell } from './createSpell';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { showAlert, hideAlert } from './alert';
import { addSpellsChar } from './addSpellsToChar';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.side-nav--logout');
const signupForm = document.querySelector('.form--signup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createCharacterForm = document.querySelector('.form-create-character');
const createSpellForm = document.querySelector('.form-create-spell');
const spellSearchForm = document.querySelector('.form-spell-search');
const characterSearchForm = document.querySelector('.form-character-search');
const characterPage = document.querySelector('.character-content-page');
const addSpellPageForm = document.querySelector('.form-add-spell-character');
const spellSpecificForm = document.querySelector('.spell-specific');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]); // files is an array, and since there is only 1, we take the first one
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('.btn--save-password');
    btn.textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    btn.textContent = 'Save Password';
  });
}

if (createCharacterForm) {
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
  const proficiencies = [];

  createCharacterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const charname = document.getElementById('charname').value;
    const race = document.getElementById('race').value;
    const charclass = document.getElementById('charclass').value;
    const health = document.getElementById('health').value;
    const level = document.getElementById('level').value;
    const ac = document.getElementById('ac').value;
    const initiative = document.getElementById('init').value;
    const strength = document.getElementById('strength').value;
    const dexterity = document.getElementById('dexterity').value;
    const constitution = document.getElementById('constitution').value;
    const intelligence = document.getElementById('intelligence').value;
    const wisdom = document.getElementById('wisdom').value;
    const charisma = document.getElementById('charisma').value;

    proficiencyTypes.forEach((el) => {
      document.getElementById(el).checked ? proficiencies.push(el) : '';
    });
    const npc = document.getElementById('npc').checked;
    createCharacter(
      charname,
      level,
      health,
      race,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      initiative,
      ac,
      charclass,
      proficiencies,
      npc
    );
  });
}

if (createSpellForm) {
  const classTypes = (classTypes = [
    'barbarian',
    'bard',
    'cleric',
    'druid',
    'fighter',
    'monk',
    'paladin',
    'ranger',
    'rogue',
    'sorcerer',
    'warlock',
    'wizard',
  ]);
  const classes = [];
  createSpellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const spellname = document.getElementById('spellname').value;
    const desc = document.getElementById('desc').value;
    const higherlvl = document.getElementById('higherlvl').value;
    const level = document.getElementById('level').value;
    const range = document.getElementById('range').value;
    const duration = document.getElementById('duration').value;
    const castingtime = document.getElementById('castingtime').value;
    let conc;
    document.getElementById('concentration').checked
      ? (conc = 'yes')
      : (conc = 'no');
    classTypes.forEach((el) =>
      document.getElementById(el).checked ? classes.push(el) : ''
    );

    createSpell(
      spellname,
      desc,
      higherlvl,
      level,
      range,
      duration,
      conc,
      castingtime,
      classes
    );
  });
}

if (spellSearchForm) {
  spellSearchForm.addEventListener('submit', (e) => {
    const searchquery = document.getElementById('search').value;
    const sortBy = document.getElementById('sortBy').value;
    const perPage = document.getElementById('perPage').value;
    e.preventDefault();
    location.assign(
      `/spell-list?sort=${sortBy.toLowerCase()}&limit=${perPage}${
        searchquery ? '&name=' : ''
      }${searchquery}`
    );
  });
}

if (characterSearchForm) {
  characterSearchForm.addEventListener('submit', (e) => {
    const searchquery = document.getElementById('search').value;
    const sortBy = document.getElementById('sortBy').value;
    const perPage = document.getElementById('perPage').value;
    e.preventDefault();
    location.assign(
      `/character-list?sort=${sortBy.toLowerCase()}&limit=${perPage}${
        searchquery ? '&name=' : ''
      }${searchquery}`
    );
  });
}

if (characterPage) {
  const overviewBtn = document.querySelector('.btn-overview');
  const spellsBtn = document.querySelector('.btn-spells');
  const inventoryBtn = document.querySelector('.btn-inventory');
  const featuresBtn = document.querySelector('.btn-features');
  const skillsBtn = document.querySelector('.btn-skills');
  const overview = document.getElementById('overview');
  const spells = document.getElementById('spells');
  const features = document.getElementById('features');
  const inventory = document.getElementById('inventory');
  const skills = document.getElementById('skillSection');
  const collection = [overview, spells, features, inventory, skills];

  const sectionClick = function (button, section) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      collection.forEach((e) => e.classList.add('hidden'));
      section.classList.remove('hidden');
    });
  };

  sectionClick(overviewBtn, overview);
  sectionClick(spellsBtn, spells);
  sectionClick(inventoryBtn, inventory);
  sectionClick(featuresBtn, features);
  sectionClick(skillsBtn, skills);
}

if (addSpellPageForm) {
  addSpellPageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const character = document.getElementById('character').value.split(':')[0];
    const spell = document.getElementById('spell').value.split(':')[0];
    addSpellsChar(character, spell);
  });
}

if (spellSpecificForm) {
  document.getElementById('gobackbutton').addEventListener('click', () => {
    window.history.back();
  });
}
