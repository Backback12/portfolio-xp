<template>
  <div 
    class="window"
    v-show="!windowData.isMinimized"
    :class="{ 
      active: activeWindowId === windowData.id,
      maximized: windowData.isMaximized 
    }"
    :style="{
      transform: `translate(${windowData.x}px, ${windowData.y}px)`,
      width: `${windowData.width}px`,
      height: `${windowData.height}px`,
      zIndex: windowData.zIndex
    }"
    @mousedown="focusWindow(windowData.id)"
    ref="windowRef"
  >
    <div class="title-bar" @dblclick="toggleMaximize(windowData.id)">
      <span class="titles">
        <img :src="windowData.icon" class="w-icon"> 
        {{ windowData.title }}
      </span>
      <div class="buttons">
        <div class="button minimize" @click.stop="toggleMinimize(windowData.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path d="M2 9h7M2 10h7" /></svg>
        </div>
        <div class="button maximize" @click.stop="toggleMaximize(windowData.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges">
            <path v-if="!windowData.isMaximized" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" />
            <path v-else d="M3 0h8M3 1h8M10 2h1M0 3h8M10 3h1M0 4h8M10 4h1M0 5h1M7 5h1M10 5h1M0 6h1M7 6h1M10 6h1M0 7h1M7 7h1M9 7h2M0 8h1M7 8h1M0 9h1M7 9h1M0 10h8" />
          </svg>
        </div>
        <div class="button close" @click.stop="closeWindow(windowData.id)">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" shape-rendering="crispEdges"><path d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg>
        </div>
      </div>
    </div>

    <div v-if="windowData.tool_menu && Object.keys(windowData.tool_menu).length" class="toolbar">
      <div v-for="(list, name) in windowData.tool_menu" :key="name" class="button toolbar-dropdown">
        <a class="title">{{ name }}</a>
        <div class="dropdown-items" v-if="list && list.length">
          <a v-for="(item, idx) in list" :key="idx" @click.stop="handleMenuClick(name, item)">
            <span style="width: 16px; display: inline-block; font-weight: bold;">
              <span v-if="item.checked">✓</span>
            </span>
            {{ item.label || item }}
          </a>
        </div>
      </div>
    </div>
    
    <div class="content scroll-y">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import interact from 'interactjs'
import { useWindowManager } from '~/composables/useWindowManager'

const props = defineProps({
  windowData: { type: Object, required: true }
})

const { 
  activeWindowId, 
  focusWindow, 
  closeWindow, 
  toggleMinimize, 
  toggleMaximize, 
  updateWindowBounds 
} = useWindowManager()

const windowRef = ref(null)

// If the inner component registers a listener, this will fire it
function handleMenuClick(menuName, item) {
  if (props.windowData.onMenuClick) {
    props.windowData.onMenuClick(menuName, item)
  }
}

onMounted(() => {
  if (!windowRef.value) return

  interact(windowRef.value)
    .draggable({
      allowFrom: '.title-bar',
      ignoreFrom: '.button, .toolbar',
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: false
        })
      ],
      listeners: {
        start(event) {
          // DRAG TO UN-MAXIMIZE LOGIC
          if (props.windowData.isMaximized) {
            toggleMaximize(props.windowData.id)
            
            // Center the restored window underneath the mouse cursor
            const restoredWidth = props.windowData.savedState ? props.windowData.savedState.width : 500
            updateWindowBounds(props.windowData.id, {
              x: event.clientX - (restoredWidth / 2),
              y: event.clientY - 14 // Roughly center on the title bar
            })
          }
        },
        move(event) {
          if (props.windowData.isMaximized) return
          updateWindowBounds(props.windowData.id, {
            x: props.windowData.x + event.dx,
            y: props.windowData.y + event.dy
          })
        }
      }
    })
    .resizable({
      margin: 3, // THINNER RESIZE BORDER (in pixels)
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          if (props.windowData.isMaximized) return
          updateWindowBounds(props.windowData.id, {
            x: props.windowData.x + event.deltaRect.left,
            y: props.windowData.y + event.deltaRect.top,
            width: event.rect.width,
            height: event.rect.height
          })
        }
      },
      modifiers: [
        interact.modifiers.restrictSize({ min: { width: 300, height: 200 } })
      ]
    })
})

onBeforeUnmount(() => {
  if (windowRef.value) interact(windowRef.value).unset()
})
</script>

<style scoped>
/* Paste ALL your original CSS from d_window.vue here! */
/* Including .window, .title-bar, .buttons, .toolbar, .toolbar-dropdown, .content */
/* DO NOT change your CSS, it was perfectly fine for the visuals. */

/* .window {
  position: absolute;
  background-color: #0831D9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0 0;
  pointer-events: all;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
}

.window.active {
  box-shadow: 0px 0px 16px 0px #0000007F; 
  z-index: 999;
} */

.window {
  
  position: absolute;
  background-color: #0831D9;
  width: 100px;
  height: 200px;
  /* border: 1px solid #FFFFFF; */

  touch-action: none;
  user-select: none;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  /* border: 4px solid #FFFFFF; */
  /* border: 2px outset #DDDDDD; */

  /* border-top: 3px solid var(--window-border-light);
  border-left: 3px solid var(--window-border-light);
  border-right: 3px solid var(--window-border-dark);
  border-bottom: 3px solid var(--window-border-dark); */
  
  /* min-width: 200px; */
  /* min-height: 200px; */

  
  /* display: inline-block; */
  /* min-width: max-content; */

  border-radius: 16px 16px 0 0;

  margin: 0;
  padding: 0;
  

  pointer-events: all;
}

.window .title-bar {
  /* background-color: #0000FF; */
  /* background: linear-gradient(90deg, rgba(53,71,157,1) 0%, rgba(198,246,255,1) 100%); */
  /* background: #0056E3; */
  /* background: linear-gradient(#358FFF 0%, #0368FB 50%); */
  /* #2C90FF
  #0831D9
  #0164F2
  #003599 */

  /* background: linear-gradient(#2C90FF 0%, #0831D9 15%, #0164F2 90%, #003599 100%); */
  background: linear-gradient(#8FABE7 0%, #7998DF 15%, #80A4E7 90%, #7A95E0 100%);
  
  
  
  

  height: 28px;
  /* interact.js seems to affect this for some reason */
  min-height: 28px; 
  color: #FFFFFF;

  font-weight: 600;

  /* vertical-align: middle; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 0;
  
  border-radius: 8px 8px 0 0;
}
.window .title-bar .titles {
  display: flex;
  align-content: center;
  flex-direction: row;
}
.window .title-bar .titles .w-icon {
  /* padding: 0 4px; */
  width: 16px;
  height: 16px;
}
.window .title-bar .titles .title {
  /* padding: 0 4px; */
  padding-left: 6px;
  white-space: nowrap;
}
.window .title-bar .buttons {
  display: flex;
  flex-direction: row;
  align-items: end;
  height: 100%;
  padding-bottom: 2px;
}
.window .title-bar .buttons .button {
  /* background-color: #CFCFCF; */
  background: linear-gradient(135deg, #89A2E8 0%, #4074EB 30%);

  width: 20px;
  height: 20px;
  margin: 0.5px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #EFEFEF;
  border-radius: 3px;


  stroke: #d2d2d2;
}
.window .title-bar .buttons .button svg {
  width: 12px;
  height: 12px;
}

.window .title-bar .buttons .button.close {
  background: linear-gradient(135deg, #C6ABB5 0%, #A8665E 30%);   
  margin-left: 2px;
}
/* inactive hover */
.window .title-bar .buttons .button:hover {
  background: linear-gradient(135deg, #9AB7F2 0%, #447CF6 30%);
}
.window .title-bar .buttons .button.close:hover {
  background: linear-gradient(135deg, #CAC2C7 0%, #C26C5C 30%);   
}
.window .title-bar .buttons .button.question {
  margin-right: 5px;
}
.window .title-bar .buttons .button[disabled] {
  /* background: linear-gradient(135deg, #89A2E8 0%, #4074EB 30%); */
  /* background: linear-gradient(#8FABE7 0%, #7998DF 15%, #80A4E7 90%, #7A95E0 100%); */
  background: linear-gradient(135deg, #7998DF 0%, #80A4E7 30%);
  pointer-events: none;
}


.window .toolbar {
  height: 24px;
  /* min-height: 18px;  */
  background: #EDE9D4;
  /* border: 1px outset #EDE9D4; */
  /* border-bottom: 1px outset #EDE9D4; */
  border-left: 4px solid #7998DF;
  border-right: 4px solid #7998DF;
  /* border-bottom: 1px solid #D0D0D0; */

  display: flex;

  position: relative;
}
.window .toolbar::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 0;
  border-bottom: 1px solid #D0D0D0;
}

.window .toolbar .button {
  /* display: flex; */
  /* align-items: center; */
  /* align-content: center; */
  padding: 2px 2px;
  /* margin: 1px; */

  font-size: 10px;
  letter-spacing: 0;
}
.window .toolbar .button:hover {
  background: #1660E8;
  color: #FFFFFF;
}

.toolbar-dropdown {
  position: relative;
  display: inline-block;
}
.toolbar-dropdown .title {
  padding: 2px 6px;
}
.toolbar-dropdown:hover .dropdown-items {
  display: block;
}
.toolbar-dropdown .dropdown-items {
  display: none;
  position: absolute;
  background-color: #FFFFFF;
  min-width: 120px;
  /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */
  box-shadow: 2px 2px 1px 0 #646464;
  border: solid 1px #808080;
  white-space: nowrap;
  z-index: 99999;

}
.toolbar-dropdown .dropdown-items a {
  color: black;
  padding: 4px 16px;
  text-decoration: none;
  display: block;
}
.toolbar-dropdown .dropdown-items a:hover {
  background-color: #1548a7;
  /* background-color: #1660E8; */
  color: white;
}





.window .content {
  height: 100%;
  /* border: 4px solid; */
  /* border: 2px inset #DDDDDD; */
  /* border-top: 4px solid var(--window-border-dark); */
  /* border-left: 4px solid var(--window-border-dark); */
  /* border-right: 4px solid var(--window-border-light); */
  /* border-bottom: 4px solid var(--window-border-light); */

  margin: 0;
  padding: 0; 

  border-left: 4px solid #7998DF;
  border-right: 4px solid #7998DF;
  border-bottom: 4px solid #7998DF;

  /* background-color: #FFFFFF; */
  background-color: #ECE9D8;

  /* color: white; */

  /* overflow: scroll; */
  /* overflow-y: scroll; */

  
  /* overflow-x: hidden; */
  /* overflow-y: hidden; */
  overflow-x: auto;
  overflow-y: auto;

  /* border-radius: 20px 0 20px 20px; */
}
.window .content:has(.scroll-y) {
  overflow-x: hidden !important;
  overflow-y: scroll !important;  
}

/* ======= ACTIVE WINDOW ======= */
.window.active {
  -webkit-box-shadow: 0px 0px 16px 0px #0000007F; 
  box-shadow: 0px 0px 16px 0px #0000007F;
  
}
.window.active .title-bar {
  background: linear-gradient(#2C90FF 0%, #0831D9 15%, #0164F2 90%, #003599 100%);
  /* background: #000; */
}
.window.active .title-bar .buttons .button {
  background: linear-gradient(135deg, #93AAEE 0%, #0A53E9 30%);
  /* background: #000; */
  stroke: #ffffff;
}
.window.active .title-bar .buttons .button.close {
  background: linear-gradient(135deg, #F9B99A 0%, #D04501 30%);
  /* background: #000; */
}
.window:active .title-bar .buttons .button.disabled {
  /* background: linear-gradient(135deg, #89A2E8 0%, #4074EB 30%); */
  /* background: linear-gradient(#8FABE7 0%, #7998DF 15%, #80A4E7 90%, #7A95E0 100%); */
  /* background: linear-gradient(135deg, #7998DF 0%, #80A4E7 30%); */
}

.window.active .toolbar {
  border-left: 4px solid #0831D9;
  border-right: 4px solid #0831D9;
}
.window.active .content {
  border-left: 4px solid #0831D9;
  border-right: 4px solid #0831D9;
  border-bottom: 4px solid #0831D9;
}
/* active hover */
.window.active .title-bar .buttons .button:hover {
  background: linear-gradient(135deg, #B0CCFF 0%, #1C5FFF 30%);
}
.window.active .title-bar .buttons .button.close:hover {
  background: linear-gradient(135deg, #FFDEB8 0%, #FB5301 30%);   
}
.window:active .title-bar .buttons .button:hover:active {
  background: linear-gradient(135deg, #8499D6 0%, #2045DC 30%);
  border: 1px solid #d2d2d2;
}
.window:active .title-bar .buttons .button.close:hover:active {
  background: linear-gradient(135deg, #E0A68A 0%, #C23F00 30%);   
  border: 1px solid #d2d2d2;
}



/* MAXIMIZED - FULL SCREEN */
.window.maximized .toolbar {
  border-left: none;
  border-right: none;
}
.window.maximized .content {
  border-left: none;
  border-right: none;
  border-bottom: none;
}

.window.minimized {
  display: none;
}


/* ================================================================ */
/* FULLSCREEN FIX */
/* ================================================================ */
.window.maximized {
  transform: translate(0px, 0px) !important;
  width: 100% !important;
  /* Adjust the 30px to match the exact height of your taskbar */
  height: calc(100% - 30px) !important; 
  border-radius: 0;
}
.window.maximized .title-bar {
  border-radius: 0;
}

/* ================================================================ */
/* XP SCROLLBARS */
/* ================================================================ */
.content::-webkit-scrollbar {
  width: 17px;
  height: 17px;
}
.content::-webkit-scrollbar-track {
  background: #F0F0F0;
  border-left: 1px solid #E3E3E3;
}
.content::-webkit-scrollbar-thumb {
  background: #C0C0D0; /* Classic XP scrollbar gray/blue */
  border: 1px outset #FFF;
  border-radius: 2px;
}
.content::-webkit-scrollbar-thumb:active {
  background: #A0A0B0;
  border: 1px inset #FFF;
}
.content::-webkit-scrollbar-button {
  background: #ECE9D8;
  border: 1px outset #FFF;
  height: 17px;
  width: 17px;
}
.content::-webkit-scrollbar-button:active {
  border: 1px inset #FFF;
  background: #DCD9C8;
}
</style>