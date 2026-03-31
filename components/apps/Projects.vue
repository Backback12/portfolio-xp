<template>
  <div class="content-wrapper">
    <h1>Project Archives</h1>
    <p>A collection of hardware and software builds.</p>
    
    <div class="project-grid">
      <div class="card">
        <h3>Micromouse Robot</h3>
        <p>Computer Engineering Capstone Project.</p>
      </div>
      <div class="card">
        <h3>Gameboi</h3>
        <p>Arduino Nano</p>
      </div>
      <div class="card">
        <h3>LED Matrix Display</h3>
        <p>Raspberry Pi 64x64 RGB animations.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  padding: 16px;
  user-select: text;
}
.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}
.card {
  border: 2px inset #DDDDDD;
  padding: 8px;
  background: #f4f4f4;
}
</style>