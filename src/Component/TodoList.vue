<template>
  <div>
    <h2>Catatan Tugas Dhandhy</h2>
    <form @submit.prevent="addActivity">
      <label for="activity">Tugas:</label>
      <input type="text" id="activity" v-model="newActivity"><br><br>
      <button type="submit">Tambah</button>
      <button type="button" @click="filterUnfinished">Filter Belum Selesai</button>
    </form>
    <ul>
      <li v-for="(activity, index) in activities" :key="index" :class="{ completed: activity.completed }">
        {{ activity.title }}
        <button @click="removeActivity(index)">Hapus</button>
        <button @click="completeActivity(index)" v-if="!activity.completed">Selesai</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const initialActivities = ref([]);

// Inisialisasi data activities
const activities = ref([...initialActivities.value]);
const newActivity = ref('');

// Method untuk menambah aktivitas baru
const addActivity = () => {
  if (newActivity.value.trim() !== '') {
    activities.value.push({ title: newActivity.value, completed: false });
    newActivity.value = '';
  }
};

// Method untuk menghapus aktivitas
const removeActivity = (index) => {
  activities.value.splice(index, 1);
};

// Method untuk menyelesaikan aktivitas
const completeActivity = (index) => {
  activities.value[index].completed = true;
};

// Method untuk filter aktivitas yang belum selesai
const filterUnfinished = () => {
  activities.value = activities.value.filter(activity => !activity.completed);
};
</script>

<style scoped>
/* Gaya untuk list */
ul {
  list-style: none;
  padding: 0;
}

li {
  background: #fff;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Gaya untuk teks yang sudah selesai */
.completed {
  text-decoration: line-through;
}

/* Gaya untuk form dan input */
form {
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

input[type="text"] {
  padding: 10px;
  width: 70%;
  margin-right: 5px;
}

button {
  background: #5cb85c;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #449d44;
}
</style>
