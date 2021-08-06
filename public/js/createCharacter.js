import axios from 'axios';
import { hideAlert, showAlert } from './alert';

export const createCharacter = async (
  name,
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
) => {
  try {
    let currentClass;
    const classes = await axios({
      method: 'GET',
      url: '/api/v1/classes',
    });
    await classes.data.data.forEach((el) => {
      el.name === charclass ? (currentClass = el._id) : '';
    });
    const res = await axios({
      method: 'POST',
      url: '/api/v1/characters',
      data: {
        name,
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
        class: currentClass,
        proficiencies,
        npc,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Character created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    hideAlert();
    showAlert('error', err.response.data.message);
  }
};
