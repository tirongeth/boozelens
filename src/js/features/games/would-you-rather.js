// ========================================
// WOULD YOU RATHER GAME MODULE
// ========================================

import { gameData } from './game-data.js';
import { 
    gameState,
    gamePlayers,
    setGamePlayers,
    clearGameHistory,
    showNotification,
    addPlayer,
    removePlayer,
    updatePlayersList,
    resetToPlayerSetup,
    selectGameCategory,
    changeCategoryMidGame,
    updateCategoryBadge,
    shufflePlayers
} from './game-utils.js';

let currentWouldYouRatherVotes = { 0: [], 1: [] };

// Create Would You Rather game HTML
export function createWouldYouRatherGame() {
    return `
        <div id="categorySelection" style="display: block;">
            <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <button class="btn btn-primary" onclick="selectGameCategory('classic', 'wouldYouRather')">
                    <i class="fas fa-beer"></i> Classic
                </button>
                <button class="btn" onclick="selectGameCategory('gettingStarted', 'wouldYouRather')">
                    <i class="fas fa-play-circle"></i> Getting Started
                </button>
                <button class="btn" onclick="selectGameCategory('normal', 'wouldYouRather')">
                    <i class="fas fa-dice"></i> Normal
                </button>
                <button class="btn btn-danger" onclick="selectGameCategory('spicy', 'wouldYouRather')">
                    <i class="fas fa-fire"></i> Spicy
                </button>
                <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                    onclick="selectGameCategory('couples', 'wouldYouRather')">
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
            <button class="btn btn-primary" onclick="startWouldYouRather()" 
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
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                <button class="btn btn-primary" id="option1Btn" onclick="voteWouldYouRather(0)" style="padding: 20px;">
                    Option 1
                </button>
                <button class="btn btn-danger" id="option2Btn" onclick="voteWouldYouRather(1)" style="padding: 20px;">
                    Option 2
                </button>
            </div>
            <div id="voteResults" style="display: none; margin: 20px 0;"></div>
            <div style="text-align: center;">
                <button class="btn" onclick="nextWouldYouRather()" style="display: none;" id="nextQuestionBtn">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
                <button class="btn" onclick="changeCategoryMidGame('wouldYouRather')">
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
export function startWouldYouRather() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    // Shuffle players for random order
    shufflePlayers();
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    updateCategoryBadge();
    clearGameHistory();
    nextWouldYouRather();
}

// Get next question
export function nextWouldYouRather() {
    const questions = gameData.wouldYouRather[gameState.selectedCategory] || gameData.wouldYouRather.classic;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    // Split the question
    const parts = question.split(' or ');
    const option1 = parts[0].replace('Would you rather ', '');
    const option2 = parts[1] || parts[0];
    
    document.getElementById('gameQuestion').textContent = question;
    document.getElementById('option1Btn').textContent = option1;
    document.getElementById('option2Btn').textContent = option2;
    
    // Reset votes
    currentWouldYouRatherVotes = { 0: [], 1: [] };
    document.getElementById('voteResults').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'none';
    
    // Enable voting buttons
    document.getElementById('option1Btn').disabled = false;
    document.getElementById('option2Btn').disabled = false;
}

// Vote for an option
export function voteWouldYouRather(option) {
    // In a real multiplayer game, each player would vote
    // For now, show results after one vote
    document.getElementById('option1Btn').disabled = true;
    document.getElementById('option2Btn').disabled = true;
    
    // Show results
    const resultsDiv = document.getElementById('voteResults');
    resultsDiv.innerHTML = `
        <h3>Minority drinks! 🍺</h3>
        <p>In a real game, everyone votes and the minority drinks!</p>
    `;
    resultsDiv.style.display = 'block';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
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
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['would-you-rather'] = {
    createGame: createWouldYouRatherGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.startWouldYouRather = startWouldYouRather;
window.nextWouldYouRather = nextWouldYouRather;
window.voteWouldYouRather = voteWouldYouRather;