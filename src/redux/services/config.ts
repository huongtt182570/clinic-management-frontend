const getToken = () => {
  return localStorage.getItem('accessToken');
};

export default {
  api: {
    timeout: 300000,
    headers: {
      common: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  },
};
