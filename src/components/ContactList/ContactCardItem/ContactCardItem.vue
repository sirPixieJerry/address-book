<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  index: number;
}>();
</script>

<template>
  <div class="item-wrapper">
    <div class="icon-wrapper">
      <component :is="icon" v-if="index === 0" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.item-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.icon-wrapper {
  width: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
