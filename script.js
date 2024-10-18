

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
 `<div class="window draggable" id="blog">
    <div class="title-bar">
      <div class="titles">
        <img class="w-icon" src="${ icon }">
        <span class="title">${ title }</span>
      </div>
      <div class="buttons">`
      + (btn_question ?  
        `<div class="button" onclick="btn_question(this.closest('.window'));">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10"><path stroke="#FFF" d="M4 2h4M3 3h2M7 3h2M3 4h2M7 4h2M6 5h2M5 6h2M5 7h2M5 9h2M5 10h2" /></svg>
        </div>` : '')
      + (btn_minimize ?
        `<div class="button" onclick="btn_minimize(this.closest('.window'));">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 -0.5 12 12" shape-rendering="crispEdges"><path stroke="#FFF" d="M2 9h7M2 10h7" /></svg>
        </div>` : '')
      + (btn_maximize ?
        `<div class="button" onclick="btn_maximize(this.closest('.window'));">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 -0.5 12 12" shape-rendering="crispEdges"><path stroke="#FFF" d="M1 1h10M1 2h10M1 3h1M10 3h1M1 4h1M10 4h1M1 5h1M10 5h1M1 6h1M10 6h1M1 7h1M10 7h1M1 8h1M10 8h1M1 9h1M10 9h1M1 10h10" /></svg>
        </div>` : '')
      + (btn_close ? 
        `<div class="button close" onclick="btn_close(this.closest('.window'));">
          <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12" viewBox="0 0 12 10" shape-rendering="crispEdges"><path stroke="#FFF" d="M2 3h2M8 3h2M3 4h2M7 4h2M4 5h4M5 6h2M4 7h4M3 8h2M7 8h2M2 9h2M8 9h2" /></svg>
        </div>` : '') +
      `</div>
    </div>
    <div class="content">
      ${ content }
    </div>
  </div>`
  
  // turn string into element
  temp_div.innerHTML = window;
  window = temp_div.firstChild;
  temp_div.innerHTML = "";
  windows_container.appendChild(window);


  var x = init_x;
  var y = init_y;



  window.setAttribute('maximized', false);

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
    moveWindowToFront(window);
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

    moveWindowToFront(target)
  }
    
    
    
  function moveWindowToFront(target) {
    var n = 0;

    document.querySelectorAll('.window').forEach(function(window) {
      if (window.style.zIndex > target.style.zIndex) {
        window.style.zIndex = Number(window.style.zIndex) - 1;
        n += 1;
      }  
    });
    target.style.zIndex = Number(target.style.zIndex) + n;
  }
}// init_window








function init_desktopIcon(title="Title of my app",
                          icon="/assets/icon_test.png",
                          onclick="console.log('clicked')") {
  
  var icon = 
  `<div class="d-icon">
    <div>
      <img src="${ icon }">
    </div>
    <span>${ title }</span>
  </div>`
  // turn string into element
  temp_div.innerHTML = icon;
  icon = temp_div.firstChild;
  temp_div.innerHTML = "";
  desktop_container.appendChild(icon);
}

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

  
  
  await init_window("Window 2", "", "/assets/icons/recycle.png", 140, 140);
  await init_window("Window 3", "", "/assets/icon_test.png", 180, 180);
  await init_window("Window 4", "", "/assets/icon_test.png", 220, 220);
  await init_window("Connor's Blog", "/pages/blog.html", "/assets/icon_test.png", 230, 230, 500, 100);

  // await init_window("Chimp Want Banana - itch.io", `<iframe frameborder="0" src="https://itch.io/embed-upload/3392649?color=2b5754" allowfullscreen="" width="1044" height="808"><a href="https://alphaq.itch.io/chimp-want-banana">Play Chimp Want Banana on itch.io</a></iframe>`, 200, 200, 1044, 808);
  // await init_window("Chimp Want Banana", `<iframe style="transform: scale(0.5) translate(-522px, -404px);" frameborder="0" src="https://itch.io/embed-upload/3392649?color=2b5754" allowfullscreen="" width="1044" height="808"><a href="https://alphaq.itch.io/chimp-want-banana">Play Chimp Want Banana on itch.io</a></iframe>`, 200, 200, 522, 404);

  // await init_window("Bodyguard - itch.io", `<iframe frameborder="0" src="https://itch.io/embed-upload/2182069?color=637598" allowfullscreen="" width="1024" height="788"><a href="https://alphaq.itch.io/bodyguard-ld46">Play Bodyguard on itch.io</a></iframe>`, 400, 300, 1024, 788)
  

  
  init_desktopIcon("MY NEW APP");
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon();
  init_desktopIcon('Recycling', '/assets/icons/recycle.png');
  init_desktopIcon('Chimp Want Banana', '/assets/icons/chimp_32.png');
  init_desktopIcon('Bodyguard', '/assets/icons/prez_32.png');
}


