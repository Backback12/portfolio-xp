export function useDoubleClick(handler, delay = 300) {
  let lastTap = 0;

  function onTouchEnd(e) {
    const now = Date.now();
    if (now - lastTap < delay) {
      e.preventDefault();
      handler();
    }
    lastTap = now;
  }

  return {
    dblclick: handler,
    touchend: onTouchEnd,
  };
}