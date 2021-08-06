import axios from 'axios';
import { hideAlert, showAlert } from './alert';

export const addSpellsChar = async function (character, spell) {
  try {
    const currentChar = await axios({
      method: 'GET',
      url: `/api/v1/characters/${character}`,
    });
    let spellsArray = [];
    currentChar.data.data.spells.forEach((e) => spellsArray.push(e._id));
    spellsArray.push(spell);

    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/characters/${character}`,
      data: {
        spells: spellsArray,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Spell added successfully!');
    }
  } catch (err) {
    hideAlert();
    showAlert('error', err.response.data.message);
  }
};
