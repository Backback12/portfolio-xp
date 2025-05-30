<template>
  
  <d_window :title="title" :icon="icon" :resizable=true :set_width="384" :set_height="256" :tool_menu="{'Game': '', 'About': ''}">
    
    <div class="game-div">
      <iframe 
        frameborder="" 
        src="https://itch.io/embed-upload/3392649?color=F25958" 
        allowfullscreen="" 
        width="1044" height="808">
        <!-- <a href="https://alphaq.itch.io/chimp-want-banana">Play Chimp Want Banana on itch.io</a> -->
      </iframe>
    </div>
    
  </d_window>
</template>

<script setup>
const props = defineProps({
  title: { type: String },
  icon: { type: String }
});
</script>


<style scoped>

</style>