








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
}
function btn_close(target) {
  // close target
  target.remove();
}
window.btn_minimize = btn_minimize;
window.btn_maximize = btn_maximize;
window.btn_close = btn_close;




window.onload = (event) => {
  
  const url_params = new URLSearchParams(window.location.search);

  switch (url_params.get('page')) {
    case 'projects':
      console.log("onload: 'Loading #projects'")
      break;
    case 'blog':
      console.log("onload: 'Loading #blog'")
      break;
  }




  // make windows draggable

  // draggable = new PlainDraggable(document.getElementById('draggable'));
  var n = 0;
  var x = 40;
  var y = 40;
  document.querySelectorAll('.window').forEach(function(window) {
    // new PlainDraggable(window);
    // window.classList.add('yoo');
    // console.log("YOOOO");

    // new PlainDraggable(window, 
    //   {
    //     handle: window.querySelector('.toptab')
    //   }
    // );
    window.style.zIndex = n++;
    window.setAttribute('data-x', x);
    window.setAttribute('data-y', y);
    window.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    x = x + 32;
    y = y + 26;
    

    window.addEventListener('mousedown', (event) => {
      // console.log("YOOO");
      // console.log(window);
      moveWindowToFront(window);
    })
    
  })

  interact('.window')
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
          // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
        }
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),
  
        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],
      
      margin: 4,
      // padding: 20
      // inertia: true
    })

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
  
}