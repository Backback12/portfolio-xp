<template>
  <div class="projects-container">
    <div class="header">
      <img src="/assets/system/smtpsnap.dll_14_9032_1038-0.png" class="header-icon"/>
      <div>
        <h1 class="main-title">Notable Projects</h1>
        <p class="subtitle">Notable projects</p>
      </div>
    </div>
    <div v-if="!selectedProject" class="grid-view">
      <div 
        v-for="proj in sortedProjects" 
        :key="proj.id" 
        class="project-card"
        :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${proj.thumbnail})` }"
        @click="selectedProject = proj"
      >
        <div class="card-content">
          <span class="date">{{ proj.date }}</span>
          <h3 class="title">{{ proj.title }}</h3>
          <p class="subtitle">{{ proj.subtitle }}</p>
        </div>
      </div>
    </div>

    <div v-else class="detail-view">
      <div class="toolbar-nav">
        <button class="xp-button" @click="selectedProject = null">← Back to Projects</button>
      </div>
      <div class="detail-content">
        <h2>{{ selectedProject.title }}</h2>
        <span class="detail-date">{{ selectedProject.date }}</span>
        <img v-if="selectedProject.image" :src="selectedProject.image" class="detail-image" />
        <p class="description">{{ selectedProject.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'

const props = defineProps({
  windowId: { type: String, required: true }
})

const { windows } = useWindowManager()
const selectedProject = ref(null)
const sortOrder = ref('desc') // default sorting

// Pre-populated with your specific projects
const projects = ref([
  {
    id: 7,
    title: 'Balance Bot',
    subtitle: 'ESP32, KiCad, 3D Printing, Controls System',
    date: '2025-2026',
    thumbnail: '/assets/projects/micromouse_thumb.jpg', 
    image: '/assets/projects/micromouse_full.jpg',
    description: ''
  },
  {
    id: 6,
    title: 'CRT Audio Visualizer',
    subtitle: 'ESP32, 13" CRT Display',
    date: '2025',
    thumbnail: '/assets/projects/micromouse_thumb.jpg', 
    image: '/assets/projects/micromouse_full.jpg',
    description: ''
  },
  {
    id: 5,
    title: 'CassettifyMixtape',
    subtitle: 'View your top Spotify tracks on a cassette',
    date: '2023',
    thumbnail: '/assets/projects/micromouse_thumb.jpg', 
    image: '/assets/projects/micromouse_full.jpg',
    description: ''
  },
  {
    id: 4,
    title: 'Custom Macropad',
    subtitle: 'KiCad, PCB Manufacturing',
    date: '2022',
    thumbnail: '/assets/projects/micromouse_thumb.jpg', 
    image: '/assets/projects/micromouse_full.jpg',
    description: ''
  },
  {
    id: 3,
    title: 'Arduino Gameboi',
    subtitle: '3D printed game console',
    date: '2021',
    thumbnail: '/assets/projects/breathalyzer_thumb.jpg',
    description: 'Fully 3D printed console powered by Arduino Nano. Uses 128x64 OLED, 6 buttons, and cell battery powered.'
  },
  {
    id: 2,
    title: 'Chimp Want Banana (Game Jam)',
    subtitle: 'Brackeys Game Jam 2021.1',
    date: '2021',
    thumbnail: '/assets/projects/pcb_thumb.jpg',
    description: 'https://alphaq.itch.io/chimp-want-banana'
  },
  {
    id: 1,
    title: 'Bodyguard (Game Jam)',
    subtitle: 'Ludum Dare 46 Game Jam',
    date: '2020',
    thumbnail: '/assets/projects/led_thumb.jpg',
    description: 'https://alphaq.itch.io/bodyguard-ld46'
  }
])

// Computed property to handle active sorting
const sortedProjects = computed(() => {
  return [...projects.value].sort((a, b) => {
    if (sortOrder.value === 'desc') return b.date.localeCompare(a.date)
    return a.date.localeCompare(b.date)
  })
})

onMounted(() => {
  // 1. Find the window state for THIS specific component
  const myWindow = windows.value.find(w => w.id === props.windowId)
  if (!myWindow) return

  // 2. Register the callback so WindowFrame can pass menu clicks down to us
  myWindow.onMenuClick = (menuName, clickedItem) => {
    
    // Only handle logic for our "Sort" menu
    if (menuName === 'Sort') {
      
      // Update our local state to trigger the computed sorting
      if (clickedItem.action === 'sort_desc') sortOrder.value = 'desc'
      if (clickedItem.action === 'sort_asc') sortOrder.value = 'asc'

      // Update the visual checkmarks in the global window state
      myWindow.tool_menu['Sort'].forEach(item => {
        item.checked = (item.action === clickedItem.action)
      })
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  /* border-bottom: 2px solid #ECE9D8; */
  border-bottom: 2px solid #808080;
  padding-bottom: 12px;
}
.header-icon {
  width: 48px;
  height: 48px;
  margin-left: 16px;
  margin-right: 16px;
}
.main-title {
  margin: 0;
  font-size: 20px;
}
.subtitle {
  margin: 0;
  color: #666;
}

.projects-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ECE9D8;
}
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
}
.project-card {
  height: 120px;
  background-size: cover;
  background-position: center;
  border: 2px outset #FFF;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.2s ease;
}
.project-card:hover {
  /* Lighter background on hover as requested */
  background-blend-mode: screen;
  border: 2px inset #FFF;
}
.card-content {
  padding: 8px;
  color: white;
}
.card-content .date {
  font-size: 10px;
  color: #A6CAF0;
}
.card-content .title {
  margin: 0;
  font-size: 14px;
  text-shadow: 1px 1px 2px #000;
}
.card-content .subtitle {
  margin: 0;
  font-size: 11px;
  color: #CCC;
}

/* Detail View Styles */
.detail-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.toolbar-nav {
  background: #ECE9D8;
  padding: 6px;
  border-bottom: 1px solid #ACA899;
}
.xp-button {
  background: #EAE8E3;
  border: 1px outset #FFF;
  padding: 4px 12px;
  cursor: pointer;
  font-family: 'Tahoma', sans-serif;
  font-size: 12px;
}
.xp-button:active {
  border: 1px inset #FFF;
}
.detail-content {
  padding: 24px;
  overflow-y: auto;
}
.detail-content h2 {
  margin-top: 0;
  margin-bottom: 4px;
}
.detail-date {
  color: #666;
  font-size: 12px;
  display: block;
  margin-bottom: 16px;
}
.detail-image {
  max-width: 100%;
  border: 1px solid #000;
  margin-bottom: 16px;
}
</style>