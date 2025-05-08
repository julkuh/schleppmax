<template>
  <div id="map" style="height: 500px;" />
</template>

<script lang="ts" setup>
  import { onMounted, watch } from 'vue';
  import L from 'leaflet';
  import { positions } from '@/composables/usePositions'; // Import positions from usePositions
  import airplaneIcon from '@/assets/planeMarker.svg'; // Import an airplane icon

  let map: L.Map;
  let polyline: L.Polyline;
  let marker: L.Marker;

  onMounted(() => {
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    polyline = L.polyline([], { color: 'blue' }).addTo(map);

    marker = L.marker([0, 0], {
      icon: L.icon({
        iconUrl: airplaneIcon,
        iconSize: [32, 32], // Adjust size as needed
        iconAnchor: [16, 16],
      }),
    }).addTo(map);
  });

  watch(
    positions,
    newPositions => {
      const latLngs = newPositions.map(pos => [pos.lat, pos.long]);
      polyline.setLatLngs(latLngs);
      if (latLngs.length > 0) {
        const lastPosition = latLngs[latLngs.length - 1];
        map.setView(lastPosition, map.getZoom());
        marker.setLatLng(lastPosition); // Update marker position
      }
    },
    { deep: true }
  );
</script>
