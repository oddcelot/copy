<script setup lang="ts">
import { ref, provide } from 'vue'
import { ulid } from 'ulidx'
import { taskLists } from '~/stores/taskStore'

import TaskList from '~/components/TaskList.vue'

function addList(name: string) {
  taskLists.value.push({
    id: ulid(),
    name,
    tasks: []
  })
}
provide('todoLists', { taskLists, addList })

const newListName = ref<string>('')

function addNewList() {
  taskLists.value.push({
    id: ulid(),
    name: newListName.value.trim(),
    tasks: []
  })
  newListName.value = ''
}
const testRef = ref({ id: ulid(), name: newListName.value.trim(), tasks: [] })
</script>

<template>
  <header>
    <h1 class="text-5xl font-bold underline">Hello world!</h1>
  </header>

  <main>
    <section>
      <form @submit.prevent="addNewList" class="flex">
        <label for="newListName">Create a new List ()</label>
        <input id="newListName" v-model="newListName" required minlength="1" type="text" />
        <button>+</button>
      </form>
    </section>
    <section class="mt-10 space-y-8 max-w-5xl w-full">
      <TaskList v-for="(list, i) in taskLists" :key="list.id" v-bind="list" v-model="taskLists[i]" />
    </section>
  </main>
</template>

<style></style>
