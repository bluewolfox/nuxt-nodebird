module.exports = {
  head: {
    title: "nodebird nuxt 만들기",
  },
  modules: ["@nuxtjs/axios"],
  buildModules: ["@nuxtjs/vuetify"],
  axios: {
    browerBaseURL: "http://localhost:3085",
    baseURL: "http://localhost:3085",
    https: false,
  },
};
