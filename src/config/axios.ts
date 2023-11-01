import axios from 'axios';

// Intercept all responses
axios.interceptors.response.use(
  async (response) => response,
  (error) => {
    if (error?.response?.data) {
      console.log('resssponse', error.response);
      if (error.response.data.message) {
        error.message = error.response.data.message;
      } else {
        error.response.data.message = error.response.data;
      }

      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
