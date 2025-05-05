<template>
  <div id="screen">
    <div id="upper-screen">
      <div id="desktop">
        <!-- Desktop Icons Container -->
        <desktopicon img="/assets/system/drone.png" name="Drone Photos"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
        <desktopicon img="/assets/system/drone.png" name="Drone"></desktopicon>
      </div>
      <div id="windows">
        <!-- Windows Container -->

        <egg></egg>
        <d_window set_width="800" set_height="150" title="Home Title" tool_menu="">
          <div style="display: flex; align-items: center; justify-content: center;
                  background: #202020; height: 100%; flex-direction: column;">
            <h1 style="text-align: center; font-size: 2rem; margin: 0; color: #d0d0d0; text-shadow: 5px 5px 2px #800000, -5px 5px 2px #000060;">
              Connor Pagtakhan's
            </h1>
            <h1 style="text-align: center; font-size: 1.6rem; margin: 0; color: #d0d0d0; text-shadow: 5px 5px 2px #800000, -5px 5px 2px #000060;">
              Web Portfolio
            </h1>
          </div>
        </d_window>


        <page_drone></page_drone>
        <!-- <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window>
        <d_window>
          <h1>WINDOW NUMBER TWO</h1>
        </d_window> -->
        
        
        <!-- <itchiogame></itchiogame> -->
      </div>
    </div>
    <div id="taskbar">
      <div id="start-btn"><img src="/public/assets/system/imepadsv.exe_14_200_0-0.png"><a>start</a></div>
      <div id="task-tabs">
        <!-- Windows Taskbar Tabs -->
        <!-- <div class="task-tab"><img src="/assets/icon_test.png"><a>Notebook</a></div> -->
        <!-- <div class="task-tab active"><img src="/assets/icons/pifmgr.dll_14_20.png"><a>Window 2</a></div> -->
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
  import d_window from "~/components/d_window.vue";
  import { useFocus } from "~/composables/useFocus";
  const { setFocus } = useFocus();

const timeclock = ref(null);

function updateTime() {
  if (timeclock.value) {
    var myTime = new Date();
    
    var hours = myTime.getHours() % 12 ? myTime.getHours() % 12 : 12;
    var mins = myTime.getMinutes() < 10 ? '0'+myTime.getMinutes() : myTime.getMinutes();
    var ampm = myTime.getHours() >= 12 ? 'PM' : 'AM';

    timeclock.value.innerHTML = hours + ':' + mins + ' ' + ampm;
  };
  setTimeout(updateTime, 1000);
}

onMounted(() => {

  window.addEventListener('mousedown', (event) => {
    // console.log("YAAA");
    const clickedElem = event.target;

    const foundElem = clickedElem.closest('.window, #desktop, .d-icon');

    if (foundElem) {
      setFocus(foundElem);
    }
  })


  // timeclock.value.innerHTML = Date.now().toLocaleString()
  // "YYYY-MM-DDTHH:mm:ss.sssZ"

  updateTime();  
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
#taskbar #task-tabs .task-tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  background: #3980F4;
  border: 1px outset #3980F4;
  border-radius: 3px;
  margin-top: 4px;
  margin-bottom: 2px;
}
#taskbar #task-tabs .task-tab img {
  width: 16px;
  height: 16px;
  padding: 0 6px;
}
#taskbar #task-tabs .task-tab a {
  color: #ffffff;
}
#taskbar #task-tabs .task-tab.active {
  background: #1E52B7;
  border: 1px inset #001331;
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