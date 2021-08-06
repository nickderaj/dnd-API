import axios from 'axios';
import { hideAlert, showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/UpdatePassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Updated ${type.toUpperCase()} successfully!`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    hideAlert();
    showAlert('error', err.response.data.message);
  }
};
