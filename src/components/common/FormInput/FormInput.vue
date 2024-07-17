<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
}>();
</script>

<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <input :id="name" :type="type || 'text'" v-if="required" required />
    <input :id="name" :type="type || 'text'" v-else />
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
</style>
