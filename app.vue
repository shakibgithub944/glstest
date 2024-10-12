<template>
  <div>
    <h1>Welcome to My GLS Tracker</h1>
    <PickupPointsMap />
  </div>
</template>

<script>
import PickupPointsMap from "@/components/PickupPointsMap";

export default {
  components: {
    PickupPointsMap,
  },
};
</script>