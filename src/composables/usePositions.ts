import { ref } from 'vue';

// Reactive array to store positions
export const positions = ref<{ lat: number; long: number; height: number; verticalSpeed: number }[]>([]);

// Function to calculate vertical speed
export function calculateVerticalSpeed(previousHeight: number, currentHeight: number, timeElapsed: number): number {
  return (currentHeight - previousHeight) / timeElapsed;
}