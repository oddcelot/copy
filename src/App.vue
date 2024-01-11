<script setup lang="ts">
import { ref } from 'vue'
import { addList, taskStore } from '~/stores/taskStore'

import TaskList from '~/components/TaskList.vue'

const newListName = ref<string>('')

function addNewList(ev: SubmitEvent) {
  const form = ev.currentTarget as HTMLFormElement
  addList(newListName.value)
  newListName.value = ''
  form.reset()
}
</script>

<template>
  <header>
    <h1 class="text-5xl font-bold underline">Hello world!</h1>
  </header>

  <main>
    <section>
      <form @submit.prevent="addNewList" class="flex">
        <label for="newListName">Create a new List</label>
        <input id="newListName" v-model="newListName" required minlength="1" type="text" />
        <button>+</button>
      </form>
    </section>
    <section class="mt-10 space-y-8 max-w-5xl w-full">
      <TaskList v-for="[key, list] in taskStore.lists" :key="key" v-bind="list" />
    </section>
  </main>
</template>

<style></style>
