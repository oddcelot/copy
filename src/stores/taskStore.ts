import { reactive, ref } from 'vue'
import { ulid } from 'ulidx'
import { type TaskList } from '~/components/TaskList.vue'
import { type Task } from '~/components/Task.vue'

type TasksInLists = [taskListId: TaskList['id'], taskIds: Array<Task['id']>] | []
export const taskStore = reactive({
  lists: new Map<TaskList['id'], TaskList>(),
  tasks: new Map<Task['id'], Task>(),
  tasksInLists: new Map<TaskList['id'], Set<Task['id']>>(),
  tasksInListsArray: [] as TasksInLists
})

export const taskLists = ref<Array<TaskList>>([
  { id: '1', name: 'Inbox', tasks: [{ id: '1', label: 'test', done: true }] },
  { id: '2', name: 'Today', tasks: [] },
  { id: '3', name: 'Tomorrow', tasks: [] }
])

export function addList(name: TaskList['name']) {
  const id = ulid()
  taskStore.lists.set(id, { id, name })
  taskStore.tasksInLists.set(id, new Set())
}

export function deleteList(id: ULID) {
  return taskStore.lists.delete(id)
}

export function addTask(label: Task['label'], listId: TaskList['id']) {
  const id = ulid()
  taskStore.tasks.set(id, { id, label, done: false })
  taskStore.tasksInLists.get(listId)?.add(id)
}

export function deleteTask(id: ULID) {
  const relatedListId = listIdFromTask(id)
  relatedListId && taskStore.tasksInLists.get(relatedListId)?.delete(id)
  return taskStore.tasks.delete(id)
}

export function taskIdsFromList(listId: TaskList['id']) {
  return taskStore.tasksInLists.get(listId)?.values()
}

export function listIdFromTask(taskId: Task['id']) {
  return [...taskStore.tasksInLists].find(([listId, taskIds]) => taskIds.has(taskId))?.[0]
}

export function toggleTaskDone(id: Task['id']) {
  const task = taskStore.tasks.get(id)
  if (task) {
    setTimeout(() => {
      task.done = !task.done
    }, 500)
  }
}
