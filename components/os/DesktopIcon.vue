<template>
  <div class="desktop-icon" ref="desktop_icon" @dblclick="doubleClick()">
    <img :src="img">
    <div class="name"><span>{{ name }}</span></div>
  </div>
</template>

<script setup>
const props = defineProps({
  img: { type: String, required: true },
  name: { type: String, required: true },
  doubleClick: Function,
});
</script>


<style scoped>
.desktop-icon {
  width: 64px;
  height: 64px;
  /* margin: 8px; */
  padding: 8px;
  /* border: solid 1px red; */
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
  font-weight: 0;
  letter-spacing: -0px;
}
.desktop-icon span {
  color: white;
  text-align: center;
  flex-wrap: wrap;
}
</style>