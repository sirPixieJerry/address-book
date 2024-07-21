<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  modelValue: string;
  type?: 'text' | 'password' | 'email';
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="form-group" :class="size ? size : ''">
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      :type="type || 'text'"
      @input="onInput"
      v-if="required"
      required
    />
    <input :id="name" :type="type || 'text'" @input="onInput" v-else />
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group.small input {
  width: 100px;
}

.form-group.medium input {
  width: 200px;
}

.form-group.large input {
  width: 300px;
}
</style>
