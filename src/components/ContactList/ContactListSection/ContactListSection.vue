<script setup lang="ts">
import type { ContactType } from '../types';
import { ContactListItem } from '../ContactListItem';

defineProps<{
  letter: string | number;
  contacts: ContactType[];
}>();
</script>

<template>
  <h2 :id="'group-' + letter">{{ letter }}</h2>
  <hr class="divider" />
  <ul :aria-labelledby="'group-' + letter" class="contact-list">
    <ContactListItem
      v-for="(item, index) in contacts"
      :key="index"
      :contact="item"
    />
  </ul>
</template>

<style scoped>
@import '../../../assets/base.css';

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.divider {
  border-color: var(--color-border);
}

@media (min-width: 480px) {
  ul {
    min-width: 480px;
  }
}
</style>
