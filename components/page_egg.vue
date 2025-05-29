<template>
  
  <d_window title="EGG GAME" :resizable=false :set_width="384" :set_height="256" :tool_menu="{'Game': '', 'About': ''}"
    icon="/assets/egg/egg_egg.png">
  <!-- <d_window title="EGG GAME" :tool_menu="{'Game': '', 'About': ''}"> -->
    
    <div draggable="false" ref="contentRef" class="content" :draggable="false">
      <span class="title">FEED EGGS</span>
      <!-- head -->
      <div ref="eggmanRef" class="head-container">
        <img draggable=false class="head open" ref="eggmouthRef" src="/public/assets/egg/egg_egg_0.png">
        <img draggable=false class="head eat hidden" src="/public/assets/egg/egg_egg_1.png">
        <img draggable=false class="mouth eat hidden yummy" src="/public/assets/egg/egg_mouth.png">
      </div>
      <!-- static -->
      <img draggable=false class="legs" src="/public/assets/egg/egg_legs.png">
      <img draggable=false ref="basketRef" class="basket" src="/public/assets/egg/egg_basket.png">

      <!-- egg -->
      <img draggable=false ref="eggRef" class="egg hidden" src="/public/assets/egg/egg_egg.png">
    </div>
    
  </d_window>
</template>

<script setup>
// import d_window from './d_window.vue';

const contentRef = ref(null);
const eggmanRef = ref(null);
const eggmouthRef = ref(null);
const basketRef = ref(null);
const eggRef = ref(null);
let eggmousedown = false;

onMounted(() => {

  if (basketRef.value && eggRef.value) {
    basketRef.value.addEventListener('mousedown', (event) => {
      // console.log("BRUHH");
      eggmousedown = true;
      contentRef.value.style.cursor = "grabbing"
      basketRef.value.style.cursor = "grabbing"
      
      eggRef.value.classList.remove('hidden');
      // console.log("SHOWING");


      eggmanRef.value.classList.add('anticipate');
      

      var rect = contentRef.value.getBoundingClientRect();
      let offx = event.pageX - rect.left;
      let offy = event.pageY - rect.top;
      // console.log(offx + " AND " + offy);


      // eggRef.value.style.top = offy + 'px';
      // eggRef.value.style.left = offx + 'px';
      eggRef.value.style.top = (offy + 30) + 'px';
      eggRef.value.style.left = (offx - 5) + 'px';
    })
    

    document.addEventListener('mouseup', (event) => {
      if (eggmousedown) {
        eggmousedown = false;
        contentRef.value.style.cursor = "default"
        basketRef.value.style.cursor = "grab"

        // console.log("RELEASED");
        eggRef.value.classList.add('hidden');

        eggmanRef.value.classList.remove('anticipate');


        // check if released in zone
        var rect = eggmouthRef.value.getBoundingClientRect();
        let midX = rect.left + rect.width / 2;
        let midY = rect.top + rect.height / 2;
        const deltax = 25;
        const deltay = 30;

        // console.log("Comparing " + midX + " and " + midY);
        // console.log("To : " + event.pageX + " and " + event.pageY);


        if (midX - deltax < event.pageX && event.pageX < midX + deltax &&
            midY - deltay < event.pageY && event.pageY < midY + deltay) {
          
          // INSIDE
          // console.log("INSIDE");
          eggmanRef.value.querySelectorAll('.open').forEach((elem) => {
            elem.classList.add('hidden');
          });
          eggmanRef.value.querySelectorAll('.eat').forEach((elem) => {
            elem.classList.remove('hidden');
          });


          setTimeout(() => {
            eggmanRef.value.querySelectorAll('.open').forEach((elem) => {
              elem.classList.remove('hidden');
            });
            eggmanRef.value.querySelectorAll('.eat').forEach((elem) => {
              elem.classList.add('hidden');
            });
          }, 500);

        }
        else {
          // console.log("outside");
        }
      }
    })

    contentRef.value.addEventListener('mousemove', (event) => {
      if (eggmousedown) {
        // eggRef.value.top = event.offsetY;
        // eggRef.value.left = event.offsetX;

        
        // console.log(event.pageX + " AND " + event.pageY);
        var rect = contentRef.value.getBoundingClientRect();
        let offx = event.pageX - rect.left;
        let offy = event.pageY - rect.top;
        // console.log(offx + " AND " + offy);


        eggRef.value.style.top = (offy + 30) + 'px';
        eggRef.value.style.left = (offx - 5) + 'px';
      }
    })
  }



});//onMounted
</script>


<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: #ccCaCa;
  /* background-image: url('/public/assets/egg/egg_ideas.png'); */
  background-size: cover;


  /* position: absolute; */
  user-select: none;
}
.content > img {
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


.legs {
  top: 75%;
  left: 5%;
  z-index: 0;
}
.mouth {
  z-index: 3;
}
.head-container {
  position: absolute;
  width: auto;
  height: auto;
  top: 42%;
  left: 6%;
  display: inline-block;
  z-index: 2;

  /* border: 1px red solid; */
}
.head-container img {
  position: absolute;
  top: 0;
  left: 0;
}
.head-container.anticipate {
  transform: translate(0, -4px);
}
.head {
  z-index: 2;
}
.head.anticipate {
  transform: translate(0, -4px);
}
.yummy {
  /* animation: monch 1s linear 0 1; */
  /* animation: monch 0.4s 3; */
  animation: monch 0.25s infinite;
}
@keyframes monch {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(0.2, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.basket {
  top: 70%;
  left: 75%;
  z-index: 0;
  cursor: grab;
}
.egg {
  z-index: 2;
  cursor: grabbing;
}

.hidden {
  display: none;
}



</style>