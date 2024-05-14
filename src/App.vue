<template>
  <div id="app">
    <!-- Header -->
    <header>
      <nav>
        <ul>
          <li @click="showTodos">Todos</li>
          <li @click="showPosts">Posts</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <div v-if="activeMenu === 'todos'">
        <!-- Fitur Todos -->
        <h2>Todos</h2>
        <form>
          <label for="activity">Tugas:</label>
          <input type="text" id="activity" v-model="newActivity"><br><br>
          <button type="button" @click="addActivity">Tambah</button>
          <button type="button" @click="filterUnfinished">Filter Halaman</button>
        </form>
        <ul>
          <li v-for="(activity, index) in activities" :key="index" :style="{textDecoration: activity.completed ? 'line-through' : 'none'}">
            {{ activity.name }}
            <button @click="removeActivity(index)">Hapus</button>
            <button @click="completeActivity(index)" v-if="!activity.completed">Selesai</button>
          </li>
        </ul>
      </div>
      <div v-else-if="activeMenu === 'posts'">
        <!-- Fitur Postingan -->
        <h2>Postingan</h2>
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <div v-for="post in filteredPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
        <div v-else>
          <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeMenu: 'todos',
      activities: [],
      newActivity: "",
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  methods: {
    showTodos() {
      this.activeMenu = 'todos';
    },
    showPosts() {
      this.activeMenu = 'posts';
    },
    addActivity() {
      if (this.newActivity !== "") {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = "";
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    completeActivity(index) {
      this.activities[index].completed = true;
    },
    filterUnfinished() {
      this.activities = this.activities.filter(function (activity) {
        return !activity.completed;
      });
    },
  },
  mounted() {
    // Ambil data user dari API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });

    // Ambil data postingan dari API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      });
  },
  computed: {
    filteredPosts() {
      // Filter postingan berdasarkan user yang dipilih
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    }
  }
};
</script>

<style scoped>
body {
  background: url('/src/bground.jpeg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
}

h1, h2 {
  color: black;
  margin-top: 50px;
  text-align: center;
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
  background-color: blue;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  padding: 10px;
}

button:hover {
  background-color: #3e8e41;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  background-color: saddlebrown;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 10px;
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
}

li button:last-child {
  background-color: #4CAF50;
}

li button:hover {
  background-color: #e60000;
}

li button:last-child:hover {
  background-color: #3e8e41;
}

li.completed {
  text-decoration: line-through;
}
</style>
