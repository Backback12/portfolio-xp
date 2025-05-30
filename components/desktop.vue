<template>
  <div id="screen">
    <div id="upper-screen">
      <div id="desktop">
        <!-- Desktop Icons Container -->
        <desktopicon 
          img="/assets/egg/egg_egg.png" 
          name="Projects" 
          :double-click="() => addWindow('page_projects')"
        />
        <desktopicon 
          img="/assets/system/drone.png" 
          name="Drone Photos" 
          :double-click="() => addWindow('page_drone')"
        />
        <desktopicon 
          img="/assets/egg/egg_egg.png" 
          name="Egg Game" 
          :double-click="() => addWindow('page_egg')"
        />
        <desktopicon 
          img="/assets/system/chimp_32.png" 
          name="Chimp Want Banana" 
          :double-click="() => addWindow('page_itchio', {title: 'BRUHHH'})"
        />
        <!-- <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon> -->
      </div>
      <div id="windows" ref="windows">
        <!-- Windows Container -->

        <!-- <egg></egg> -->

        <!-- Title window -->
        <!-- <d_window :set_width=800 :set_height=150 title="Home Title" :tool_menu="null">
          <div style="display: flex; align-items: center; justify-content: center;
                  background: #202020; height: 100%; flex-direction: column;">
            <h1 style="text-align: center; font-size: 2rem; margin: 0; color: #d0d0d0; text-shadow: 5px 5px 2px #800000, -5px 5px 2px #000060;">
              Connor Pagtakhan's
            </h1>
            <h1 style="text-align: center; font-size: 1.6rem; margin: 0; color: #d0d0d0; text-shadow: 5px 5px 2px #800000, -5px 5px 2px #000060;">
              Web Portfolio
            </h1>
          </div>
        </d_window> -->

        <!-- <page_drone></page_drone> -->
        <!-- <page_drone></page_drone> -->
        <!-- <itchiogame></itchiogame> -->
        <!-- <egg></egg> -->
        

        <!-- Dynamic components -->
        <!-- <component
          v-for="(page, index) in dynamicPages"
          :key="page.name + '-' + index + '-' + Math.random()"
          :is="componentMap[page.name]"
          v-bind="page.props"
        /> -->
        <component
          v-for="(page, index) in dynamicPages"
          :key="page.id"
          :id="page.id"
          :is="pageComponentMap[page.name]"
          v-bind="{ ...page.props, id: page.id }"
        />

        <!-- <component :is="componentMap['page_drone']" /> -->
        <!-- <component :is="componentMap[dynamicPages[0].name]" v-bind="dynamicPages[0].props" /> -->
        
      </div>
    </div>
    <div id="taskbar">
      <div id="start-btn"><img src="/public/assets/system/imepadsv.exe_14_200_0-0.png"><a>start</a></div>
      <div id="task-tabs">
        <!-- Windows Taskbar Tabs -->

        <!-- <div class="task-tab"><img src="/assets/egg/egg_egg.png"><a>Egg Game</a></div> -->
        <!-- <div class="task-tab active"><img src="/assets/system/drone.png"><a>Drone Photos</a></div> -->

         <!-- <div class="task-tab">test</div> -->


        <div 
          class="task-tab active" 
          v-for="(item, index) in dynamicTabs"
          :key="item.id"
          :id="item.id"
        >
          <!-- <img src="/assets/egg/egg_egg.png"><a>{{ item.name }}</a> -->
          <img :src="item.icon"><a>{{ item.title }}</a>
        </div>

      </div>
      <div id="task-notifs">
        <!-- <img src="/public/assets/system/imepadsv.exe_14_200_0-0.png">
        <img src="/public/assets/system/imepadsv.exe_14_200_0-0.png">
        <img src="/public/assets/system/imepadsv.exe_14_200_0-0.png"> -->
        
        <!-- Time Updated with Javascript  -->
        <a id="time" ref="timeclock">--:-- --</a>
      </div>
    </div>
  </div>
  </template>
  
<script setup>
// import d_window from "~/components/d_window.vue";
// import { useFocus } from "~/composables/useFocus";

import pageEgg from "~/components/page_egg.vue"
import pageDrone from '~/components/page_drone.vue'
import pageItchIO from '~/components/itchiogame.vue'
import pageProjects from '~/components/page_projects.vue'
import pageTitle from '~/components/page_title.vue'

const pageComponentMap = {
  page_egg: pageEgg,
  page_drone: pageDrone,
  page_itchio: pageItchIO,
  page_projects: pageProjects,
  page_title: pageTitle,
}
  

// const { setFocus } = useFocus();

const timeclock = ref(null);
const windows = ref(null);

function updateTime() {
  if (timeclock.value) {
    var myTime = new Date();
    
    var hours = myTime.getHours() % 12 ? myTime.getHours() % 12 : 12;
    var mins = myTime.getMinutes() < 10 ? '0'+myTime.getMinutes() : myTime.getMinutes();
    var ampm = myTime.getHours() >= 12 ? 'PM' : 'AM';
    // var secs  = myTime.getSeconds() < 10 ? '0'+myTime.getSeconds() : myTime.getSeconds();

    timeclock.value.innerHTML = hours + ':' + mins + ' ' + ampm;
    // timeclock.value.innerHTML = hours + ":" + mins + ":" + secs + ' ' + ampm;
  };
  setTimeout(updateTime, 1000);
}




// function addComponent(component) {
//   const instance = getCurrentInstance();
//   const vnode = h(component);
//   const container = document.createElement('div');

//   if (!windows.value) {
//     // console.warn('Dynamic container not found.')
//     return;
//   }

//   windows.value.appendChild(container);
//   vnode.appContext = instance.appContext;

//   const app = createApp({ render: () => vnode });
//   app.mount(container);
// }


// define initial pages?
const dynamicPages = ref([
  // { name: 'page_egg', props: {} },
  // { name: 'page_egg', props: {} },
  // { name: 'page_egg', props: {} },
  // { name: 'page_about', props: { title: 'About Me' } },
  // {name: 'page_drone', props: {} },
  // {name: 'page_drone', props: {} },

  // {name: 'page_projects', props: {id: crypto.randomUUID(), onClose: closeWindow, addTab: addTab, setFocus: setFocus, initialZ: 0 + 1} }
]);

const dynamicTabs = ref([]);  // taskbar tabs

let nextId = 0;
function addWindow(name, props = {}) {
  
  // pass props for every window
  props.id = crypto.randomUUID();
  props.onClose = closeWindow;
  props.addTab = addTab;
  props.setFocus = setFocus;
  props.initialZ = dynamicPages.value.length + 1;

  dynamicPages.value.push({ id: props.id, name, props });
}

function closeWindow(id) {
  // console.log("running closeWindow with " + id);
  // Remove from DOM
  for (const elem of document.querySelectorAll(`[id="${id}"]`)) {
    elem.remove();
  }

  // Remove from dynamicPages
  const index = dynamicPages.value.findIndex(page => page.id === id);
  if (index !== -1) {
    // remove from dynamicTabs (should be same ID)?
    dynamicPages.value.splice(index, 1);
    // dynamicTabs.value.splice(index, 1);
  }

  // console.log(dynamicPages.value.length);
}

function addTab(id, title="no title", icon="") {
  dynamicTabs.value.push({ id: id, title: title, icon: icon });

  // focus tab after window and tab is initialized
  // setFocus(document.querySelector(`.tasktab[id='${ id }']`));
}
function closeTab(id) {
  const index = dynamicTabs.value.findIndex(page => page.id === id);
  if (index !== -1) {
    dynamicTabs.value.splice(index, 1);
  }
}


function setFocus(target, updateZIndex=true) {
  var n = 0;

  
  if (target.classList.contains('window')) {
    
    // if window selected
    if (updateZIndex) {
      document.querySelectorAll('.window').forEach(function(win) {
        win.classList.remove('active');
        if (Number(win.style.zIndex) > Number(target.style.zIndex)) {
          win.style.zIndex = Number(win.style.zIndex) - 1;
          // console.log(Number(win.style.zIndex) + " > " + Number(target.style.zIndex));
          n += 1;
        }
        else {
          // console.log(Number(win.style.zIndex) + " < " + Number(target.style.zIndex));
        }
      });
      // console.log("ACTIVATED! from z=" + Number(target.style.zIndex) + " to " + (Number(target.style.zIndex) + n));
      target.style.zIndex = Number(target.style.zIndex) + n;
    }
    else {
      // dont update Z
      document.querySelectorAll('.window').forEach(function(win) {
        win.classList.remove('active');
      });
    }
      
    target.classList.add('active');
    // console.log('setFocus: new Z is ' + target.style.zIndex);
    


    // set taskbar tab to active
    // document.querySelectorAll('.task-tab').forEach(function(tasktab) {
    //   tasktab.classList.remove('active');
    // });
    // const window_id = target.getAttribute('id');
    // document.querySelectorAll(`[id="${ window_id }"]`).forEach(function(tasktab) {
    //   tasktab.classList.add('active');
    // });
    // console.log("Active ID: " + target.getAttribute('id'));
    document.querySelectorAll('.task-tab').forEach(function(tasktab) {
      tasktab.classList.remove('active');
    });
    document.querySelectorAll(`.task-tab[id='${ target.getAttribute('id') }']`).forEach(function(tasktab) {
      tasktab.classList.add('active');
    });
  }
  else if (target.classList.contains('task-tab')) {
    // if taskbar tab was selected (same ID as window)
    
    let id = target.getAttribute('id');
    
    // set active taskbar tab
    document.querySelectorAll('.task-tab').forEach(function(tasktab) {
      tasktab.classList.remove('active');
    });
    target.classList.add('active');

    
    // set active window
    let targetWindow = document.querySelector(`.window[id='${ id }']`);
    document.querySelectorAll('.window').forEach(function(win) {
      win.classList.remove('active');
      if (Number(win.style.zIndex) > Number(targetWindow.style.zIndex)) {
        win.style.zIndex = Number(win.style.zIndex) - 1;
        n += 1
      }
    });
    targetWindow.classList.add('active');

    targetWindow.style.zIndex = Number(targetWindow.style.zIndex) + n;

  }
  else {
    // remove active from all windows
    document.querySelectorAll('.window').forEach(function(window) {
      window.classList.remove('active');
    });
    
    // remove active from all taskbar tabs
    document.querySelectorAll('.task-tab').forEach(function(tasktab) {
      tasktab.classList.remove('active');
    });
  }
}


onMounted(() => {

  window.addEventListener('mousedown', (event) => {
    // console.log("YAAA");
    const clickedElem = event.target;

    const foundElem = clickedElem.closest('.window, #desktop, .d-icon, .task-tab');

    if (foundElem) {
      setFocus(foundElem);
    }
  })


  // timeclock.value.innerHTML = Date.now().toLocaleString()
  // "YYYY-MM-DDTHH:mm:ss.sssZ"

  updateTime();  




  // set initial windows
  addWindow('page_projects');
  addWindow('page_title');
});
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