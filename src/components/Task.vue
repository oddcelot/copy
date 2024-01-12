<script setup lang="ts">
import { ulid } from 'ulidx'
import TrashIcon from '~/assets/trash.svg?raw'
export type Task = {
  id: ULID
  label: string
  done: boolean
}
const taskModel = defineModel<Task>({
  default: {
    id: ulid(),
    label: 'task',
    done: false
  }
})

defineProps<{ highlightedLabel?: string | false }>()
defineEmits(['delete'])
</script>

<template>
  <div class="flex items-center gap-2">
    <input :id="taskModel.id" type="checkbox" v-model="taskModel.done" />

    <span
      class="flex-grow"
      :class="{ 'line-through': taskModel.done }"
      v-html="highlightedLabel || taskModel.label"
    />
    <button
      class="fill-current [&>*]:w-4"
      type="button"
      @click="$emit('delete', taskModel)"
      v-html="TrashIcon"
    ></button>
  </div>
</template>
