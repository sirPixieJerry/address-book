<script setup lang="ts">
import { type Component, ref } from 'vue';
import { addRippleEffect } from './utils';

defineProps<{
  label: string;
  disabled?: boolean;
  icon?: Component;
}>();

const buttonRef = ref<HTMLButtonElement | null>(null);

const handleClick = (event: MouseEvent): void => {
  if (buttonRef.value) {
    addRippleEffect(buttonRef.value, event);
  }
};
</script>

<template>
  <button
    ref="buttonRef"
    type="submit"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
    <component :is="icon" v-if="icon" class="end-icon" />
  </button>
</template>

<style scoped>
@import '../../../assets/base.css';

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.87);
  background-color: var(--link);
  border-radius: 4px;
  padding: 6px 16px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  overflow: hidden;
  border: none;
  outline: none;
}

button.disabled {
  background-color: rgba(255, 255, 255, 0.12);
  cursor: not-allowed;
}

button:hover:not([disabled]) {
  background-color: var(--link-hover);
  color: var(--link);
  fill: var(--link);
}

button:focus:not([disabled]) {
  background-color: var(--link-hover);
  color: var(--link);
  fill: var(--link);
}

.end-icon {
  margin-right: -4px;
  margin-left: 8px;
  display: inline-flex;
}
</style>
