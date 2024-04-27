<script setup>
import { ref, watch } from 'vue'
let filter = ref('all')
let todos = ref(JSON.parse(window.localStorage.getItem('todos')) ?? [])
let newTodo = ref('')
let input = ref('')

function addTodo() {
  todos.value.push({
    text: newTodo.value,
    complete: false
  })
  newTodo.value = ''
}

function deleteTodo(index) {
  todos.value.splice(index, 1)
}

watch(todos, function (value) {
  window.localStorage.setItem('todos', JSON.stringify(value))
}, { deep: true })

function todoFilter(todo) {
  if (filter.value == 'Belum dikerjain') {
    return todo.complete == false
  } else if (filter.value == 'Sudah Selesai'){
    return todo.complete == true
  } else {
    return true
  }
}
function activeFilter (todo) {
  return todo.complete == false
}
</script>

<template>
  <div class="latar">
  <h1>Catatan Harian</h1>
  <p v-if="todos.length > 0">
  </p>
  <p> {{ todos.filter(activeFilter).length}} items left</p>
  <p>
  <input name="filter" type="radio" value="all" v-model="filter">
  <label>Semua</label>
  <input name="filter" type="radio" value="active" v-model="filter">
  <label>Belum dikerjain</label>
  <input name="filter" type="radio" value="complete" v-model="filter">
  <label>Susah Selesai</label>
  </p>
  <input v-model="newTodo" @keydown.enter="addTodo">
  <button @click="addTodo">Tambahkan</button>
  <div v-for="(todo, index) in todos.filter(todoFilter)" :class="{ completed: todo.complete }">
    <input type="checkbox" v-model="todo.complete">
    <button @click="deleteTodo">💀</button>

    {{ index }}
    {{ todo.text }}
 
</div>
</div>
<br>  
<div>
      <footer>
    <p>Copyright &copy;MUHAMMAD DHANDHY PUTERA IRVANTIE</p>
  </footer>
    </div>  
</template>


<style>

body {
  background: url('/src/Background.jpg') no-repeat center center fixed;
  background-size: cover;

  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: white;
}


.complete {
  text-decoration: line-through;
  color: #c2c2cc;
}
input[type="checkbox"]::before {
  /* ...existing styles */

  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  border-radius: 30px;
  padding: 35px, 30px;
  margin: 20px;

    background-color: rgb(239, 137, 96);
    border-radius: 15px;
    color:whitesmoke;
    padding: 8px 12px 10px 18px;
    /* border: 2px red solid; */
    border-width: 0 0 5px 0;
    border-color:indianred

}
footer {
  text-align: center;
  background-color: burlywood; /* Warna latar belakang kuning */
  padding: 20px 0; /* Padding atas dan bawah */
  font-size: 1.2rem; /* Ukuran font */
  color: whitesmoke; /* Warna teks */
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Bayangan untuk efek kedalaman */
  margin-bottom: 10px;
}

</style>