<!-- <template>
<div class="window">
  <div class="navbar">
    <ul class="title draggable">
      <li style="margin: 0px; padding: 0px">
        <span>Connor Pagtakhan</span>
      </li>
    </ul>


  </div>
</div>
</template> -->
<template>
  <!-- <div class="window" > -->
    <div 
      class="window draggable" 
      ref="windowRef"
      :style="{
        width: set_width ? set_width + 'px' : 'auto',
        height: set_height ? set_height + 'px' : 'auto',
      }">
      <div class="title-bar">
        
        <span class="titles"><img :src="icon" class="w-icon">  {{ title }}</span>
        <div class="buttons">
          <!-- <div class="button question" @onclick="">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10"><path d="M4 2h4M3 3h2M7 3h2M3 4h2M7 4h2M6 5h2M5 6h2M5 7h2M5 9h2M5 10h2" /></svg>
          </div> -->
          <div class="button minimize" @click="btn_minimize">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M2 9h7M2 10h7" /></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path d="M2 9h7M2 10h7" /></svg>
          </div>
          
          <!-- <div class="button maximize"
               :class="{ disabled: !resizable}" 
               :disabled="!resizable"
               @click="btn_maximize"> -->
          <div class="button maximize"
               @click="btn_maximize">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg>
          </div>
          <!-- <div class="button close" onclick="btn_close(this.closest('.window'));"> -->
          <div class="button close" @click="btn_close">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg> -->
            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" shape-rendering="crispEdges"><path d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg>
          </div>
        </div>
      </div>
      <!-- <div class="content" inject="/pages/blog.html"> -->
      <div v-if="tool_menu" class="toolbar">
        <!-- <div class="button">File</div> -->
        <!-- <div class="button">Edit</div> -->
        <!-- <div class="button">View</div> -->
        <!-- <div class="button">Favourites</div> -->
        <!-- <div class="button">Tools</div> -->
        <!-- <div class="button">Help</div> -->
         <div v-for="(list, name) in tool_menu" :key="name" class="button">{{ name }}</div>
      </div>
      <div class="content">
        <!-- HERE IS MY CONTENT -->
        <slot></slot>
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: false, default: "No Title" },
  icon: { type: String, required: false, default: "/assets/system/imepadsv.exe_14_200_0-0.png"},
  resizable: { type: Boolean, required: false, default: true },
  set_width: { type: Number, required: false},
  set_height: { type: Number, required: false},
  tool_menu: { type: Object, required: false, default: {"File": "", "Edit": "", "View": "", "Favourites": "", "Tools": "", "Help": ""}}
  // set_width: { type: String, required: false},
  // set_height: { type: String, required: false},
  // tool_menu: { type: String, required: false, default: '{"File": "", "Edit": "", "View": "", "Favourites": "", "Tools": "", "Help": ""}'}
});



import interact from 'interactjs'
  // interact('.window')

// import { useFocus } from '~/composables/useFocus';
const { setFocus } = useFocus();

const windowRef = ref(null);






function btn_minimize(target) {
  // need taskbar functionality first
}
function btn_maximize() {
  // maximize target
  // if maximized... return to before size
  let target = windowRef.value;
  // console.log("btn_maximize: Attempting to maximize");

  if (!target) {
    // console.warn("btn_maximize: COULDNT FIND TARGET WHATTTT");
    return;
  }

  
  if (target.getAttribute('maximized') == 'true') {
    // MINIMIZE
    target.setAttribute('maximized', false);
    target.classList.remove('maximized');

    var x = target.getAttribute('maxi-x');
    var y = target.getAttribute('maxi-y');
    target.style.transform = `translate(${ x }px, ${ y }px)`
    
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)

    target.style.width = target.getAttribute('maxi-w') + 'px';
    target.style.height = target.getAttribute('maxi-h') + 'px';

    target.querySelector('.button.maximize svg').innerHTML = '<path d="M0 0h12M0 1h12M0 2h12M0 3h1M11 3h1M0 4h1M11 4h1M0 5h1M11 5h1M0 6h1M11 6h1M0 7h1M11 7h1M0 8h1M11 8h1M0 9h1M11 9h1M0 10h1M11 10h1M0 11h12" />'
  } 
  else {
    // MAXIMIZE
    target.setAttribute('maximized', true);
    target.classList.add('maximized');

    target.setAttribute('maxi-x', target.getAttribute('data-x'));
    target.setAttribute('maxi-y', target.getAttribute('data-y'));
    target.setAttribute('maxi-w', target.offsetWidth);
    target.setAttribute('maxi-h', target.offsetHeight);

    target.style.transform = 'translate(0px, 0px)';
    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);
    
    target.style.width = target.parentElement.offsetWidth + 'px';
    target.style.height = target.parentElement.offsetHeight + 'px';

    target.querySelector('.button.maximize svg').innerHTML = '<path d="M3 0h8M3 1h8M10 2h1M0 3h8M10 3h1M0 4h8M10 4h1M0 5h1M7 5h1M10 5h1M0 6h1M7 6h1M10 6h1M0 7h1M7 7h1M9 7h2M0 8h1M7 8h1M0 9h1M7 9h1M0 10h8" />'
  }
  
}

function btn_close() {
  if (windowRef && windowRef.value) {
    const window_id = windowRef.value.getAttribute('window-id')
    // remove all targets with window-id
    for (const elem of document.querySelectorAll(`[window-id="${ window_id }"]`)) {
      elem.remove();
    }
  }
}




function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // setActiveWindow(target)
  // setFocus(target);
}



// function setFocus(target) {
//   var n = 0;

  
//   if (target.classList.contains('window')) {
//     // if window selected
//     document.querySelectorAll('.window').forEach(function(window) {
//       window.classList.remove('active');
//       if (window.style.zIndex > target.style.zIndex) {
//         window.style.zIndex = Number(window.style.zIndex) - 1;
//         n += 1;
//       }
//     });
//     target.classList.add('active');
//     console.log("ACTIVATED! from z=" + Number(target.style.zIndex) + " to " + (Number(target.style.zIndex) + n));
//     target.style.zIndex = Number(target.style.zIndex) + n;
    


//     // set taskbar tab to active
//     document.querySelectorAll('.task-tab').forEach(function(tasktab) {
//       tasktab.classList.remove('active');
//     });
//     const window_id = target.getAttribute('window-id');
//     document.querySelectorAll(`[window-id="${ window_id }"]`).forEach(function(tasktab) {
//       tasktab.classList.add('active');
//     });
//   }
//   else {
//     document.querySelectorAll('.window').forEach(function(window) {
//       window.classList.remove('active');
//     });
//   }
// }


onMounted(() => {
  // console.log('d_window.vue MOUNTED');

  // windowRef.value.style.zIndex = document.querySelector("#windows").children.length;
  var maxZ = 0;
  document.querySelectorAll('.window').forEach(window => {
    maxZ = Math.max(maxZ, window.style.zIndex);
  });
  windowRef.value.style.zIndex = maxZ + 1;
  // console.log("initialized with z = " + (maxZ+1));
  windowRef.value.setAttribute('window-id', maxZ + 1);

  interact(windowRef.value)
    .draggable({
      // intertia: true,
      allowFrom: '.title-bar',
      ignoreFrom: '.button',

      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
        // interact.modifiers.restrict({
        //   restriction: 'parent',
        //   endOnly: true
        // })
      ],
      autoScroll: false,
      listeners: {
        move: dragMoveListener,

      },
      cursorChecker () {
        // don't set a cursor for drag actions
        // return null
      },
    });
    if (props.resizable) {
      interact(windowRef.value)
      .resizable({
        // resize from all edges and corners
        

        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move (event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            // update the element's style
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            // min: { width: 300, height: 200 }
            // min: { width: min_width, height: min_height }
            min: { 
              width: props.set_width ? props.set_width : 300,
              height: props.set_height ? props.set_height : 200
            }
          })
        ],
        
        margin: 4,
        // padding: 20
        // inertia: true
      })
    }

    
    
    
    
    // if (props.set_width) {
    //   windowRef.value.style.width = String(props.set_width);
    //   console.log(props.set_width);
    // }
    // if (props.set_height) {
    //   windowRef.value.style.height = props.set_height;
    // }
    
  })


</script>

<style scoped>
/* ================================================================ */
/* =========================== WINDOWS ============================ */
/* ================================================================ */
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
  height: 18px;
  min-height: 18px; 
  background: #EDE9D4;
  /* border: 1px outset #EDE9D4; */
  /* border-bottom: 1px outset #EDE9D4; */
  border-left: 4px solid #7998DF;
  border-right: 4px solid #7998DF;

  display: flex;
}
.window .toolbar .button {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 6px;
  margin: 1px;

  font-size: 10px;
  letter-spacing: 0;
}
.window .toolbar .button:hover {
  background: #1660E8;
  color: #FFFFFF;
}


.window .content {
  height: 100%;
  /* border: 4px solid; */
  /* border: 2px inset #DDDDDD; */
  /* border-top: 4px solid var(--window-border-dark); */
  /* border-left: 4px solid var(--window-border-dark); */
  /* border-right: 4px solid var(--window-border-light); */
  /* border-bottom: 4px solid var(--window-border-light); */

  padding: 0; 
  margin: 0;

  border-left: 4px solid #7998DF;
  border-right: 4px solid #7998DF;
  border-bottom: 4px solid #7998DF;

  /* background-color: #FFFFFF; */
  background-color: #FFF;

  /* color: white; */

  /* overflow: scroll; */
  /* overflow-y: scroll; */

  
  overflow-x: hidden;
  /* overflow-y: auto; */
  overflow-y: hidden;

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
</style>