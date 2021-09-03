modifierCalc = (stat) => {
  if (+stat === '1') return '-5';
  if (+stat <= '3') return '-4';
  if (+stat <= '5') return '-3';
  if (+stat <= '7') return '-2';
  if (+stat <= '9') return '-1';
  if (+stat <= '11') return '0';
  if (+stat <= '13') return '+1';
  if (+stat <= '15') return '+2';
  if (+stat <= '17') return '+3';
  if (+stat <= '19') return '+4';
  if (+stat <= '21') return '+5';
  if (+stat <= '23') return '+6';
  if (+stat <= '25') return '+7';
  if (+stat <= '27') return '+8';
  if (+stat <= '29') return '+9';
  if (+stat >= '30') return '+10';
};

modifierPB = (level) => {
  if (+level <= 4) return '+2';
  if (+level <= 8) return '+3';
  if (+level <= 12) return '+4';
  if (+level <= 16) return '+5';
  if (+level <= 20) return '+6';
};

exports.characterMods = (character) => {
  // Stat Mods
  character.stats.strengthMod = modifierCalc(character.strength);
  character.stats.dexterityMod = modifierCalc(character.dexterity);
  character.stats.constitutionMod = modifierCalc(character.constitution);
  character.stats.wisdomMod = modifierCalc(character.wisdom);
  character.stats.intelligenceMod = modifierCalc(character.intelligence);
  character.stats.charismaMod = modifierCalc(character.charisma);

  // Proficiency Bonus
  character.stats.proficiencyBonus = modifierPB(character.level);
  character.stats.samMod = modifierCalc(
    character[character.class.sam.toLowerCase()]
  );
  const checkProficiency = (stat) => {
    if (character.class.name == 'Bard') {
      if (character.proficiencies.includes(stat))
        return +character.stats.proficiencyBonus;
      else {
        return Math.floor(+(character.stats.proficiencyBonus / 2));
      }
    } else {
      if (character.proficiencies.includes(stat))
        return +character.stats.proficiencyBonus;
      return 0;
    }
  };
  // Proficiency Mods
  if (character.name === 'Delilelf') {
    character.stats.acrobatics =
      +character.stats.dexterityMod + checkProficiency('acrobatics');
    character.stats.animalhandling =
      +character.stats.wisdomMod + checkProficiency('animal handling');
    character.stats.arcana =
      +character.stats.intelligenceMod + checkProficiency('arcana');
    character.stats.athletics =
      +character.stats.strengthMod + checkProficiency('athletics');
    character.stats.deception =
      +character.stats.charismaMod + checkProficiency('deception');
    character.stats.history =
      +character.stats.intelligenceMod + checkProficiency('history');
    character.stats.insight =
      +character.stats.wisdomMod + checkProficiency('insight');
    character.stats.intimidation =
      +character.stats.charismaMod + checkProficiency('intimidation');
    character.stats.investigation =
      +character.stats.intelligenceMod + checkProficiency('investigation');
    character.stats.medicine =
      +character.stats.wisdomMod + checkProficiency('medicine');
    character.stats.nature =
      +character.stats.intelligenceMod + checkProficiency('nature');
    character.stats.perception =
      +character.stats.wisdomMod + checkProficiency('perception');
    character.stats.performance =
      +character.stats.charismaMod + 2 * checkProficiency('performance');
    character.stats.persuasion =
      +character.stats.charismaMod + 2 * checkProficiency('persuasion');
    character.stats.religion =
      +character.stats.intelligenceMod + checkProficiency('religion');
    character.stats.sleightofhand =
      +character.stats.dexterityMod + checkProficiency('sleight of hand');
    character.stats.stealth =
      +character.stats.dexterityMod + checkProficiency('stealth');
    character.stats.survival =
      +character.stats.wisdomMod + checkProficiency('survival');
    return character;
  } else {
    character.stats.acrobatics =
      +character.stats.dexterityMod + checkProficiency('acrobatics');
    character.stats.animalhandling =
      +character.stats.wisdomMod + checkProficiency('animal handling');
    character.stats.arcana =
      +character.stats.intelligenceMod + checkProficiency('arcana');
    character.stats.athletics =
      +character.stats.strengthMod + checkProficiency('athletics');
    character.stats.deception =
      +character.stats.charismaMod + checkProficiency('deception');
    character.stats.history =
      +character.stats.intelligenceMod + checkProficiency('history');
    character.stats.insight =
      +character.stats.wisdomMod + checkProficiency('insight');
    character.stats.intimidation =
      +character.stats.charismaMod + checkProficiency('intimidation');
    character.stats.investigation =
      +character.stats.intelligenceMod + checkProficiency('investigation');
    character.stats.medicine =
      +character.stats.wisdomMod + checkProficiency('medicine');
    character.stats.nature =
      +character.stats.intelligenceMod + checkProficiency('nature');
    character.stats.perception =
      +character.stats.wisdomMod + checkProficiency('perception');
    character.stats.performance =
      +character.stats.charismaMod + checkProficiency('performance');
    character.stats.persuasion =
      +character.stats.charismaMod + checkProficiency('persuasion');
    character.stats.religion =
      +character.stats.intelligenceMod + checkProficiency('religion');
    character.stats.sleightofhand =
      +character.stats.dexterityMod + checkProficiency('sleight of hand');
    character.stats.stealth =
      +character.stats.dexterityMod + checkProficiency('stealth');
    character.stats.survival =
      +character.stats.wisdomMod + checkProficiency('survival');
    return character;
  }
};
