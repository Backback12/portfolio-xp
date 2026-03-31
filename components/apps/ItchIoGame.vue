<template>
  <div class="iframe-wrapper">
    <iframe 
      frameborder="0" 
      :src="iframeSrc" 
      allowfullscreen="" 
      class="game-iframe">
    </iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  iframeSrc: { 
    type: String, 
    default: "https://itch.io/embed-upload/3392649?color=F25958" 
  }
})
</script>

<style scoped>
.iframe-wrapper {
  width: 100%;
  height: 100%;
  display: flex; /* Flex ensures the child iframe grows */
  flex-direction: column;
  background: #000; /* Black background while game loads */
}
.game-iframe {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  border: none;
}
</style>