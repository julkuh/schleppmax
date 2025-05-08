<template>
  <v-app>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Schleppmax</v-toolbar-title>
    </v-toolbar>
    <v-main>
      <v-container>
        <router-view />
        <v-list>
          <v-list-item v-for="(position, index) in positions" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                Vertical Speed: {{ position.verticalSpeed.toFixed(2) }} m/s, Height: {{ position.height }} m
              </v-list-item-title>
              <v-list-item-subtitle>
                Lat: {{ position.lat }}, Long: {{ position.long }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { calculateVerticalSpeed, positions } from '@/composables/usePositions';

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude, altitude } = position.coords;
          const height = altitude || 0; // Use 0 if altitude is not available

          // Calculate vertical speed if there is a previous position
          const lastPosition = positions.value[positions.value.length - 1];
          const verticalSpeed = lastPosition
            ? calculateVerticalSpeed(lastPosition.height, height, 1) // Assuming 1 second interval
            : 0;

          // Add the new position to the list
          positions.value.push({
            lat: latitude,
            long: longitude,
            height,
            verticalSpeed,
          });
        },
        error => {
          console.error('Error getting geolocation:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  });
</script>
