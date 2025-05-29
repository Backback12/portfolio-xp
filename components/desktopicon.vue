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

function doubleClickHandler() {

}


// const desktop_icon = ref(null);
// onMounted(() => {
//   desktop_icon.value.addEventListener('dblclick', (event) => {
//     // console.log("CLICKED");
//     if (props.open) {
//       console.log("OK IM GOING TO OPEN " + props.open);
//     }
//   });
// });
</script>


<style scoped>
.desktop-icon {
  width: 64px;
  height: 64px;
  margin: 12px;
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
  font-weight: 100;
  letter-spacing: 0;
}
.desktop-icon span {
  color: white;
  text-align: center;
  flex-wrap: wrap;
}
</style>