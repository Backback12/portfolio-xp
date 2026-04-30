<template>
  <div id="taskbar">
    <div id="start-btn">
      <img src="/assets/os/imepadsv.exe_14_200_0-0.png"><a>start</a>
    </div>
    
    <div id="task-tabs">
      <div 
        v-for="win in windows" 
        :key="win.id"
        class="task-tab" 
        :class="{ active: activeWindowId === win.id }"
        @click="handleTabClick(win.id)"
      >
        <img :src="win.icon"><a>{{ win.title }}</a>
      </div>
    </div>
    
    <div id="task-notifs">
      <a id="time">{{ currentTime }}</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'

const { windows, activeWindowId, focusWindow, toggleMinimize } = useWindowManager()

const currentTime = ref('--:-- --')
let timeInterval = null

function updateTime() {
  const myTime = new Date()
  const hours = myTime.getHours() % 12 || 12
  const mins = myTime.getMinutes().toString().padStart(2, '0')
  const ampm = myTime.getHours() >= 12 ? 'PM' : 'AM'
  currentTime.value = `${hours}:${mins} ${ampm}`
}

function handleTabClick(id) {
  if (activeWindowId.value === id) {
    toggleMinimize(id)
  } else {
    focusWindow(id)
  }
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>

<style scoped>
#taskbar {
  height: 30px;
  width: 100%;
  background: linear-gradient(#4993E6 0%, #2359D6 15%, #2663E0 90%, #1941A5 100%);
  display: flex;
  z-index: 9999;
}
#start-btn {
  background: linear-gradient(90deg, #2A7A2A 0%, #0000 20%, #0000 80%, #2A7A2A 100%), linear-gradient(#358335 0%, #57A257 5%, #4EA24E 15%, #49AE49 85%, #2E713E 100%);
  width: 100px;
  border-radius: 0 8px 8px 0 / 15px;
  display: flex; align-items: center; padding-left: 10px; gap: 6px;
  color: white; font-style: italic; font-weight: bold;
}
#start-btn img { width: 18px; height: 18px; }

#task-tabs {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  overflow-x: hidden;
  gap: 2px;
}
.task-tab {
  display: flex; align-items: center; width: 160px;
  background: #3980F4; border: 1px outset #3980F4; border-radius: 3px;
  margin: 4px 1px 2px; color: white; cursor: default;
}
.task-tab img { width: 16px; height: 16px; padding: 0 6px; }
.task-tab.active { background: #1E52B7; border: 1px inset #001331; }

#task-notifs {
  background: #64a4ff; color: white; padding: 0 10px;
  display: flex; align-items: center; min-width: 64px; justify-content: flex-end;
}


/* collapse on small devices */
@media (max-width: 768px) {
  #taskbar {
    display: none !important;
  }
}
</style>