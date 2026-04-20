<template>
  <div class="title-container">
    <div class="banner">
      <!-- <img src="/assets/system/computer.png" alt="Computer Icon" class="main-icon" /> -->
      <div class="text-group">
        <h1 class="shadow-text">Connor Pagtakhan</h1>
        <h2 class="sub-text">Computer Engineering</h2>
      </div>
    </div>
    
    <div class="info-box">
      <p>Welcome to my web portfolio! Feel free to explore my projects and builds</p>
      <p><b>!!! WEBSITE IS A WORK IN PROGRESS !!!</b></p>
      <ul>
        <!-- <li><strong>Location:</strong> Winnipeg, MB</li> -->
        <!-- <li><strong>Focus:</strong> Embedded Systems, Control Theory, & Machine Learning</li> -->
      </ul>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #ECE9D8; /* Classic XP window background */
  height: 100%;
}
.banner {
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #0A246A 0%, #A6CAF0 100%);
  padding: 16px;
  color: white;
  border: 2px inset #FFF;
}
.main-icon {
  width: 64px;
  height: 64px;
  margin-right: 16px;
  image-rendering: pixelated;
}
.shadow-text {
  margin: 0;
  font-size: 24px;
  text-shadow: 2px 2px 2px #000;
}
.sub-text {
  margin: 0;
  font-size: 14px;
  font-weight: normal;
}
.info-box {
  background: white;
  border: 1px solid #ACA899;
  padding: 12px;
  font-size: 13px;
}
.info-box ul {
  padding-left: 20px;
  margin-top: 8px;
}
</style>