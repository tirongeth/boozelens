// ========================================
// SPIN THE BOTTLE GAME MODULE
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
    selectGameCategory,
    changeCategoryMidGame,
    updateCategoryBadge,
    shufflePlayers,
    getRandomizedQuestion,
    resetQuestionQueue
} from './game-utils.js';

// Create Spin the Bottle game HTML
export function createSpinBottleGame() {
    return `
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'spinBottle')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'spinBottle')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'spinBottle')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'spinBottle')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'spinBottle')">
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
            <button class="btn btn-primary" onclick="startSpinBottle()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div style="text-align: center;">
                <div id="bottleContainer" style="font-size: 6em; margin: 20px 0; position: relative;">
                    🍾
                </div>
                <button class="btn btn-primary" onclick="spinBottle()">
                    <i class="fas fa-sync"></i> Spin the Bottle
                </button>
            </div>
            <div id="spinResult" style="margin: 30px 0; text-align: center;"></div>
            <div class="question-card" id="gameTask" style="display: none;">
                Task will appear here
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('spinBottle')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
        </div>
        
        <style>
            .category-badge {
                display: inline-block;
                padding: 5px 15px;
                background: linear-gradient(45deg, #00ff88, #00d4ff);
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
                color: #000;
                text-transform: uppercase;
            }
        </style>
    `;
}

// Start the game
export function startSpinBottle() {
    if (gamePlayers.length < 3) {
        showNotification('Add at least 3 players', 'error');
        return;
    }
    
    // Shuffle players for random order
    shufflePlayers();
    
    // Reset question queue for this category to ensure fresh randomization
    resetQuestionQueue('spinBottleTasks', gameState.selectedCategory);
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    setCurrentPlayerIndex(0);
    updateCategoryBadge();
}

// Spin the bottle
export function spinBottle() {
    const bottle = document.getElementById('bottleContainer');
    const spinner = gamePlayers[currentPlayerIndex];
    const otherPlayers = gamePlayers.filter((_, i) => i !== currentPlayerIndex);
    const target = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
    
    // Animate bottle spin
    bottle.style.transition = 'transform 2s ease-out';
    bottle.style.transform = `rotate(${720 + Math.random() * 360}deg)`;
    
    setTimeout(() => {
        // Show result
        document.getElementById('spinResult').innerHTML = `
            <h3>${spinner} → ${target}</h3>
        `;
        
        // Show random task
        const tasks = gameData.spinBottleTasks[gameState.selectedCategory] || gameData.spinBottleTasks.classic;
        const task = getRandomizedQuestion('spinBottleTasks', gameState.selectedCategory, tasks);
        
        document.getElementById('gameTask').textContent = task;
        document.getElementById('gameTask').style.display = 'block';
        
        // Next player's turn
        setCurrentPlayerIndex((currentPlayerIndex + 1) % gamePlayers.length);
        
        // Reset bottle
        setTimeout(() => {
            bottle.style.transition = 'none';
            bottle.style.transform = 'rotate(0deg)';
        }, 100);
    }, 2000);
}

// Initialize the game
export function initialize() {
    // Keep existing players when switching games
    updatePlayersList();
    // Show start button if we have enough players
    if (gamePlayers.length >= 3) {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
    }
    setCurrentPlayerIndex(0);
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['spin-the-bottle'] = {
    createGame: createSpinBottleGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.startSpinBottle = startSpinBottle;
window.spinBottle = spinBottle;