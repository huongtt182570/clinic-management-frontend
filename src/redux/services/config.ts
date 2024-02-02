export default {
  api: {
    timeout: 300000,
    headers: {
      common: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  },
};
