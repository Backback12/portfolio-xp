

// get html components into text
function getComponent(path) {
  fetch(path)
    .then(response => response.text())
    .then(data => {
      return data;
    })
    .catch(error => {
      return `Faled to load ${path}: ${error}`;
    })
}


// const formatString = (template, ...args) => {
//   return template.replace(/{([0-9]+)}/g, function (match, index) {
//     return typeof args[index] === 'undefined' ? match : args[index];
//   });
// }
const formatString = (template, data) => {
  return template.replace(/{{\s*([\w]+)\s*}}/g, (match, key) => {
    return typeof data[key] !== 'undefined' ? data[key] : match;
  });
};



function showPage(index) {
  // for (var i = 0; i < pages.length; i++) {
  //     pages[i].className = pages[i].className.replace(" show", "");
  // }
  // pages[index].className += " show";
}



function btn_minimize(target) {
  // minimize target.... need taskbar???
}
function btn_maximize(target) {
  // maximize target
  // if maximized... return to before size
  
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
  }
  


  

  
}
function btn_close(target) {
  // close target
  target.remove();
}
window.btn_minimize = btn_minimize;
window.btn_maximize = btn_maximize;
window.btn_close = btn_close;


const windows_container = document.getElementById('windows');
const desktop_container = document.getElementById('desktop');
const temp_div = document.createElement('div');

// function init_window(init_x, init_y, title="Window", content="blank content", min_width=300, min_height=200) {
async function init_window(title="Window",
                    content="blank content",
                    icon="/assets/icon_test.png",
                    init_x=0, 
                    init_y=0, 
                    min_width=300, 
                    min_height=200,
                    btn_question = false,
                    btn_minimize = true,
                    btn_maximize = true,
                    btn_unmaximize = false,
                    btn_close = true) {

  // MOVE CODE FROM window.onload
  // var window = getComponent('/components/window.html');

  if (content.endsWith('.html')) {
    
    // LOAD HTML COMPONENT
    await fetch(content)
      .then(response => response.text())
      .then(data => {
        content = data
      })
      .catch(error => {
        content = `Faled to load ${path}: ${error}`;
      })
  }
  var window = 
 `<div class="window draggable">
    <div class="title-bar">
      <div class="titles">
        <img class="w-icon" src="${ icon }">
        <span class="title">${ title }</span>
      </div>
      <div class="buttons">`
      + (btn_question ?  
        `<div class="button" onclick="btn_question(this.closest('.window'));">
          <!--<svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10"><path stroke="#FFF" d="M4 2h4M3 3h2M7 3h2M3 4h2M7 4h2M6 5h2M5 6h2M5 7h2M5 9h2M5 10h2" /></svg>-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 12 12" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path d="M4 2h5M3 3h2M8 3h1M8 4h1M6 5h3M6 6h1M6 7h1M6 10h1" />
          </svg>
        </div>` : '')
      + (btn_minimize ?
        `<div class="button" onclick="btn_minimize(this.closest('.window'));">
          <!--<svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 -0.5 12 12" shape-rendering="crispEdges"><path stroke="#FFF" d="M2 9h7M2 10h7" /></svg>-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 12 12" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path d="M0 9h8M0 10h8M0 11h8" />
          </svg>
        </div>` : '')
      + (btn_maximize ?
        `<div class="button" onclick="btn_maximize(this.closest('.window'));">
          <!--<svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 -0.5 12 12" shape-rendering="crispEdges"><path stroke="#FFF" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg>-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 12 12" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path d="M0 0h12M0 1h12M0 2h12M0 3h1M11 3h1M0 4h1M11 4h1M0 5h1M11 5h1M0 6h1M11 6h1M0 7h1M11 7h1M0 8h1M11 8h1M0 9h1M11 9h1M0 10h1M11 10h1M0 11h12" />
          </svg>
        </div>` : '')
      + (btn_unmaximize ?
        `<div class="button" onclick="btn_maximize(this.closest('.window'));">
          <!--<svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 -0.5 12 12" shape-rendering="crispEdges"><path stroke="#FFF" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg>-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 12 12" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path d="M3 0h8M3 1h8M10 2h1M0 3h8M10 3h1M0 4h8M10 4h1M0 5h1M7 5h1M10 5h1M0 6h1M7 6h1M10 6h1M0 7h1M7 7h1M9 7h2M0 8h1M7 8h1M0 9h1M7 9h1M0 10h8" />
          </svg>
        </div>` : '')
      + (btn_close ? 
        `<div class="button close" onclick="btn_close(this.closest('.window'));">
          <!--<svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#FFF" d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg>-->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 12 12" shape-rendering="crispEdges">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path d="M0 0h2M10 0h2M0 1h3M9 1h3M1 2h3M8 2h3M2 3h3M7 3h3M3 4h6M4 5h4M4 6h4M3 7h6M2 8h3M7 8h3M1 9h3M8 9h3M0 10h3M9 10h3M0 11h2M10 11h2" />
          </svg>
        </div>` : '') +
      `</div>
    </div>
    <div class="toolbar">
      <div class="button">
        <a>File</a>
      </div>
      <div class="button">
        <a>Edit</a>
      </div>
      <div class="button">
        <a>View</a>
      </div>
    </div>
    <div class="content">
      ${ content }
    </div>
  </div>`
  
  /*
  find a way to insert window buttons like
  {"File": 
    {
      "Save As...": "console.log('CLICKED')", 
      "Exit": "console.log('EXIT')"
    }
  }
*/
  // turn string into element
  temp_div.innerHTML = window;
  window = temp_div.firstChild;
  
  windows_container.appendChild(window);

  // remove then add <script> to execute them
  const scripts = window.querySelectorAll('script');
  scripts.forEach(script => {
    const inlineScript = document.createElement('script');
    inlineScript.textContent = script.textContent;
    script.remove();
    window.appendChild(inlineScript);
  });

  temp_div.innerHTML = "";

  var x = init_x;
  var y = init_y;



  window.setAttribute('maximized', false);
  window.classList.remove('maximized');

  // window.style.zIndex = n++;
  window.style.zIndex = windows_container.children.length;
  window.setAttribute('data-x', x);
  window.setAttribute('data-y', y);
  window.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  x = x + 32;
  y = y + 26;
  

  window.addEventListener('mousedown', (event) => {
    // console.log("YOOO");
    // console.log(window);
    setActiveWindow(window);
  });
  

  if (window.querySelector('.content').hasAttribute('inject')) {
    // HAS INJECT PATH
    var content = window.querySelector('.content');
    fetch(content.getAttribute('inject'))
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;
      })
      .catch(error => {
        content.innerHTML = `Faled to load ${content.getAttribute('inject')}: ${error}`
      })
  }



  // interact('.window')
  interact(window)
    .draggable({
      // intertia: true,
      allowFrom: '.title-bar',
      ignoreFrom: '.button',

      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
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
        return null
      },
    })
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
          min: { width: min_width, height: min_height }
        })
      ],
      
      margin: 4,
      // padding: 20
      // inertia: true
    })
  



  // toggle style to match width
  ////////// ADD A WIDTH PARAMETER
  window.style.width = min_width + 'px';
  window.style.height = min_height + 'px';






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

    setActiveWindow(target)
  }
    
    
    
  function setActiveWindow(target) {
    var n = 0;

    document.querySelectorAll('.window').forEach(function(window) {
      window.classList.remove('active');
      if (window.style.zIndex > target.style.zIndex) {
        window.style.zIndex = Number(window.style.zIndex) - 1;
        n += 1;
      }  
    });
    target.classList.add('active');
    target.style.zIndex = Number(target.style.zIndex) + n;
  }




  setActiveWindow(window);
}// init_window








function init_desktopIcon(title="Title of my app",
                          icon="/assets/icon_test.png",
                          onclick=() => {console.log('clicked')}) {
  
  var icon = 
  `<div class="d-icon">
    <div>
      <img class="icon" src="${ icon }">
    </div>
    <span class="title">${ title }</span>
  </div>`
  // turn string into element
  temp_div.innerHTML = icon;
  icon = temp_div.firstChild;
  temp_div.innerHTML = "";
  
  icon.addEventListener('click', () => {
    // handle single click
  });
  icon.addEventListener('dblclick', () => {
    // handle double click
    
    onclick();
  });


  desktop_container.appendChild(icon);

  
}




const TASKBAR_TIME = document.getElementById('time');
setInterval(() => {
  
  // var time_now = new Date("1995-12-17T00:54:00");
  var time_now = new Date();
  

  TASKBAR_TIME.innerHTML = (
    ((time_now.getHours() + 11) % 12 + 1) + ":" + 
    String(time_now.getMinutes()).padStart(2, '0') + " " + 
    (time_now.getHours() >= 12 ? 'PM' : 'AM')
  );
}, 1000);






window.addEventListener('click', function(event) {
  // `event.target` will give you the element that was clicked
  const clickedElement = event.target;
  console.log('Element clicked:', clickedElement);
  
  // You can now perform any action based on the clicked element
});


window.onload = async (event) => {
  
  // const url_params = new URLSearchParams(window.location.search);

  // switch (url_params.get('page')) {
  //   case 'projects':
  //     console.log("onload: 'Loading #projects'")
  //     break;
  //   case 'blog':
  //     console.log("onload: 'Loading #blog'")
  //     break;
  // }

  
  
  await init_window("Window 2", "<embed src='https://www.umrt.ca', style='width:100%; height:100%; padding:0; margin:0;'>", "/assets/icons/recycle.png", 140, 140);
  await init_window("Window 3", "<embed src='https://backback12.github.io', style='width:100%; height:100%;'>", "/assets/icon_test.png", 180, 180);
  await init_window("Window 4", "<embed src='http://localhost:5500', style='width:100%; height:100%;'>", "/assets/icon_test.png", 180, 180);
  await init_window("Connor's Blog", "/pages/blog.html", "/assets/icon_test.png", 230, 230, 500, 400);

  // await init_window("Chimp Want Banana - itch.io", `<iframe frameborder="0" src="https://itch.io/embed-upload/3392649?color=2b5754" allowfullscreen="" width="1044" height="808"><a href="https://alphaq.itch.io/chimp-want-banana">Play Chimp Want Banana on itch.io</a></iframe>`, 200, 200, 1044, 808);
  // await init_window("Chimp Want Banana", `<iframe style="transform: scale(0.5) translate(-522px, -404px);" frameborder="0" src="https://itch.io/embed-upload/3392649?color=2b5754" allowfullscreen="" width="1044" height="808"><a href="https://alphaq.itch.io/chimp-want-banana">Play Chimp Want Banana on itch.io</a></iframe>`, 200, 200, 522, 404);

  // await init_window("Bodyguard - itch.io", `<iframe frameborder="0" src="https://itch.io/embed-upload/2182069?color=637598" allowfullscreen="" width="1024" height="788"><a href="https://alphaq.itch.io/bodyguard-ld46">Play Bodyguard on itch.io</a></iframe>`, 400, 300, 1024, 788)
  

  
  // init_desktopIcon("MY NEW APP");
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  // init_desktopIcon();
  init_desktopIcon('Recycling', '/assets/icons/recycle.png');
  init_desktopIcon('Chimp Want Banana', '/assets/icons/chimp_32.png');
  init_desktopIcon('Bodyguard', '/assets/icons/prez_32.png');
}


