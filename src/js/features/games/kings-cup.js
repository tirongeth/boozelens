// ========================================
// KING'S CUP GAME MODULE
// ========================================

import { 
    gamePlayers,
    currentPlayerIndex,
    setCurrentPlayerIndex,
    showNotification,
    addPlayer,
    removePlayer,
    updatePlayersList,
    resetToPlayerSetup
} from './game-utils.js';

// Create King's Cup game HTML
export function createKingsCupGame() {
    return `
        <div id="playerSetup" style="display: block;">
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
            <button class="btn btn-primary" onclick="startKingsCup()" 
                style="width: 100%; display: none;" id="startGameBtn">
                <i class="fas fa-play"></i> Start Game
            </button>
        </div>
        
        <div id="gamePlay" style="display: none;">
            <div id="currentPlayer" style="text-align: center; font-size: 1.5em; margin: 10px 0; color: #00ff88;"></div>
            <div style="text-align: center;">
                <div style="font-size: 6em; margin: 20px 0;" id="currentCard">🎴</div>
                <button class="btn btn-primary" onclick="drawCard()">
                    <i class="fas fa-clone"></i> Draw Card
                </button>
            </div>
            <div class="question-card" id="gameQuestion">
                Click "Draw Card" to start!
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="resetToPlayerSetup()">
                    <i class="fas fa-users"></i> Change Players
                </button>
            </div>
        </div>
    `;
}

// Start the game
export function startKingsCup() {
    if (gamePlayers.length < 2) {
        showNotification('Add at least 2 players', 'error');
        return;
    }
    
    document.getElementById('playerSetup').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    setCurrentPlayerIndex(0);
    updateCurrentPlayerDisplay();
}

// Update current player display
function updateCurrentPlayerDisplay() {
    const currentPlayerEl = document.getElementById('currentPlayer');
    if (currentPlayerEl && gamePlayers.length > 0) {
        currentPlayerEl.textContent = `${gamePlayers[currentPlayerIndex]}'s Turn`;
    }
}

// Draw a card
export function drawCard() {
    const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    
    document.getElementById('currentCard').textContent = randomCard + randomSuit;
    
    const rules = {
        'A': '🍉 Waterfall - Everyone drinks!',
        '2': '👉 You - Choose someone to drink',
        '3': '👈 Me - You drink!',
        '4': '👯 Floor - Last to touch floor drinks',
        '5': '🙋 Guys - All guys drink',
        '6': '💃 Chicks - All girls drink',
        '7': '🌈 Heaven - Last to raise hand drinks',
        '8': '🤝 Mate - Choose a drinking buddy',
        '9': '🎵 Rhyme - Say a word, others rhyme',
        '10': '📏 Categories - Name things in category',
        'J': '👑 Make a Rule',
        'Q': '❓ Questions - Ask questions only',
        'K': '🏆 King\'s Cup - Pour into center cup'
    };
    
    document.getElementById('gameQuestion').textContent = rules[randomCard];
    
    // Move to next player
    setCurrentPlayerIndex((currentPlayerIndex + 1) % gamePlayers.length);
    updateCurrentPlayerDisplay();
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
window.gameModules['kings-cup'] = {
    createGame: createKingsCupGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.startKingsCup = startKingsCup;
window.drawCard = drawCard;