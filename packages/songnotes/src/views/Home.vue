<template>
<div class="home">
    <pitch />
    <create-playlist />
</div>
</template>

<script>
import Pitch from '../components/Pitch';
import CreatePlaylist from '../components/CreatePlaylist';
export default {
  name: 'Home',
  components: {
    Pitch,
    CreatePlaylist,
  },
};
</script>
