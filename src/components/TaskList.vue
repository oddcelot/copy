<script setup lang="ts">
import { ref } from 'vue'
import { ulid } from 'ulidx'
import { taskStore, deleteList, taskIdsFromList, addTask } from '~/stores/taskStore'
import type { Task as TaskType } from '~/components/Task.vue'

import Task from '~/components/Task.vue'

export type TaskList = {
  id: ULID
  name: string
}

const taskListForm = ref<HTMLFormElement | undefined>()
const taskLabelInputElement = ref<HTMLInputElement | undefined>()
const newTaskLabel = ref<TaskType['label']>('')

function addNewTask(ev: SubmitEvent) {
  const target = ev.currentTarget as HTMLFormElement
  //   target.reportValidity
  //   target.checkValidity()
  //   target.reportValidity()
  target.reset(), addTask(newTaskLabel.value, props.id)
}

const props = withDefaults(defineProps<TaskList>(), {
  id: ulid(),
  tasks: () => new Map()
})
</script>

<template>
  <form ref="taskListForm" class="shadow-md rounded-md border p-4" @submit.prevent="addNewTask">
    <legend class="font-bold">
      {{ name }} <button type="button" @click="deleteList(id)">x</button>
    </legend>

    <section>
      <input required v-model="newTaskLabel" name="newTaskLabel" type="text" /><button>+</button>
    </section>
    <ul class="space-y-2 mt-2">
      <li v-for="key in taskIdsFromList(id)" :key="key">
        <Task v-bind="taskStore.tasks.get(key)" />
      </li>
    </ul>
  </form>
</template>
