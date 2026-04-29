// ============================================================
// FIREBASE CONFIG
// ============================================================
// Remplacez par vos propres credentials Firebase
// Allez sur https://console.firebase.google.com -> créer un projet
// Puis copier la config Web

const firebaseConfig = {
  apiKey: "AIzaSyDm3HvfygSwEwoU0AgOBmtePK10YM1AWq4",
  authDomain: "quimaster-47e01.firebaseapp.com",
  databaseURL: "https://quimaster-47e01.firebaseio.com",
  projectId: "quimaster-47e01",
  storageBucket: "quimaster-47e01.firebasestorage.app",
  messagingSenderId: "826062192341",
  appId: "1:826062192341:web:1200da673512e1778c6c5c",
  measurementId: "G-R1PJ1J6LQ6"
};

// Détecte si Firebase est configuré
const FIREBASE_CONFIGURED = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

let database = null;
if (FIREBASE_CONFIGURED) {
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
} else {
  console.warn('⚠️ Firebase non configuré. Utilisant localStorage (mode démo).');
}

// ============================================================
// HELPER FUNCTIONS FOR FIREBASE
// ============================================================

// Get all players
function getPlayersFromDB() {
  return new Promise((resolve) => {
    if (FIREBASE_CONFIGURED && database) {
      database.ref('players').once('value', (snapshot) => {
        resolve(snapshot.val() || {});
      });
    } else {
      // Fallback localStorage
      const players = JSON.parse(localStorage.getItem('qm_players') || '[]');
      const obj = {};
      players.forEach(p => obj[p.id] = p);
      resolve(obj);
    }
  });
}

// Save/update player
function savePlayerToDB(playerId, data) {
  if (FIREBASE_CONFIGURED && database) {
    return database.ref(`players/${playerId}`).set(data);
  } else {
    // Fallback localStorage
    return new Promise((resolve) => {
      const players = JSON.parse(localStorage.getItem('qm_players') || '[]');
      const idx = players.findIndex(p => p.id === playerId);
      if (idx !== -1) {
        players[idx] = data;
      } else {
        players.push(data);
      }
      localStorage.setItem('qm_players', JSON.stringify(players));
      resolve();
    });
  }
}

// Get game state
function getGameStateFromDB() {
  return new Promise((resolve) => {
    if (FIREBASE_CONFIGURED && database) {
      database.ref('gameState').once('value', (snapshot) => {
        resolve(snapshot.val() || { status: 'waiting' });
      });
    } else {
      // Fallback localStorage
      const gs = JSON.parse(localStorage.getItem('qm_game_state') || '{"status":"waiting"}');
      resolve(gs);
    }
  });
}

// Set game state
function setGameStateInDB(state) {
  if (FIREBASE_CONFIGURED && database) {
    return database.ref('gameState').set(state);
  } else {
    // Fallback localStorage
    return new Promise((resolve) => {
      localStorage.setItem('qm_game_state', JSON.stringify(state));
      resolve();
    });
  }
}

// Listen for real-time changes
function onPlayersChange(callback) {
  if (FIREBASE_CONFIGURED && database) {
    database.ref('players').on('value', (snapshot) => {
      callback(snapshot.val() || {});
    });
  } else {
    // Fallback: poll localStorage every 2 seconds
    setInterval(() => {
      const players = JSON.parse(localStorage.getItem('qm_players') || '[]');
      const obj = {};
      players.forEach(p => obj[p.id] = p);
      callback(obj);
    }, 2000);
  }
}

function onGameStateChange(callback) {
  if (FIREBASE_CONFIGURED && database) {
    database.ref('gameState').on('value', (snapshot) => {
      callback(snapshot.val() || { status: 'waiting' });
    });
  } else {
    // Fallback: poll localStorage every 2 seconds
    setInterval(() => {
      const gs = JSON.parse(localStorage.getItem('qm_game_state') || '{"status":"waiting"}');
      callback(gs);
    }, 2000);
  }
}

// Delete player
function deletePlayerFromDB(playerId) {
  if (FIREBASE_CONFIGURED && database) {
    return database.ref(`players/${playerId}`).remove();
  } else {
    // Fallback localStorage
    return new Promise((resolve) => {
      const players = JSON.parse(localStorage.getItem('qm_players') || '[]');
      const filtered = players.filter(p => p.id !== playerId.toString());
      localStorage.setItem('qm_players', JSON.stringify(filtered));
      resolve();
    });
  }
}

// Clear all data
function resetAllDB() {
  if (FIREBASE_CONFIGURED && database) {
    return database.ref().set({
      players: {},
      gameState: { status: 'waiting' }
    });
  } else {
    // Fallback localStorage
    return new Promise((resolve) => {
      localStorage.removeItem('qm_players');
      localStorage.setItem('qm_game_state', JSON.stringify({ status: 'waiting' }));
      resolve();
    });
  }
}

// Export CSV
function getAllPlayersForExport() {
  return new Promise((resolve) => {
    if (FIREBASE_CONFIGURED && database) {
      database.ref('players').once('value', (snapshot) => {
        const players = [];
        const data = snapshot.val() || {};
        Object.keys(data).forEach(key => {
          players.push(data[key]);
        });
        resolve(players.sort((a, b) => b.score - a.score));
      });
    } else {
      // Fallback localStorage
      const players = JSON.parse(localStorage.getItem('qm_players') || '[]');
      resolve(players.sort((a, b) => b.score - a.score));
    }
  });
}
