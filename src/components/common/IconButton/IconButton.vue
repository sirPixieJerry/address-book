<script setup lang="ts">
import { type Component, ref } from 'vue';
import { addRippleEffect } from './utils';

defineProps<{
  icon: Component;
}>();

const buttonRef = ref<HTMLButtonElement | null>(null);

const handleClick = (evt: MouseEvent): void => {
  evt.preventDefault();
  if (buttonRef.value) {
    addRippleEffect(buttonRef.value);
  }
};
</script>

<template>
  <button ref="buttonRef" type="button" @click="handleClick">
    <component :is="icon" />
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
  background-color: transparent;
  user-select: none;
  vertical-align: middle;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  cursor: pointer;
  overflow: hidden;
  border: none;
  outline: none;
}

button svg {
  fill: var(--link);
  z-index: 1;
}

button:hover {
  background-color: rgba(144, 202, 249, 0.08);
}

button:focus {
  background-color: rgba(144, 202, 249, 0.08);
}
</style>

<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(144, 202, 249, 0.4);
  width: 36px;
  height: 36px;
  transform: scale(0);
  animation: ripple-animation 0.4s linear;
  pointer-events: none;
  z-index: 0;
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
