// ========================================
// GAME UTILITIES MODULE
// ========================================
// Shared utilities and state management for all games

import { getAppState, setStateValue } from '../../config/app-state.js';
import { showNotification } from '../../ui/notifications.js';

// Canvas confetti is loaded globally via CDN in index.html
export const confetti = window.confetti;

// Re-export showNotification so game modules can use it
export { showNotification };

// Game state
export let gamePlayers = [];
export let currentPlayerIndex = 0;
export let gameHistory = [];

// Game state object
export const gameState = {
    flipTimer: null,
    flipTime: 0,
    bestFlipTime: null,
    triviaScore: 0,
    currentTriviaIndex: 0,
    // Tournament state
    tournament: {
        teams: [],
        bracket: [],
        currentRound: 0,
        totalTeams: 0,
        rounds: []
    },
    // Beer Pong state
    beerPong: {
        currentMode: 'normal',
        team1Name: 'Team 1',
        team2Name: 'Team 2',
        specialCups: {
            team1: [],
            team2: []
        }
    },
    // Category state for games
    selectedCategory: 'classic'
};

// Utility functions for player management
export function setGamePlayers(players) {
    gamePlayers = players;
}

export function setCurrentPlayerIndex(index) {
    currentPlayerIndex = index;
}

export function addToGameHistory(item) {
    gameHistory.push(item);
}

export function clearGameHistory() {
    gameHistory = [];
}

// Common game utilities
export function getGameTitle(gameType) {
    const titles = {
        'never-have-i-ever': 'Never Have I Ever',
        'truth-or-dare': 'Truth or Dare',
        'kings-cup': "King's Cup",
        'beer-pong': 'Beer Pong',
        'flip-cup': 'Flip Cup',
        'trivia': 'Trivia',
        'would-you-rather': 'Would You Rather',
        'most-likely-to': 'Most Likely To',
        'spin-the-bottle': 'Spin the Bottle'
    };
    return titles[gameType] || 'Party Game';
}

export function formatTime(centiseconds) {
    const seconds = Math.floor(centiseconds / 100);
    const cs = centiseconds % 100;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

export function selectRandomPlayer() {
    if (gamePlayers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * gamePlayers.length);
    return gamePlayers[randomIndex];
}

export function startGame(gameType) {
    setStateValue('currentGame', gameType);
    
    const gameOverlay = document.createElement('div');
    gameOverlay.className = 'game-overlay';
    gameOverlay.id = 'gameOverlay';
    
    let gameContent = '';
    
    // Get game content based on type
    // This will be handled by individual game modules
    const gameModule = window.gameModules[gameType];
    if (gameModule && gameModule.createGame) {
        gameContent = gameModule.createGame();
    }
    
    gameOverlay.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">${getGameTitle(gameType)}</div>
                <div class="close-game" onclick="closeGame()">×</div>
            </div>
            ${gameContent}
        </div>
    `;
    
    document.body.appendChild(gameOverlay);
    setTimeout(() => gameOverlay.classList.add('show'), 10);
    
    // Initialize game
    if (gameModule && gameModule.initialize) {
        gameModule.initialize();
    }
    
    if (confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

export function closeGame() {
    const overlay = document.getElementById('gameOverlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 500);
    }
    setStateValue('currentGame', null);
}

// Player management functions
export function addPlayer() {
    const input = document.getElementById('playerNameInput');
    const playerName = input.value.trim();
    
    if (!playerName) {
        showNotification('Please enter a player name!', 'error');
        return;
    }
    
    if (gamePlayers.includes(playerName)) {
        showNotification('Player already added!', 'error');
        return;
    }
    
    gamePlayers.push(playerName);
    input.value = '';
    updatePlayersList();
    
    // Show start button if we have enough players
    if (gamePlayers.length >= 2) {
        document.getElementById('startGameBtn').style.display = 'block';
    }
    
    showNotification(`${playerName} added!`, 'success');
}

export function removePlayer(index) {
    const removedPlayer = gamePlayers[index];
    gamePlayers.splice(index, 1);
    updatePlayersList();
    
    if (gamePlayers.length < 2) {
        document.getElementById('startGameBtn').style.display = 'none';
    }
    
    showNotification(`${removedPlayer} removed!`, 'info');
}

export function updatePlayersList() {
    const playersList = document.getElementById('playersList');
    if (!playersList) return;
    
    playersList.innerHTML = gamePlayers.map((player, index) => `
        <div class="player-item">
            <span>${player}</span>
            <button class="btn btn-sm btn-danger" onclick="removePlayer(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

export function resetToPlayerSetup() {
    document.getElementById('gamePlay').style.display = 'none';
    document.getElementById('playerSetup').style.display = 'block';
    currentPlayerIndex = 0;
}

export function updateCurrentPlayer() {
    const currentPlayerEl = document.getElementById('currentPlayer');
    if (currentPlayerEl && gamePlayers.length > 0) {
        currentPlayerEl.textContent = gamePlayers[currentPlayerIndex];
    }
}

// Category management
export function selectGameCategory(category, gameType) {
    gameState.selectedCategory = category;
    
    // Hide category selection
    const categorySelection = document.getElementById('categorySelection');
    if (categorySelection) {
        categorySelection.style.display = 'none';
    }
    
    // Show appropriate next step
    const playerSetup = document.getElementById('playerSetup');
    const gamePlay = document.getElementById('gamePlay');
    
    if ((gameType === 'neverHaveIEver' || gameType === 'truthOrDare' || gameType === 'wouldYouRather' || gameType === 'mostLikelyTo' || gameType === 'spinBottle') && playerSetup) {
        playerSetup.style.display = 'block';
        // Update players list immediately if we have players
        updatePlayersList();
        // Show start button if we have enough players
        if (gamePlayers.length >= 2) {
            document.getElementById('startGameBtn').style.display = 'block';
        }
    } else if (gamePlay) {
        gamePlay.style.display = 'block';
        updateCategoryBadge();
    }
}

export function changeCategoryMidGame(gameType) {
    document.getElementById('gamePlay').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
}

export function updateCategoryBadge() {
    const badge = document.getElementById('categoryBadge');
    if (badge) {
        const categoryNames = {
            classic: 'Classic',
            gettingStarted: 'Getting Started',
            normal: 'Normal',
            spicy: 'Spicy 🔥',
            couples: 'Couples 💕'
        };
        badge.textContent = categoryNames[gameState.selectedCategory] || 'Classic';
        
        // Update badge color based on category
        badge.style.background = {
            classic: 'linear-gradient(45deg, #00ff88, #00d4ff)',
            gettingStarted: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
            normal: 'linear-gradient(45deg, #2196F3, #03A9F4)',
            spicy: 'linear-gradient(45deg, #ff0088, #ff4444)',
            couples: 'linear-gradient(45deg, #E91E63, #FF4081)'
        }[gameState.selectedCategory] || 'linear-gradient(45deg, #00ff88, #00d4ff)';
    }
}

// Initialize game modules storage
window.gameModules = window.gameModules || {};

// Make common functions globally available for onclick handlers
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.selectGameCategory = selectGameCategory;
window.changeCategoryMidGame = changeCategoryMidGame;
window.resetToPlayerSetup = resetToPlayerSetup;
window.closeGame = closeGame;