<template>
  <div class="desktop-icon">
    <img :src="img">
    <div class="name"><span>{{ name }}</span></div>
  </div>
</template>

<script setup>
const props = defineProps({
  img: { type: String, required: true },
  name: { type: String, required: true },
  fnc: { type: String, required: true},
})
</script>


<style scoped>
.desktop-icon {
  width: 64px;
  height: 64px;
}
.desktop-icon img {
  position: absolute;
  margin: 0px 16px;
  width: 32px;
  height: 32px;
}
.desktop-icon .name {
  padding-top: 34px;
  text-align: center;
  align-items: center;
}
.desktop-icon span {
  color: white;
  text-align: center;
  flex-wrap: wrap;
}
</style>