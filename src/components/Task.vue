<script setup lang="ts">
import { ref } from 'vue'
import { toggleTaskDone, deleteTask } from '~/stores/taskStore'
import { inject } from 'vue'
import { ulid } from 'ulidx'
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
// const props = withDefaults(defineProps<Task>(), {
//   done: true
// })
</script>

<template>
  <div class="flex items-center">
    {{ taskModel }}
    <input type="checkbox" class="mr-3"  checked />
    <span :class="{ 'line-through': taskModel.done }" v-text="taskModel.label" />
    <button type="button">x</button>
  </div>
</template>
