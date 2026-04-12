<template>
  <div class="drone-container">
    <div class="gallery-header">
      <h2>Connect 4: You vs Connor</h2>
      <p>Internet: {{ publicScore }} | Connor: {{ ownerScore }}</p>
    </div>
    
    <div class="gallery-grid">
      <div class="polaroid game-board">
        <div class="status-bar">
          <span v-if="currentTurn === 1">Your Turn!</span>
          <span v-else>Waiting for Connor...</span>
        </div>

        <div class="ascii-board">
          <pre>{{ cursorRow }}</pre>
          <div v-for="(row, rowIndex) in board" :key="rowIndex"> {{ formatRow(row) }} </div>
        </div>

        <div class="controls">
          <button @click="moveLeft" :disabled="currentTurn !== 1" class="drop-btn">&lt; Left</button>
          <button @click="dropPiece" :disabled="currentTurn !== 1" class="drop-btn">DROP</button>
          <button @click="moveRight" :disabled="currentTurn !== 1" class="drop-btn">Right &gt;</button>
        </div>
        
        <div class="caption">Internet plays as [X]. Connor plays as [O].</div>
      </div>
    </div>
    
    <!-- <div class="footer">
      <p>&copy; 2026 Connor Pagtakhan</p>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
const config = useRuntimeConfig()

// --- Config ---
const SUPABASE_URL = config.public.supabaseUrl;
const ANON_KEY = config.public.anonKey;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/connect4`;

// --- State ---
const board = ref(Array(6).fill(Array(7).fill(0)));
const currentTurn = ref(1);
const publicScore = ref(0);
const ownerScore = ref(0);
const selectedCol = ref(3); // Start in the middle
let pollInterval = null;

// --- Computed ---
// Creates a string like "      V      " to point at the selected column
const cursorRow = computed(() => {
  let row = ' ';
  for (let i = 0; i < 7; i++) {
    row += i === selectedCol.value ? ' V ' : '   ';
  }
  return row;
});

// --- Methods ---
const formatRow = (row) => {
  return row.map(cell => {
    if (cell === 1) return '[X]';
    if (cell === 2) return '[O]';
    return '[ ]';
  }).join('');
};

const moveLeft = () => { if (selectedCol.value > 0) selectedCol.value--; };
const moveRight = () => { if (selectedCol.value < 6) selectedCol.value++; };

const fetchBoardState = async () => {
  try {
    // Fetch directly from the database via REST API
    const response = await fetch(`${SUPABASE_URL}/rest/v1/game_state?id=eq.1&select=*`, {
      // headers: { 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` }
      // headers: { 'Authorization': `Bearer ${ANON_KEY}` }
      headers: { 'apikey': ANON_KEY }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      board.value = data[0].board;
      currentTurn.value = data[0].current_turn;
      publicScore.value = data[0].public_score;
      ownerScore.value = data[0].owner_score;
    }
  } catch (err) {
    console.error("Failed to fetch board:", err);
  }
};

const dropPiece = async () => {
  if (currentTurn.value !== 1) return;
  
  try {
    currentTurn.value = 0; 
    
    const response = await fetch(`${EDGE_FUNCTION_URL}?slot=${selectedCol.value}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'apikey': ANON_KEY, // <--- This was likely the missing piece!
        // 'Authorization': `Bearer ${ANON_KEY}` 
      }
    });
    
    // Check if the response is actually JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        if (result.won) alert("Public Wins!");
        await fetchBoardState(); 
      }
    } else {
      const text = await response.text();
      console.error("Unexpected response:", text);
    }
  } catch (err) {
    console.error("Move failed:", err);
  }
};

// --- Lifecycle ---
onMounted(() => {
  fetchBoardState();
  pollInterval = setInterval(fetchBoardState, 5000); // Poll every 5 seconds
});

onUnmounted(() => {
  clearInterval(pollInterval);
});
</script>

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
  font-weight: bold;
}
.gallery-grid {
  padding: 24px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  flex-grow: 1;
}
.polaroid {
  background: white;
  padding: 16px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  border: 1px solid #CCC;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Custom game styling */
.game-board {
  min-width: 300px;
}
.status-bar {
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #0A246A;
}
.ascii-board {
  background: #000;
  color: #0F0; /* Retro green terminal look */
  padding: 32px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
  /* margin: 0; */
  text-align: center;
}
.ascii-board pre {
  padding: 0;
  margin: 0;
  padding-right: 0.5rem;
}
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
button {
  padding: 6px 12px;
  font-family: 'Tahoma', sans-serif;
  font-size: 12px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.drop-btn {
  font-weight: bold;
  background-color: #ECE9D8;
  border-top: #bdbaae 2px solid;
  border-left: #bdbaae 2px solid;
}
.caption {
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