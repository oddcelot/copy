<script setup lang="ts">
import { computed, ref } from 'vue'
import { ulid } from 'ulidx'
import Task from '~/components/Task.vue'
import TrashIcon from '~/assets/trash.svg?raw'
import type { Task as TaskType } from '~/components/Task.vue'

export type TaskList = {
  id: ULID
  name: string
  tasks: Array<TaskType>
}

const taskListModel = defineModel<TaskList>({
  default: {
    id: ulid(),
    name: 'list',
    tasks: []
  }
})

const taskListForm = ref<HTMLFormElement | undefined>()
const newTaskLabel = ref<TaskType['label']>('')
const searchQuery = ref<string>('')
// TODO: investigate why regex does not apply correctly
// const searchRegExpComputed = computed(
//   () => new RegExp(`${[...searchQuery.value].join('(?:[^a-z])*') || ''}`, 'gi')
// )
const createSearchRegExp = (string: string) =>
  new RegExp(`${[...string].join('(?:[^a-z0-9])*') || ''}`, 'i')

function addNewTask() {
  taskListModel.value.tasks.push({
    id: ulid(),
    label: newTaskLabel.value,
    done: false
  })
  newTaskLabel.value = ''
}

function deleteTask(task: TaskType) {
  taskListModel.value.tasks.splice(
    taskListModel.value.tasks.findIndex((t) => t === task),
    1
  )
}
const filtered = computed(() => {
  if (searchQuery.value.length > 0) {
    const matchingTasks = [...taskListModel.value.tasks].filter((task) => {
      return createSearchRegExp(searchQuery.value).test(task.label)
    })
    return matchingTasks
  }

  return [...taskListModel.value.tasks]
})
const sorted = computed(() =>
  [...filtered.value].sort((a, b) => {
    return a.done === b.done ? b.id.localeCompare(a.id) : a.done ? 1 : -1
  })
)

defineEmits(['delete'])

function highlight(string: string) {
  if (searchQuery.value.length === 0) return false
  const regexp = createSearchRegExp(searchQuery.value)
  return string.replace(regexp, `<mark>${string.match(regexp)}</mark>`)
}
</script>

<template>
  <form
    ref="taskListForm"
    class="shadow-md rounded-md border p-4 dark:bg-slate-900 space-y-2"
    @submit.prevent="addNewTask"
  >
    <legend class="flex justify-between font-bold">
      {{ taskListModel.name }}
      <button
        class="fill-current [&>*]:w-4"
        type="button"
        @click="$emit('delete', taskListModel)"
        v-html="TrashIcon"
      />
    </legend>
    <input
      type="search"
      placeholder="Search"
      v-model.trim="searchQuery"
      @keydown.enter.prevent=""
      class="rounded-md px-2 border-2 border-neutral-500"
    />

    <div>
      <input
        autocomplete="off"
        autocorrect="off"
        required
        v-model.trim="newTaskLabel"
        name="newTaskLabel"
        type="text"
        class="rounded-s-md px-2 border-2 border-e-0 border-neutral-500"
      /><button class="rounded-e-md px-2 border-2 border-neutral-500">+</button>
    </div>
    <span v-if="searchQuery && sorted.length === 0">Sorry, no matching tasks :(</span>

    <TransitionGroup name="task" tag="ul" class="space-y-2 mt-2">
      <li v-for="(task, i) in sorted" :key="task.id">
        <Task
          v-model="sorted[i]"
          :key="task.id"
          @delete="deleteTask"
          :highlighted-label="highlight(task.label)"
        />
      </li>
    </TransitionGroup>
  </form>
</template>

<style>
.task-move,
.task-enter-active,
.task-leave-active {
  transition: all 0.5s ease;
}

.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-leave-active {
  position: absolute;
}
</style>
