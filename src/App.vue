<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          TUGAS UAS DHANDHY
        </q-toolbar-title>
        <q-btn flat label="Todos" to="/todos" />
        <q-btn flat label="Posts" to="/posts" />
        <q-btn flat label="Albums" to="/albums" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
};
</script>
