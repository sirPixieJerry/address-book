<script setup lang="ts">
import { IconButton } from '../../common';
import { IconAdd, IconRemove } from '../../icons';
import { useFormContext } from '../store';
import type { AddressType, CreateContactType, PhoneNumberType } from '../types';

const props = defineProps<{
  field: string;
  item: AddressType | PhoneNumberType;
}>();

const { addItem, removeItem } =
  useFormContext<CreateContactType>('createContact');

const handleAddItem = (evt: Event) => {
  evt.preventDefault();
  addItem(props.field, { ...props.item });
};

const handleRemoveItem = (evt: Event) => {
  evt.preventDefault();
  removeItem(props.field);
};
</script>

<template>
  <div class="group">
    <IconButton :icon="IconAdd" @click="handleAddItem" />
    <IconButton :icon="IconRemove" @click="handleRemoveItem" />
  </div>
</template>

<style scoped>
.group {
  display: inline-flex;
  flex-direction: row;
  gap: 8px;
}
</style>
