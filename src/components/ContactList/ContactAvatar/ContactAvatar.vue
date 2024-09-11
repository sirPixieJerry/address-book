<script setup lang="ts">
import { ref } from 'vue';
import { getAvatarColor, getInitials } from './utils';

const props = defineProps<{
  firstName: string;
  lastName: string;
  size?: 'small' | 'large';
}>();

const avatarSizeClass = ref<string>('small-avatar');

avatarSizeClass.value =
  props.size === 'large' ? 'large-avatar' : 'small-avatar';

const avatarColor = getAvatarColor(props.firstName, props.lastName);
const initials = getInitials(props.firstName, props.lastName);
</script>

<template>
  <div class="avatar-root" :class="avatarSizeClass">
    <p>{{ initials }}</p>
  </div>
</template>

<style scoped>
.avatar-root {
  background-color: v-bind(avatarColor);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.small-avatar {
  font-size: 1rem;
  width: 40px;
  height: 40px;
}

.large-avatar {
  font-size: 2.5rem;
  width: 100px;
  height: 100px;
}
</style>
