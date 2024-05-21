<template>
    <div>
      <h2>Todos</h2>
      <form @submit.prevent="addActivity">
        <label for="activity">Tugas:</label>
        <input type="text" id="activity" v-model="newActivity"><br><br>
        <button type="submit">Tambah</button>
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
  </template>
  
  <script>
  export default {
    props: {
      initialActivities: Array
    },
    data() {
      return {
        activities: [...this.initialActivities],
        newActivity: ''
      };
    },
    methods: {
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
        this.activities = this.activities.filter(activity => !activity.completed);
      }
    }
  };
  </script>
  
  <style scoped>
/* Gaya umum */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
}

/* Gaya untuk judul Todos */
h2 {
  color: #333;
  text-align: center;
}

/* Gaya untuk form */
form {
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Gaya untuk input dan tombol */
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
  </style>
  