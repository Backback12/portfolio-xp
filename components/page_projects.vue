<template>
<d_window title="Projects" icon="/assets/system/newspaper.png">
  <div class="window-content">
  <h1>Personal Projects</h1>
  <p>Hi this is a page of my projects and stuff yeahhhh</p>
  
  
  <div class="project">
    <h3 class="title">Bodyguard (Game Jam) - 2020</h3>
    <div class="content">
      <ul>
        <li>Ludum Dare 46</li>
        <li>Theme: "Keep it Alive"</li>
        <li>https://alphaq.itch.io/bodyguard-ld46</li>
      </ul>
    </div>
  </div>

  
  <div class="project">
    <h3 class="title">Chimp Want Banana (Game Jam) - 2021</h3>
    <div class="content">
      <ul>
        <li>Brackeys Game Jam 2021.1</li>
        <li>Theme: "Stronger Together"</li>
        <li>https://alphaq.itch.io/chimp-want-banana</li>
      </ul>
    </div>
  </div>

  <div class="project">
    <h3 class="title">Arduino Gameboi - 2021</h3>
    <div class="content">
      <ul>
        <li>Arduino Gameboi - Fully 3D printed powered by Arduino Nano</li>
        <li>Arduino Nano, 128x64 OLED Display, 6 Buttons, Battery Powered</li>
      </ul>
      <img style="aspect-ratio: 3 / 2; object-fit: cover;" draggable="false" loading="lazy" src="/public/assets/projects/gameboi_0.jpg"/>
      <img style="aspect-ratio: 1 / 1; object-fit: cover;" draggable="false" loading="lazy" src="/public/assets/projects/gameboi_playthrough.webp"/>
    </div>
  </div>

  <div class="project">
    <h3 class="title">Custom Macropad - 2022</h3>
    <div class="content">
      <ul>
        <li>KiCad, PCB Manufacturing</li>
      </ul>
    </div>
  </div>

  <div class="project">
    <h3 class="title">CassettifyMixtape - 2023</h3>
    <div class="content">
      <ul>
        <li>View your Spotify top tracks on a cassette</li>
      </ul>
    </div>
  </div>

  <div class="project">
    <h3 class="title">CRT Audio Visualizer - 2025</h3>
    <div class="content">
      <ul>
        <li>ESP32, 13" CRT Display</li>
      </ul>
    </div>
  </div>

  <div class="project">
    <h3 class="title">Balance Bot - 2025-2026</h3>
    <div class="content">
      <div>
        <!-- Arduino Gameboi - Fully 3D printed powered by Arduino Nano
        <br>
        Arduino Nano, 128x64 OLED Display, 6 Buttons, Battery Powered -->
        <img style="aspect-ratio: 3 / 2; object-fit: cover;" draggable="false" loading="lazy" src="/public/assets/projects/balance-bot.png"/>
      </div>
    </div>
  </div>


</div>
</d_window>
</template>

<script setup>

</script>


<style scoped>
.window-content {
  padding: 8px;
  user-select: text;
}
.project {

}
.project .title {

}
.project .content {

}
.project .content img {
  max-width: 300px;
}

</style>