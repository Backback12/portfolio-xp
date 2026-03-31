<template>
  <div 
    draggable="false" 
    ref="contentRef" 
    class="egg-content" 
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <span class="title">FEED EGGS</span>
    
    <div ref="eggmanRef" class="head-container" :class="{ anticipate: isAnticipating }">
      <img draggable="false" class="head" :class="{ hidden: isEating }" ref="eggmouthRef" src="/public/assets/egg/egg_egg_0.png">
      <img draggable="false" class="head" :class="{ hidden: !isEating }" src="/public/assets/egg/egg_egg_1.png">
      <img draggable="false" class="mouth yummy" :class="{ hidden: !isEating }" src="/public/assets/egg/egg_mouth.png">
    </div>
    
    <img draggable="false" class="legs" src="/public/assets/egg/egg_legs.png">
    <img draggable="false" class="basket" src="/public/assets/egg/egg_basket.png" @mousedown="handleBasketDown">

    <img 
      draggable="false" 
      ref="eggRef" 
      class="egg" 
      :class="{ hidden: !eggmousedown }" 
      src="/public/assets/egg/egg_egg.png"
      :style="{ top: eggPos.y + 'px', left: eggPos.x + 'px' }"
    >
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const contentRef = ref(null)
const eggmanRef = ref(null)
const eggmouthRef = ref(null)

const eggmousedown = ref(false)
const isAnticipating = ref(false)
const isEating = ref(false)

const eggPos = reactive({ x: 0, y: 0 })

function handleBasketDown(event) {
  eggmousedown.value = true
  isAnticipating.value = true
  
  updateEggPosition(event)
}

function handleMouseMove(event) {
  if (eggmousedown.value) {
    updateEggPosition(event)
  }
}

function updateEggPosition(event) {
  if (!contentRef.value) return
  const rect = contentRef.value.getBoundingClientRect()
  const offx = event.clientX - rect.left
  const offy = event.clientY - rect.top

  eggPos.y = offy + 30
  eggPos.x = offx - 5
}

function handleMouseUp(event) {
  if (!eggmousedown.value) return
  
  eggmousedown.value = false
  isAnticipating.value = false

  // check if released in zone
  if (eggmouthRef.value) {
    const rect = eggmouthRef.value.getBoundingClientRect()
    const midX = rect.left + rect.width / 2
    const midY = rect.top + rect.height / 2
    const deltax = 25
    const deltay = 30

    if (
      event.clientX > midX - deltax && event.clientX < midX + deltax &&
      event.clientY > midY - deltay && event.clientY < midY + deltay
    ) {
      // Monch!
      isEating.value = true
      setTimeout(() => {
        isEating.value = false
      }, 500)
    }
  }
}
</script>

<style scoped>
.egg-content {
  width: 100%;
  height: 100%;
  background-color: #ccCaCa;
  background-size: cover;
  position: relative;
  user-select: none;
  overflow: hidden;
}

.egg-content.grabbing {
  cursor: grabbing;
}

.egg-content > img {
  position: absolute;
  user-select: none;
}

.title {
  position: absolute;
  font-family: 'Tahoma';
  font-weight: bold;
  top: 20%;
  left: 36%;
}

.legs { top: 75%; left: 5%; z-index: 0; }
.mouth { z-index: 3; }

.head-container {
  position: absolute;
  top: 42%;
  left: 6%;
  display: inline-block;
  z-index: 2;
  transition: transform 0.1s;
}
.head-container img {
  position: absolute;
  top: 0;
  left: 0;
}
.head-container.anticipate {
  transform: translate(0, -4px);
}

.yummy {
  animation: monch 0.25s infinite;
}
@keyframes monch {
  0% { transform: scale(1, 1); }
  50% { transform: scale(0.2, 1); }
  100% { transform: scale(1, 1); }
}

.basket {
  top: 70%;
  left: 75%;
  z-index: 0;
  cursor: grab;
}
.basket:active {
  cursor: grabbing;
}

.egg {
  z-index: 2;
  cursor: grabbing;
  pointer-events: none; /* Prevents the egg from blocking mouseup events on the mouth */
}

.hidden {
  display: none;
}
</style>