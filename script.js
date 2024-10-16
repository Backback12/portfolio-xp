








function showPage(index) {
  // for (var i = 0; i < pages.length; i++) {
  //     pages[i].className = pages[i].className.replace(" show", "");
  // }
  // pages[index].className += " show";
}








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
  document.querySelectorAll('.window').forEach(function(window) {
    // new PlainDraggable(window);
    // window.classList.add('yoo');
    // console.log("YOOOO");

    // new PlainDraggable(window, 
    //   {
    //     handle: window.querySelector('.toptab')
    //   }
    // );


    interact('.window')
      .draggable({
        // intertia: true,
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

        }
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

  })
}