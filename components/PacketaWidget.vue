<template>
  <div>
    <button @click="openWidget">Open Packeta Widget</button>

    <!-- Selected point details -->
    <div v-if="selectedPoint">
      <h3>Selected Pickup Point Details</h3>
      <pre>{{ selectedPoint }}</pre>
      <!-- <p><strong>Address:</strong> {{ selectedPoint.address }}</p>
      <p><strong>City:</strong> {{ selectedPoint.city }}</p>
      <p><strong>Zip:</strong> {{ selectedPoint.zip }}</p>
      <p><strong>Country:</strong> {{ selectedPoint.country }}</p> -->
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      selectedPoint: null, // Holds the selected pickup point data
    };
  },
  mounted() {
    // Load Packeta Widget script dynamically
    const script = document.createElement("script");
    script.src = "https://widget.packeta.com/v6/www/js/library.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
  methods: {
    openWidget() {
      // Ensure Packeta is defined before using it
      if (typeof Packeta !== "undefined" && Packeta.Widget) {
        const apiKey = "c162186b5771d0f2"; // Replace with your actual API key
        const options = {
          language: "bg", // Widget language
          country: "cz", //cz Specify the country or region you want to focus on
        };

        Packeta.Widget.pick(apiKey, this.handlePickupPoint, options);
      } else {
        console.error("Packeta Widget is not loaded.");
      }
    },
    handlePickupPoint(pickupPoint) {
      if (pickupPoint) {
        // Store selected pickup point details
        this.selectedPoint = {
          name: pickupPoint.name || "",
          address: pickupPoint.address || "",
          city: pickupPoint.city || "",
          zip: pickupPoint.zip || "",
          country: pickupPoint.country || "",
        };
      } else {
        console.log("No point selected");
      }
    },
  },
};
</script>
  
  <style scoped>
button {
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #007bb5;
}

h3 {
  margin-top: 20px;
}

p {
  margin: 5px 0;
}
</style>
  