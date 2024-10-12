export default {
  buildModules: ["@nuxtjs/vuetify"],

  vuetify: {
    // Vuetify options
    theme: { dark: false },
    head: {
      script: [
        {
          src: "https://widget.packeta.com/v6/www/js/library.js", // Packeta Widget script
          async: true,
          defer: true,
        },
      ],
    },
  },

  compatibilityDate: "2024-10-12",
};
