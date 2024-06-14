<template>
  <div>
    <h2>Postingan</h2>
    <select v-model="selectedUser" class="user-select">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser" class="posts-list">
      <div v-for="post in filteredPosts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-else>
      <p>Silakan pilih pengguna untuk melihat postingan mereka.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Define reactive state
const selectedUser = ref(null);
const users = ref([]);
const posts = ref([]);

// Fetch data on component mount
onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    });

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      posts.value = data;
    });
});

// Define computed properties
const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
});
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #e9ecef;
  color: #495057;
  line-height: 1.5;
}

h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.user-select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 20px;
}

.posts-list {
  margin: 0;
  padding: 0;
}

.post {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.post h3 {
  color: #007bff;
  margin-bottom: 0.5rem;
}

.post p {
  margin-bottom: 0;
}
</style>
