// ========================================
// MOST LIKELY TO GAME MODULE
// ========================================

import { gameData } from './game-data.js';
import { 
    gameState,
    gamePlayers,
    setGamePlayers,
    showNotification,
    addPlayer,
    removePlayer,
    updatePlayersList,
    resetToPlayerSetup,
    selectGameCategory,
    changeCategoryMidGame,
    updateCategoryBadge
} from './game-utils.js';

// Create Most Likely To game HTML
export function createMostLikelyToGame() {
    return `
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'mostLikelyTo')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'mostLikelyTo')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'mostLikelyTo')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'mostLikelyTo')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'mostLikelyTo')">
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
            <button class="btn btn-primary" onclick="startMostLikelyTo()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div style="text-align: center; margin-bottom: 20px;">
                <span class="category-badge" id="categoryBadge">Classic</span>
            </div>
            <div class="question-card" id="gameQuestion">
                Ready to start!
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <h3>Count to 3, then everyone point!</h3>
                <button class="btn btn-primary" onclick="showVotes()">
                    <i class="fas fa-eye"></i> Show Who Got Most Votes
                </button>
                <button class="btn" onclick="nextMostLikelyTo()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('mostLikelyTo')">
                    <i class="fas fa-sync"></i> Change Category
                </button>
            </div>
            <div id="votingPlayers" style="margin: 20px 0;"></div>
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
export function startMostLikelyTo() {
    if (gamePlayers.length < 3) {
        showNotification('Add at least 3 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    updateCategoryBadge();
    nextMostLikelyTo();
}

// Get next question
export function nextMostLikelyTo() {
    const questions = gameData.mostLikelyTo[gameState.selectedCategory] || gameData.mostLikelyTo.classic;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    document.getElementById('gameQuestion').textContent = question;
    
    // Show all players as voting options
    const votingDiv = document.getElementById('votingPlayers');
    votingDiv.innerHTML = `
        <h4>Players in the game:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
            ${gamePlayers.map(p => `
                <div style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border-radius: 10px; text-align: center;">
                    ${p}
                </div>
            `).join('')}
        </div>
    `;
}

// Show votes
export function showVotes() {
    showNotification('Person with most votes drinks! 🍻', 'info');
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
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['most-likely-to'] = {
    createGame: createMostLikelyToGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.startMostLikelyTo = startMostLikelyTo;
window.nextMostLikelyTo = nextMostLikelyTo;
window.showVotes = showVotes;