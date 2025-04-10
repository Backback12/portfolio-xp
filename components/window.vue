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
  <div class="window">
    <div class="window draggable" id="blog">
      <div class="title-bar">
        <span class="title">{{ title }}</span>
        <div class="buttons">
          <!-- <div class="button" onclick="btn_question(this.closest('.window'));">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10"><path stroke="#000000" d="M4 2h4M3 3h2M7 3h2M3 4h2M7 4h2M6 5h2M5 6h2M5 7h2M5 9h2M5 10h2" /></svg>
          </div> -->
          <div class="button" onclick="btn_minimize(this.closest('.window'));">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M2 9h7M2 10h7" /></svg>
          </div>
          <div class="button" onclick="btn_maximize(this.closest('.window'));">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg>
          </div>
          <div class="button" onclick="btn_close(this.closest('.window'));">
            <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#000000" d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg>
          </div>
        </div>
      </div>
      <!-- <div class="content" inject="/pages/blog.html"> -->
      <div class="content">
        HERE IS MY CONTENT
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped>
/* ================================================================ */
/* =========================== WINDOWS ============================ */
/* ================================================================ */
.window {
  
  position: absolute;
  background-color: #0831D9;
  width: 300px;
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


.window .toolbar {
  height: 24px;
  min-height: 24px; 
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
  margin: 2px;
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