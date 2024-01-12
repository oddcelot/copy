import { ref, watch } from 'vue'
import { type TaskList } from '~/components/TaskList.vue'

const storageKey = 'taskLists'

export const taskLists = ref<Array<TaskList>>([])

export function restoreFromLocal() {
  if (storageKey in localStorage) {
    taskLists.value = JSON.parse(localStorage.getItem('taskLists')!)
  }
}
restoreFromLocal()

watch(
  taskLists,
  (value) => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true }
)
