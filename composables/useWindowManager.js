import { ref, markRaw } from 'vue'

const windows = ref([])
const activeWindowId = ref(null)
let zIndexCounter = 10 

export function useWindowManager() {
  
  function openWindow(appConfig) {
    const id = appConfig.id || crypto.randomUUID()
    
    const existing = windows.value.find(w => w.id === id)
    if (existing) {
      if (existing.isMinimized) existing.isMinimized = false
      focusWindow(id)
      return
    }

    const offset = windows.value.length * 30
    
    const newWindow = {
      id,
      title: appConfig.title || 'Application',
      icon: appConfig.icon || '/assets/os/imepadsv.exe_14_200_0-0.png',
      // markRaw prevents Vue from making the component definition reactive!
      component: markRaw(appConfig.component), 
      props: appConfig.props || {},
      
      // Customizable toolbar menu. Defaults to your original layout if undefined.
      tool_menu: appConfig.tool_menu !== undefined ? appConfig.tool_menu : { "File": [], "Edit": [], "View": [] },

      x: appConfig.start_x ?? (100 + offset),
      y: appConfig.start_y ?? (50 + offset),
      width: appConfig.width ?? 500,
      height: appConfig.height ?? 400,
      zIndex: ++zIndexCounter,
      isMinimized: false,
      isMaximized: appConfig.start_maximized ?? false,
      savedState: null 
    }
    
    windows.value.push(newWindow)
    focusWindow(id)
  }

  function closeWindow(id) {
    windows.value = windows.value.filter(w => w.id !== id)
    if (activeWindowId.value === id) {
      const remaining = [...windows.value].sort((a, b) => b.zIndex - a.zIndex)
      activeWindowId.value = remaining.length ? remaining[0].id : null
    }
  }

  function focusWindow(id) {
    const target = windows.value.find(w => w.id === id)
    if (target) {
      if (target.isMinimized) target.isMinimized = false
      target.zIndex = ++zIndexCounter
      activeWindowId.value = id
    }
  }

  function toggleMinimize(id) {
    const target = windows.value.find(w => w.id === id)
    if (target) {
      target.isMinimized = !target.isMinimized
      if (target.isMinimized && activeWindowId.value === id) {
        activeWindowId.value = null 
      } else if (!target.isMinimized) {
        focusWindow(id)
      }
    }
  }

  function toggleMaximize(id) {
    const target = windows.value.find(w => w.id === id)
    if (!target) return
    
    if (target.isMaximized) {
      if (target.savedState) {
        target.x = target.savedState.x
        target.y = target.savedState.y
        target.width = target.savedState.width
        target.height = target.savedState.height
      }
      target.isMaximized = false
    } else {
      target.savedState = { x: target.x, y: target.y, width: target.width, height: target.height }
      target.x = 0
      target.y = 0
      // Find the screen dimensions minus the taskbar height (approx 30px)
      const desktop = document.getElementById('upper-screen')
      target.width = desktop ? desktop.offsetWidth : window.innerWidth
      target.height = desktop ? desktop.offsetHeight : window.innerHeight - 30 
      target.isMaximized = true
    }
    focusWindow(id)
  }

  function updateWindowBounds(id, bounds) {
    const target = windows.value.find(w => w.id === id)
    if (target && !target.isMaximized) {
      if (bounds.x !== undefined) target.x = bounds.x
      if (bounds.y !== undefined) target.y = bounds.y
      if (bounds.width !== undefined) target.width = bounds.width
      if (bounds.height !== undefined) target.height = bounds.height
    }
  }

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    updateWindowBounds
  }
}