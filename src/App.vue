<script setup lang="ts">
import { ref } from 'vue'
import { ulid } from 'ulidx'
import { taskLists } from '~/stores/taskStore'

import TaskList from '~/components/TaskList.vue'

const newListName = ref<string>('')
const newTaskName = ref<string>('')
const targetList = ref<string>(taskLists.value[0]?.id)
function addNewTask() {
  taskLists.value
    .find((list) => list.id === targetList.value)
    ?.tasks.push({
      id: ulid(),
      label: newTaskName.value.trim(),
      done: false
    })
  newTaskName.value = ''
}

function addNewList() {
  taskLists.value.push({
    id: ulid(),
    name: newListName.value.trim(),
    tasks: []
  })
  newListName.value = ''
}
</script>

<template>
  <header></header>

  <main class="flex flex-col gap-10">
    <section class="flex flex-col gap-10">
      <form @submit.prevent="addNewList">
        <fieldset class="dark:bg-slate-700 p-4 rounded-md border">
          <legend>Add a list</legend>
          <div class="grid grid-cols-2 grid-row-2 gap-y-1">
            <label for="newListName" class="col-span-2">List name</label>
            <input
              autocomplete="off"
              autocorrect="off"
              id="newListName"
              v-model="newListName"
              required
              minlength="1"
              type="text"
              class="rounded-s-md px-2 border-2 border-neutral-500 dark:bg-slate-800"
            />
            <button
              class=" px-2 w-8 rounded-e-md border-2 border-s-0 dark:bg-slate-900 border-neutral-500"
            >
              +
            </button>
          </div>
        </fieldset>
      </form>
      <form @submit.prevent="addNewTask" class="flex">
        <fieldset class="dark:bg-slate-700 p-4 rounded-md border shadow-md">
          <legend>Add a task to an existing list</legend>
          <div class="grid grid-cols-4 grid-row-2 gap-y-1">
            <label for="existingLists" class="">Select from list</label>
            <label for="newTaskName">Task name</label>
            <select
              id="existingLists"
              name="listName"
              aria-label="Task List"
              v-model="targetList"
              required
              class="row-start-2 rounded-s-md px-2 border-2 border-neutral-500 dark:bg-slate-800"
            >
              <option
                v-for="(list, idx) in taskLists"
                :selected="idx === 0"
                :value="list.id"
                :key="list.id"
              >
                {{ list.name }}
              </option>
            </select>
            <input
              id="newTaskName"
              aria-label="Task Name"
              autocomplete="off"
              autocorrect="off"
              v-model="newTaskName"
              required
              minlength="1"
              type="text"
              class="row-start-2 px-2 border-2 border-s-0 border-neutral-500 dark:bg-slate-800"
            />

            <button
              class="row-start-2 dark:bg-slate-900 px-2 w-8 rounded-e-md border-2 border-s-0 border-neutral-500"
            >
              +
            </button>
          </div>
        </fieldset>
      </form>
    </section>
    <section>
      <TransitionGroup name="list" tag="section" class="flex flex-col gap-10">
        <TaskList
          v-for="(list, i) in taskLists"
          :key="list.id"
          v-bind="list"
          v-model="taskLists[i]"
          @delete="taskLists.splice(i, 1)"
        />
      </TransitionGroup>
    </section>
  </main>
</template>

<style>
.newList {
  display: grid;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
