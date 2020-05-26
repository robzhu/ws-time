module.exports = {
  sleep: async (ms) => {
    return new Promise((res) => {
      setTimeout(() => res(), ms);
    });
  },
};
