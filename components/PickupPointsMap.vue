<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Select a GLS Pickup Point</h1>
      </v-col>
      <v-col cols="12">
        <!-- Button to open GLS Plugin -->
        <v-btn color="primary" @click="openGlsMap">Select Pickup Point</v-btn>
      </v-col>
      <v-col cols="12">
        <!-- Div where GLS plugin will render -->
        <div
          id="my-plugin"
          style="
            width: 90%;
            height: 800px;
            border: 1px solid #ccc;
            margin-top: 20px;
          "
        ></div>
      </v-col>
      <v-col cols="12">
        <!-- Container to show selected pickup point details -->
        <h2>Selected Pickup Point:</h2>
        <pre>{{ pickupPointDetails }}</pre>
      </v-col>
      <v-col cols="12">
        <!-- Close button for the plugin -->
        <v-btn color="error" @click="closeGlsMap"
          >Close Pickup Point Selector</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pickupPointDetails: null,
    };
  },
  mounted() {
    // Load the GLS Plugin script when component is mounted
    (function (w, d, i) {
      var f = d.getElementsByTagName("script")[0],
        j = d.createElement("script");
      j.async = true;
      j.src = "https://plugin.gls-slovakia.sk/v1/" + i;
      f.parentNode.insertBefore(j, f);
    })(
      window,
      document,
      "A13D8A67AC46781E04A04C5D0F3B53EA248088022DD62DA5D800EB3B395B0E61DD88C281F1FF0FCCC276B26B5EA7AE70A9A39BFF2137FD6F1859760C3ADBF975"
    );
  },
  methods: {
    // Function to open GLS map plugin
    openGlsMap() {
      if (typeof GlsWidget !== "undefined") {
        GlsWidget.open(this.onPointSelect, {
          lang: "en", // Language for the plugin ('sk' or 'en')
          renderTo: "#my-plugin", // Renders the map into the specified div
          find: 1, // Allows users to find and select a pickup point
          noHeader: 0, // Show header (0 = show, 1 = hide)
          returnUrl: null, // No redirection after selection
          ctrCode: "SK", // Show pickup points for Slovakia ('SK')
          location: "Bratislava", // Center map to Bratislava initially
          exclude: ["AlzaBoxSK"], // Example exclusion of pickup points
        });
      } else {
        console.log("GLS Widget is not loaded yet.");
      }
    },
    // Callback function when a pickup point is selected
    onPointSelect(point) {
      this.pickupPointDetails = JSON.stringify(point, null, 2);
      // Automatically close the plugin after selection
      GlsWidget.close();
    },
    // Function to manually close the GLS map plugin
    closeGlsMap() {
      if (typeof GlsWidget !== "undefined") {
        GlsWidget.close();
      } else {
        console.log("GLS Widget is not loaded yet.");
      }
    },
  },
};
</script>

<style scoped>
#my-plugin {
  margin-top: 20px;
}
</style>
