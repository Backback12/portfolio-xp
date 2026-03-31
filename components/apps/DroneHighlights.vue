<template>
  <div class="drone-container">
    <div class="gallery-header">
      <h2>Drone Highlights</h2>
      <p>Footage taken at Canadian International Rover Competition 2024</p>
    </div>
    
    <div class="gallery-grid">
      <div class="polaroid">
        <img src="/assets/drone/PanUp.webp" alt="Pan Up">
        <div class="caption">PanUp.webp</div>
      </div>
      <div class="polaroid">
        <img src="/assets/drone/QuickSpin.webp" alt="Quick Spin">
        <div class="caption">QuickSpin.webp</div>
      </div>
      <div class="polaroid">
        <img src="/assets/drone/SpeedOver.webp" alt="Speed Over">
        <div class="caption">SpeedOver.webp</div>
      </div>
      <div class="polaroid">
        <img src="/assets/drone/ZoomOutClip.webp" alt="Zoom Out">
        <div class="caption">ZoomOutClip.webp</div>
      </div>
    </div>
    
    <div class="footer">
      <p>&copy; 2024 Connor Pagtakhan</p>
    </div>
  </div>
</template>

<style scoped>
.drone-container {
  background: #ECE9D8;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.gallery-header {
  background: #FFF;
  padding: 16px;
  border-bottom: 1px solid #ACA899;
}
.gallery-header h2 {
  margin: 0 0 4px 0;
  color: #0A246A;
}
.gallery-header p {
  margin: 0;
  color: #666;
  font-size: 11px;
}
.gallery-grid {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  overflow-y: auto;
  flex-grow: 1;
}
.polaroid {
  background: white;
  padding: 8px 8px 24px 8px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.polaroid img {
  max-height: 150px;
  border: 1px solid #333;
}
.caption {
  margin-top: 8px;
  font-family: 'Tahoma', sans-serif;
  font-size: 11px;
  color: #333;
}
.footer {
  text-align: center;
  padding: 8px;
  color: #666;
  font-size: 10px;
}
</style>