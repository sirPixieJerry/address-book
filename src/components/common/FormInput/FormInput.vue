<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { FormHelperText } from '../FormHelperText';
import type { SizeType } from './types';
import { getWidth } from './utils';
import { type RuleOptionsType } from '@/components/CreateContactForm';
import { useFormContext } from '@/components/CreateContactForm/store/useFormContext';

const props = defineProps<{
  label: string;
  name: string;
  modelValue: string;
  type?: 'text' | 'password' | 'email';
  size?: SizeType;
  rules?: RuleOptionsType;
}>();

const black = ref('0, 0, 0');

const { getErrors, setRules } = useFormContext('createContact');

onMounted(() => {
  if (props.rules) {
    setRules(props.name, props.rules);
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const errors = computed(() => getErrors(props.name));
</script>

<template>
  <label :for="name" class="input" :style="{ width: getWidth(size) }">
    <input
      :id="name"
      :type="type || 'text'"
      placeholder="&nbsp;"
      :value="modelValue"
      @input="onInput"
    />
    <span class="label">{{ label }}</span>
    <span class="focus-bg"></span>
  </label>
  <FormHelperText v-if="errors.length" :text="errors[0].message" />
</template>

<style scoped>
@import '../../../assets/base.css';

.input {
  position: relative;
  margin: auto;
  width: 100%;
  border-radius: 4px 4px 0px 0px;
  overflow: hidden;
}

.label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-weight: 400;
  font-size: 0.975rem;
  color: var(--color-heading);
  transform-origin: 0 0;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
  pointer-events: none;
}

.focus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--link-hover);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left;
}

input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 16px 12px 0 12px;
  height: 56px;
  font-size: 16px;
  font-weight: 400;
  background: var(--link-hover);
  box-shadow: inset 0 -1px 0 var(--color-border);
  color: var(--color-heading);
  transition: all 0.15s ease;
}

input:hover {
  background: var(--link);
  box-shadow: inset 0 -1px 0 var(--color-heading);
}

input:not(:placeholder-shown) + .label {
  color: var(--color-heading);
  transform: translate3d(0, -12px, 0) scale(0.75);
}

input:focus {
  background: rgba(v-bind(black), 0.05);
  outline: none;
  box-shadow: inset 0 -2px 0 var(--link);
}

input:focus + .label {
  color: var(--link);
  transform: translate3d(0, -12px, 0) scale(0.75);
}

input:focus + .label + .focus-bg {
  transform: scaleX(1);
  transition: all 0.2s ease;
}
</style>
