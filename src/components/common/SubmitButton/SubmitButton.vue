<script setup lang="ts">
import { ref } from 'vue';
import { addRippleEffect } from './utils';

defineProps<{
  label: string;
  disabled?: boolean;
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
    v-if="disabled"
    type="submit"
    @click="handleClick"
    ref="buttonRef"
    class="disabled"
    disabled
  >
    {{ label }}
  </button>
  <button v-else type="submit" @click="handleClick" ref="buttonRef">
    {{ label }}
  </button>
</template>

<style scoped>
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
  background-color: rgb(144, 202, 249);
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
  background-color: rgb(66, 165, 245);
}
</style>

<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  width: 40px;
  height: 40px;
  transform: scale(0);
  animation: ripple-animation 0.4s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
