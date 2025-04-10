export function useFocus() {
  function setFocus(target) {
    var n = 0;

    
    if (target.classList.contains('window')) {
      
      // if window selected
      
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
      target.classList.add('active');
      // console.log("ACTIVATED! from z=" + Number(target.style.zIndex) + " to " + (Number(target.style.zIndex) + n));
      target.style.zIndex = Number(target.style.zIndex) + n;
      


      // set taskbar tab to active
      document.querySelectorAll('.task-tab').forEach(function(tasktab) {
        tasktab.classList.remove('active');
      });
      const window_id = target.getAttribute('window-id');
      document.querySelectorAll(`[window-id="${ window_id }"]`).forEach(function(tasktab) {
        tasktab.classList.add('active');
      });
    }
    else {
      document.querySelectorAll('.window').forEach(function(window) {
        window.classList.remove('active');
      });
    }
  }

  return { setFocus };
}