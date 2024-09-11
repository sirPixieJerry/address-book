<script setup lang="ts">
defineProps<{
  legend: string;
}>();
</script>

<template>
  <fieldset class="form-section">
    <div class="legend">
      <legend>{{ legend }}</legend>
      <hr class="divider" />
    </div>
    <slot></slot>
  </fieldset>
</template>

<style scoped>
@import '../../../assets/base.css';

.divider {
  border-color: var(--color-border);
}

.legend {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend legend {
  font-size: 1.17em;
  margin-left: 12px;
  color: var(--color-text);
}

.form-section {
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
}
</style>
