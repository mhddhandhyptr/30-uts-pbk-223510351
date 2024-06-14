<template>
    <q-page>
      <q-list>
        <q-item v-for="photo in photos" :key="photo.id" clickable @click="viewPhoto(photo.url)">
          <q-item-section thumbnail>
            <q-img :src="photo.thumbnailUrl"></q-img>
          </q-item-section>
          <q-item-section>{{ photo.title }}</q-item-section>
        </q-item>
      </q-list>
      <q-dialog v-model="dialog">
        <q-img :src="selectedPhoto" style="width: 100%"></q-img>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import { useAlbumStore } from '../stores/albumStore';
  import { onMounted, ref } from 'vue';
  
  export default {
    props: ['id'],
    setup(props) {
      const albumStore = useAlbumStore();
      const dialog = ref(false);
      const selectedPhoto = ref('');
  
      onMounted(() => {
        albumStore.fetchPhotos(props.id);
      });
  
      const viewPhoto = (url) => {
        selectedPhoto.value = url;
        dialog.value = true;
      };
  
      return {
        photos: albumStore.photos,
        dialog,
        selectedPhoto,
        viewPhoto,
      };
    },
  };
  </script>
  