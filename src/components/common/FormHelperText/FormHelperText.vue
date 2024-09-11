<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <p>{{ text }}</p>
</template>

<style scoped>
p {
  color: rgb(244, 67, 54);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
}
</style>