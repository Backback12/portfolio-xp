<template>
  <div class="content-wrapper">
    <div class="header">
      <img src="/assets/os/smtpsnap.dll_14_9032_1038-0.png" class="header-icon"/>
      <div>
        <h1 class="main-title">Achievements Log</h1>
        <p class="subtitle">Notable events, conferences, and competitions</p>
      </div>
    </div>
    
    <div class="accordion">
      <details class="xp-folder" open>
        <summary>Engineering Competitions & Conferences</summary>
        <div class="folder-content">
          <ul class="achievement-list">
            <li>
              <strong>UMEC 2022 & IEEExtreme 2022</strong> - Winnipeg, MB
              <img loading="lazy" src="/public/assets/blog/ieeex_2022_0.webp"/>
            </li>
            <li><strong>CUSEC 2023</strong> - Montreal, QB</li>
            <li>
              <strong>WEC 2024 & CEC 2024</strong>
              <div class="image-row">
                <img loading="lazy" src="/public/assets/blog/wec_2024.webp"/>
                <img loading="lazy" src="/public/assets/blog/cec_2024.webp"/>
              </div>
            </li>
            <li>
              <strong>CIRC 2024</strong> - Drumheller, AB
              <img loading="lazy" src="/public/assets/blog/circ_2024.webp"/>
            </li>
            <li><strong>UMEC 2024 & IEEExtreme 2024</strong> - Winnipeg, MB
              <img loading="lazy" src="/public/assets/blog/umec_2024.webp"/>
            </li>
            <li>
              <strong>CUSEC 2025</strong> - Montreal, QB
              <img loading="lazy" src="/public/assets/blog/cusec_2025.webp"/>
            </li>
            <li>
              <strong>WEC 2025 & CIRC 2025</strong>
              <div class="image-row">
                <img loading="lazy" src="/public/assets/blog/wec_2025.webp"/>
                <img loading="lazy" src="/public/assets/blog/circ_2025.webp"/>
              </div>
            </li>
            <li><strong>WEC 2026</strong> - Edmonton, AB</li>
            <li>
              <strong>UMake 2026</strong> - Winnipeg, MB<br/>
              <span class="sub-note">> Organized and hosted first hardware hackathon at University of Manitoba</span>
              <img loading="lazy" src="/public/assets/blog/umake_2026_1.webp"/>
            </li>
            <li><strong>RoboWars 2026</strong> - Montreal, QB</li>
            <li><strong>CIRC 2026</strong> - Drumheller, AB</li>
          </ul>
        </div>
      </details>

      <details class="xp-folder">
        <summary>Leadership Roles</summary>
        <div class="folder-content">
          <ul class="role-list">
            <li><strong>University of Manitoba Robotics Team (UMRT)</strong> - Co-Founder</li>
            <li><strong>University of Manitoba Robotics Team (UMRT)</strong> - Treasurer</li>
            <li><strong>University of Manitoba Robotics Team (UMRT)</strong> - Webmaster</li>
            <li><strong>University of Manitoba Robotics Team (UMRT)</strong> - Communications Operations Lead</li>
            <li><strong>UMIEEE</strong> - Treasurer</li>
            <li><strong>UMIEEE</strong> - Webmaster</li>
          </ul>
        </div>
      </details>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  /* padding: 16px; */
  user-select: text;
  background-color: #ECE9D8;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 2px solid #808080;
  padding: 12px 0;
}
.header-icon {
  width: 48px;
  height: 48px;
  margin-left: 16px;
  margin-right: 16px;
}
.main-title {
  margin: 0;
  font-size: 20px;
}
.subtitle {
  margin: 0;
  color: #666;
}

/* XP Folder Accordion Style */
.xp-folder {
  margin-bottom: 12px;
  border: 1px solid #ACA899;
  background: #FFF;
}
.xp-folder summary {
  background: linear-gradient(90deg, #EAE8E3 0%, #D8D2BD 100%);
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid #ACA899;
}
.folder-content {
  padding: 16px;
  background: #FFF;
}

/* Images and Lists */
.achievement-list li, .role-list li {
  margin-bottom: 16px;
  line-height: 1.4;
}
.sub-note {
  font-style: italic;
  color: #555;
  font-size: 11px;
}
.image-row {
  display: flex;
  gap: 8px;
}
.accordion img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  height: 80px;
  max-width: 300px;
  display: block;
  margin-top: 8px;
  border: 1px solid #000;
}
</style>