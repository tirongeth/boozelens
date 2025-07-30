// ========================================
// TRUTH OR DARE GAME MODULE
// ========================================

import { gameData } from './game-data.js';
import { 
    gameState,
    gamePlayers,
    setGamePlayers,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    showNotification,
    addPlayer,
    removePlayer,
    updatePlayersList,
    resetToPlayerSetup,
    updateCurrentPlayer,
    selectGameCategory,
    updateCategoryBadge,
    shufflePlayers
} from './game-utils.js';

// Create Truth or Dare game HTML
export function createTruthOrDareGame() {
    return `
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'truthOrDare')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'truthOrDare')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'truthOrDare')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'truthOrDare')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'truthOrDare')">
                    <i class="fas fa-heart"></i> Couples
                </button>
            </div>
        </div>
        
        <div id="playerSetup" style="display: none;">
            <h3 style="text-align: center; margin-bottom: 20px;">Add Players</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="playerNameInput" placeholder="Enter player name" 
                    style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;"
                    onkeypress="if(event.key==='Enter') addPlayer()">
                <button class="btn btn-primary" onclick="addPlayer()">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="playersList" style="margin-bottom: 20px;"></div>
            <button class="btn btn-primary" onclick="startTruthOrDare()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div id="currentPlayer" style="text-align: center; font-size: 2em; margin: 20px 0; color: #00ff88;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" style="margin: 10px; width: 120px;" onclick="showTruth()">
                    <i class="fas fa-comment"></i> Truth
                </button>
                <button class="btn btn-danger" style="margin: 10px; width: 120px;" onclick="showDare()">
                    <i class="fas fa-fire"></i> Dare
                </button>
            </div>
            <div class="question-card" id="gameQuestion">
                Choose Truth or Dare!
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="nextTurnTruthOrDare()" style="display: none;" id="nextTurnBtn">
                    <i class="fas fa-arrow-right"></i> Next Player
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('truthOrDare')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
        </div>
    `;
}

// Start the game
export function startTruthOrDare() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    // Shuffle players for random order
    shufflePlayers();
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    setCurrentPlayerIndex(0);
    updateCurrentPlayer();
    updateCategoryBadge();
}

// Next turn
export function nextTurnTruthOrDare() {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % gamePlayers.length);
    updateCurrentPlayer();
    document.getElementById('gameQuestion').textContent = 'Choose Truth or Dare!';
    document.getElementById('nextTurnBtn').style.display = 'none';
}

// Show truth
export function showTruth() {
    const truths = gameData.truths[gameState.selectedCategory] || gameData.truths.classic;
    const truth = truths[Math.floor(Math.random() * truths.length)];
    document.getElementById('gameQuestion').textContent = truth;
    document.getElementById('nextTurnBtn').style.display = 'inline-block';
}

// Show dare
export function showDare() {
    const dares = gameData.dares[gameState.selectedCategory] || gameData.dares.classic;
    const dare = dares[Math.floor(Math.random() * dares.length)];
    document.getElementById('gameQuestion').textContent = dare;
    document.getElementById('nextTurnBtn').style.display = 'inline-block';
}

// Initialize the game
export function initialize() {
    // Keep existing players when switching games
    updatePlayersList();
    // Show start button if we have enough players
    if (gamePlayers.length >= 2) {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
    }
    setCurrentPlayerIndex(0);
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['truth-or-dare'] = {
    createGame: createTruthOrDareGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.startTruthOrDare = startTruthOrDare;
window.nextTurnTruthOrDare = nextTurnTruthOrDare;
window.showTruth = showTruth;
window.showDare = showDare;