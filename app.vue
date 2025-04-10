<template>
  <!-- <div> -->
    <!-- <NuxtRouteAnnouncer /> -->
    <!-- <NuxtWelcome /> -->
  <!-- </div> -->

  
  <!-- <div class="desktop">
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
    <desktopicon name="HomePage" :img="icon_trash" fnc=""/>
  </div> -->
  <desktop></desktop>

  



  <!-- <div>
    YOOOOOOOO
    <window>YOOO MY WINDOW</window>
  </div> -->

</template>

<script setup>
  import desktop from "~/components/desktop.vue"
  import desktopicon from "~/components/desktopicon.vue"
  import window from "~/components/window.vue"

  import icon_trash from "~/assets/images/recycling.png"
</script>

<style scoped>
/* .desktop {
  position: absolute;
  padding: 20px;
  display: flex;
  flex-direction: column;
} */
body {
  margin: 0;

  
  font-family: 'Tahoma';
  font-size: 12px;

  /* font-family: TahomaXP;
  font-size: 16px; */
  
  letter-spacing: 0.06rem;
  /* background-color: #007F7F; */
  /* position: absolute; */
  /* -webkit-font-smoothing: antialiased; */
  /* font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale; */
  /* font-smooth: never; */

  
}
</style>
