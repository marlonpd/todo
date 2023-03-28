<template>
 <div class="border rounded shadow pt-3 mt-3 w-50 main-container m-auto p-4">
    <div>
      <a href="#" @click="logout()">Logout</a>
    </div>
    <h1 class="text-center text-primary mb-4">TODO List</h1>
      <div class="d-flex input-box">
        <input
          v-model="todoTitle"
          type="text"
          class="form-control p-3 mr-2 ml-2"
          placeholder="Type something..."
          @keyup.enter="onSaveHandler"
        />
        <div
          class="bg bg-primary text-white p-3 cursor-pointer"
          @click="onSaveHandler"
        >
          Save
        </div>
      </div>
    <ul class="list-group list-group-flush">
      <li v-for="(item, index) in todos" :key="index" class="d-flex align-items-center row-container pe-4">
        <div
          class="d-flex align-items-center justify-content-center row-container__check"
        
        >
          <input type="checkbox" v-model="item.is_completed" @click="onCheckHandler(item)" 
              true-value="1"
              false-value="0"
          />
          <em
            class="fas fa-check"
            :class="{
              'row-container__check--checked': item.is_completed,
            }"
          />
        </div>
        <div class="flex-grow-1 ms-2 p-2 row-container__title  text-left">
          <span
            class="text-secondary user-select-none text-left"
            :class="{
              'text-strikethrough': item.is_completed,
            }"
          >
            <strike v-if="item.is_completed"> {{ item.title }}</strike>
            <span v-else >{{ item.title }}</span>
          </span>
        </div>
        <div
          class="ps-5 d-flex justify-content-end align-items-center row-container__action pe-2"
        >
          <a href="#" @click="onEditHandler(index, item)" class="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </a>
          <a href="#" @click="onDeleteHandler(index, item)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </a>
            
        
        </div>
      </li>
    
    </ul>

  </div>
  
</template>

<script setup lang="ts">
//core
import { ref, onMounted } from 'vue';

import todoService from '../services/todo';
import { routerPush } from '../router';
//types
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  isManually?: boolean;
}

//reactive properties
const todos = ref<Todo[]>([]);
const selectedTodo = ref<Todo | null>(null);
const selectedTodoIndex = ref<number | null>(null);
const todoTitle = ref<string>();
//constants
const RECORDS_SIZE = 15;
//methods
const fetchTodos = async () => {
  const response: Todo[] = await todoService.getTodos();
  todos.value = response.slice(0, RECORDS_SIZE);
};

const onCheckHandler = async (todo: Todo) => {
  if (todo?.id) {
    todo.is_completed = !todo.is_completed;

    const payload = {
      ...todo,
    };

    await todoService.updateTodo(payload);

    //set record as completed
    todo.is_completed = payload.is_completed;
  }
};

// const onChangeEntryHandler = (value: string) => {
//   todoTitle.value = value;
// };
const onEditHandler = async (todoIndex: number, todo: Todo) => {
  selectedTodo.value = { ...todo };
  selectedTodoIndex.value = todoIndex;
  todoTitle.value = todo.title;
};
const onDeleteHandler = async (todoIndex: number, todo: Todo) => {
  await todoService.deleteTodo(todo);
  todos.value.splice(todoIndex, 1);
  clearSelectedTodo();
};
const clearSelectedTodo = () => {
  selectedTodo.value = null;
  selectedTodoIndex.value = null;
  todoTitle.value = '';
};
const onSaveHandler = async () => {

  if (todoTitle.value) {

    //add new
    if (!selectedTodo.value?.id) {
      const payload = {
        title: todoTitle.value,
        is_completed: selectedTodo.value?.is_completed ?? false,
        isManually: !selectedTodo.value?.isManually,
      };

      const response = await todoService.addTodo(payload);
      if (response) {
        todos.value.unshift(response);
      }
    } else {
     const payload = {
          id: selectedTodo.value?.id, 
          title: todoTitle.value,
          is_completed: selectedTodo.value?.is_completed ?? false,
          isManually: !selectedTodo.value?.isManually,
        };

      await todoService.updateTodo(payload);

      todos.value[selectedTodoIndex.value!!].title = payload.title;
    }
    clearSelectedTodo();
  }
};
//lifecycle hooks
onMounted(() => {
   const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
    );
    document.head.appendChild(recaptchaScript);

  fetchTodos();
});

const logout = async () => {

  window.localStorage.removeItem('id_token');

  routerPush('login');
};
</script>

<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
