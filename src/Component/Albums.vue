<template>
    <q-page>
      <q-list>
        <q-item v-for="album in albums" :key="album.id" clickable @click="goToAlbum(album.id)">
          <q-item-section>{{ album.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      const albumStore = useAlbumStore();
      const router = useRouter();
  
      onMounted(() => {
        albumStore.fetchAlbums();
      });
  
      const goToAlbum = (id) => {
        router.push(`/albums/${id}`);
      };
  
      return {
        albums: albumStore.albums,
        goToAlbum,
      };
    },
  };
  </script>
  