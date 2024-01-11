<script setup lang="ts">
import { taskStore, toggleTaskDone, deleteTask } from '~/stores/taskStore'

export type Task = {
  id: ULID
  label: string
  done: boolean
}

withDefaults(defineProps<Task>(), {
  done: true
})
</script>

<template>
  <div class="flex items-center">
    {{ taskStore.tasks.get(id) }} - {{ done }}
    <input
      v-if="done"
      type="checkbox"
      class="mr-3"
      :checked="true && true"
      @input="toggleTaskDone(id)"
    />
    <input
      v-else
      type="checkbox"
      class="mr-3"
      :checked="false"
      @input="toggleTaskDone(id)"
    />
    <span :class="{ 'line-through': done }" v-text="label" />

    <button type="button" @click="deleteTask(id)">x</button>
  </div>
</template>
