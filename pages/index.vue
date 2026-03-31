<template>
  <div id="screen" @mousedown.self="activeWindowId = null">
    <div id="upper-screen" @mousedown.self="activeWindowId = null">
      <div id="desktop">
        <OsDesktopIcon 
          img="/assets/system/smtpsnap.dll_14_9032_1038-0.png" 
          name="Achievements" 
          @dblclick="openApp('achievements')"
        />
        <OsDesktopIcon 
          img="/assets/system/newspaper.png" 
          name="Projects" 
          @dblclick="openApp('projects')"
        />
      </div>

      <div id="windows">
        <OsWindowFrame
          v-for="win in windows"
          :key="win.id"
          :window-data="win"
        >
          <component :is="win.component" v-bind="win.props" />
        </OsWindowFrame>
      </div>
    </div>
    
    <OsTaskbar />
  </div>
</template>

<script setup>
import { resolveComponent, onMounted } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'

// Remember to import your icons if they are local, or use absolute paths as you did
import OsDesktopIcon from '~/components/os/DesktopIcon.vue'
import OsWindowFrame from '~/components/os/WindowFrame.vue'
import OsTaskbar from '~/components/os/Taskbar.vue'

const { windows, activeWindowId, openWindow } = useWindowManager()

// Map your app keys to the actual Vue components
const Apps = {
  achievements: resolveComponent('AppsAchievements'),
  projects: resolveComponent('AppsProjects')
}

function openApp(appKey) {
  if (appKey === 'achievements') {
    openWindow({
      id: 'app-achievements',
      title: 'Achievements',
      icon: '/assets/system/smtpsnap.dll_14_9032_1038-0.png',
      component: Apps.achievements,
      width: 500,
      height: 400,
      // Will use the default { File, Edit, View } if we omit tool_menu
    })
  }
  
  if (appKey === 'projects') {
    openWindow({
      id: 'app-projects',
      title: 'My Projects',
      icon: '/assets/system/newspaper.png',
      component: Apps.projects,
      width: 600,
      height: 450,
      start_maximized: false,
      // Custom toolbar example
      tool_menu: {
        "File": ["New Idea", "Save", "Close"],
        "Filter": ["Hardware", "Software", "Show All"],
        "Help": ["About Projects"]
      }
    })
  }
}

onMounted(() => {
  openApp('achievements')
  openApp('projects')
})
</script>

<style scoped>
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

#screen {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* z-index: -999; */
}

#upper-screen {
  /* display: flex; */
  flex-grow: 1;
  /* position: relative; */
  position: relative;
  height: 100%;
  /* height: 500px; */
  /* height: inherit; */
  /* z-index: -999; */
}
/* ================================================================ */
/* =========================== DESKTOP ============================ */
/* ================================================================ */
#desktop {
  position: absolute;
  background-color: #007F7F;
  background-image: url('/public/assets/system/wallpaper_0.jpg');
  background-size: contain;
  /* background: url('/assets/images/wallpaper_0.jpg') #FF0000FF; */
  /* background-size: cover; */
  /* background-position: center; */

  /* height: 100vh; */
  /* height: 100%; */
  height: inherit;
  width: 100%;
  /* padding: 16px; */
  padding: 32px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* align-content: flex-start; */
  /* z-index: -999; */

  user-select: none;
}
/* ================================================================ */
/* =========================== WINDOWS ============================ */
/* ================================================================ */
#windows {
  position: absolute;

  /* height: 100vh; */
  /* height: 100%; */
  height: inherit;
  width: 100vw;


  pointer-events: none;

  overflow: hidden;

  user-select: none;
}
/* ================================================================ */
/* =========================== TASKBAR ============================ */
/* ================================================================ */
#taskbar {
  /* position: absolute; */
  /* bottom: 0; */
  /* left: 0; */
  
  height: 30px;
  width: 100%;
  /* background-color: #007F7F; */
  /* background: linear-gradient(#4993E6 0%, ); */
  background: linear-gradient(#4993E6 0%, #2359D6 15%, #2663E0 90%, #1941A5 100%);
  /* z-index: 10; */

  display: flex;
  flex-direction: row;
  
  z-index: 999;
}
#taskbar #start-btn {
  /* background: green; */
  background: linear-gradient(90deg, #2A7A2A 0%, #0000 20%, #0000 80%, #2A7A2A 100%), linear-gradient(#358335 0%, #57A257 5%, #4EA24E 15%, #49AE49 85%, #2E713E 100%);
  width: 100px;

  border-radius: 0 8px 8px 0 / 15px ;
  display: flex;
  align-items: center;
}
#taskbar #start-btn img {
  width: 18px;
  height: 18px;
  /* padding: 0 7px; */
  padding-left: 10px;
  padding-right: 6px;
}
#taskbar #start-btn a {
  color: #ffffff;
  text-shadow: #000;
  font-size: large;
  font-weight: bold;
  font-style: italic;
  text-shadow: 0px 0px 6px #000A;
}
#taskbar #task-tabs {
  flex-grow: 4;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
}


/* taskbar tabs */
.task-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  background: #3980F4;
  border: 1px outset #3980F4;
  border-radius: 3px;
  /* margin-top: 4px; */
  /* margin-bottom: 2px; */
  margin: 4px 1px 2px;
  user-select: none;
}
.task-tab img {
  width: 16px;
  height: 16px;
  padding: 0 6px;
}
.task-tab a {
  color: #ffffff;
}
.task-tab.active {
  background: #1E52B7;
  border: 1px inset #001331;
}

.task-tab:hover {
  background: linear-gradient(135deg, #53A3FF 0%, #53A3FF 30%);
}
.task-tab.active:hover {
  background: linear-gradient(135deg, #3576F3 0%, #3576F3 30%);
}




#taskbar #task-notifs {
  display: flex;
  flex-direction: row;
  align-items: center;

  /* background: #f00; */
  background: #64a4ff;
  color: white;

  padding: 0 5px;
}
#taskbar #task-notifs img {
  width: 16px;
  height: 16px;
  padding: 0 3px;
}
#taskbar #task-notifs #time {
  /* padding-left: 6px; */
  width: 64px;
  text-align: right;
}
</style>