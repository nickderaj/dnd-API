import axios from 'axios';
import { hideAlert, showAlert } from './alert';

export const createSpell = async (
  name,
  desc,
  higherlvl,
  level,
  range,
  duration,
  concentration,
  castingtime,
  classes
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/spells',
      data: {
        name,
        desc,
        higherlevel: higherlvl,
        level,
        range,
        duration,
        concentration,
        castingtime,
        class: classes,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Spell created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    hideAlert();
    showAlert('error', err.response.data.message);
  }
};
