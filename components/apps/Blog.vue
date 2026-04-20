<template>
  <div class="blog-container">
    <div class="blog-header">
      <div class="info-bar">
        <!-- <img src="/assets/system/shell32.dll_14_151.png" class="header-icon" /> -->
        <span>Recent Updates & Logs</span>
      </div>
    </div>

    <div class="posts-list">
      <div 
        v-for="post in sortedPosts" 
        :key="post.id" 
        class="post-entry"
        :class="{ expanded: expandedId === post.id }"
      >
        <div class="post-header" @click="togglePost(post.id)">
          <div class="expander-icon">
            {{ expandedId === post.id ? '−' : '+' }}
          </div>
          <div class="post-title-meta">
            <span class="post-title">{{ post.title }}</span>
            <span class="post-date">{{ post.date }}</span>
          </div>
        </div>

        <div v-if="expandedId === post.id" class="post-body">
          <p class="post-text">{{ post.text }}</p>
          
          <div v-if="post.images && post.images.length" class="post-gallery">
            <div 
              v-for="(img, idx) in post.images" 
              :key="idx" 
              class="image-wrapper"
            >
              <img :src="img" class="blog-image" @click="openImage(img)" />
            </div>
          </div>

          <div class="post-footer">
            <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
        </div>
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
const expandedId = ref(null)
const sortOrder = ref('desc')

const posts = ref([
  {
    id: 1,
    title: "Tuning the PID Loops",
    date: "2026-04-10",
    text: "The Micromouse is finally navigating corners without overshooting. The cascading PID for velocity and rotation is holding up well under high speeds.",
    images: ["/assets/blog/pid_test.webp"],
    tags: ["Robotics", "ControlTheory"]
  },
  {
    id: 2,
    title: "New PCB Design arrived",
    date: "2026-03-28",
    text: "The ESP32-S3 boards from the fab look great. Soldering the buck converters today to test the 12V to 3.3V rails.",
    images: ["/assets/blog/pcb_1.webp", "/assets/blog/pcb_2.webp"],
    tags: ["Hardware", "ESP32"]
  },
  {
    id: 3,
    title: "Nuxt Personal Site Progress",
    date: "2026-03-15",
    text: "Implemented the Window Manager today. It feels much more like a desktop environment now. Added custom scrollbars to match the XP theme.",
    images: [],
    tags: ["WebDev", "Vue"]
  }
])

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    if (sortOrder.value === 'desc') return b.date.localeCompare(a.date)
    return a.date.localeCompare(b.date)
  })
})

function togglePost(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function openImage(url) {
  // Logic to open in a new window or fullscreen if desired
  window.open(url, '_blank')
}

onMounted(() => {
  const myWindow = windows.value.find(w => w.id === props.windowId)
  if (!myWindow) return

  // Registering Menu Actions (e.g., for Sort)
  myWindow.onMenuClick = (menuName, clickedItem) => {
    if (menuName === 'View') {
      if (clickedItem.action === 'sort_desc') sortOrder.value = 'desc'
      if (clickedItem.action === 'sort_asc') sortOrder.value = 'asc'

      myWindow.tool_menu['View'].forEach(item => {
        item.checked = (item.action === clickedItem.action)
      })
    }
  }
})
</script>

<style scoped>
.blog-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #FFF;
  font-family: 'Tahoma', sans-serif;
}

.blog-header {
  background: linear-gradient(to bottom, #7BA2E0 0%, #3F73D3 100%);
  padding: 8px;
  color: white;
  border-bottom: 1px solid #003599;
}

.info-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: bold;
}

.header-icon {
  width: 24px;
  height: 24px;
}

.posts-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #F1F1F1; /* Light gray background like XP Explorer folders */
}

.post-entry {
  border: 1px solid #CCC;
  margin-bottom: 8px;
  background: #FFF;
  border-radius: 2px;
  overflow: hidden;
}

.post-entry.expanded {
  border: 1px solid #7BA2E0;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}

.post-header {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  background-color: #FFF;
  transition: background 0.1s;
  user-select: none;
}

.post-header:hover {
  background-color: #E9F0FD;
}

.expander-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 14px;
  margin-right: 10px;
  background: #FFF;
  color: #333;
}

.post-title-meta {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
}

.post-title {
  font-weight: bold;
  color: #003599;
  font-size: 13px;
}

.post-date {
  font-size: 11px;
  color: #666;
}

.post-body {
  padding: 12px;
  border-top: 1px solid #EEE;
  background: #FAFAFA;
}

.post-text {
  margin: 0 0 12px 0;
  line-height: 1.5;
  font-size: 13px;
  color: #333;
}

.post-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.image-wrapper {
  border: 1px solid #CCC;
  padding: 2px;
  background: #FFF;
}

.blog-image {
  max-width: 150px;
  max-height: 150px;
  display: block;
  cursor: zoom-in;
}

.post-footer {
  display: flex;
  gap: 8px;
  border-top: 1px dotted #CCC;
  padding-top: 8px;
}

.tag {
  font-size: 11px;
  color: #3F73D3;
  cursor: pointer;
}

.tag:hover {
  text-decoration: underline;
}
</style>