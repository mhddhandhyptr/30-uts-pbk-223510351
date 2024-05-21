<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="activeMenu = 'todos'" :class="{ active: activeMenu === 'todos' }">Todos</li>
          <li @click="activeMenu = 'posts'" :class="{ active: activeMenu === 'posts' }">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'todos'">
        <TodoList :initialActivities="activities" />
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <Posts :users="users" :posts="posts" />
      </div>
    </main>
  </div>
</template>

<script>
import TodoList from './Component/TodoList.vue'
import Posts from './Component/Posts.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Posts
  },
  data() {
    return {
      activeMenu: 'todos',
      activities: [],
      users: [],
      posts: [],
    };
  },
  mounted() {
    // Fetch users data
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });

    // Fetch posts data
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      });
  }
};
</script>

<style scoped>
#app {
  background: url('/src/bground.jpeg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
  filter: brightness(0.8);

}


header {
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin: 0 15px;
  padding: 10px;
  cursor: pointer;
  color: chocolate;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav ul li:hover {
  color: burlywood;
}

nav ul li.active {
  border-bottom: 2px solid #FFD700;
}

main {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  color: black;
  text-align: center;
  margin-top: 50px;
  font-weight: 600;
}

form {
  margin: 20px;
  text-align: center;
}

label {
  display: inline-block;
  margin-right: 10px;
  text-align: right;
  width: 80px;
  font-weight: 600;
}

input[type="text"] {
  border: 2px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  margin: 5px 0;
  padding: 10px;
  width: 200px;
}

button {
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

li:hover {
  background-color: #ddd;
}

li button {
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  float: right;
  font-size: 14px;
  margin-left: 5px;
  padding: 5px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

li button:last-child {
  background-color: #4CAF50;
}

li button:hover {
  background-color: #e60000;
}

li button:last-child:hover {
  background-color: #45a049;
}

li.completed {
  text-decoration: line-through;
}
</style>
