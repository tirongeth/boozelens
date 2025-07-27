// ========================================
// FLIP CUP GAME MODULE
// ========================================

import { 
    gameState,
    confetti,
    formatTime
} from './game-utils.js';

// Create Flip Cup game HTML
export function createFlipCupGame() {
    return `
        <div class="timer-display" id="flipTimer">00:00</div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" id="timerBtn" onclick="toggleFlipTimer()">
                <i class="fas fa-play"></i> Start Timer
            </button>
            <button class="btn" onclick="resetFlipTimer()">
                <i class="fas fa-redo"></i> Reset
            </button>
        </div>
        <div id="bestTime" style="text-align: center; font-size: 1.2em; margin-top: 20px;">
            Best Time: --:--
        </div>
        <div style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
            <h3 style="text-align: center; color: #00ff88;">How to Play Flip Cup</h3>
            <ol style="line-height: 1.8;">
                <li>🍺 Fill cup with drink (1/4 full)</li>
                <li>🏃 Drink the entire cup</li>
                <li>🔄 Place cup upside down on edge of table</li>
                <li>👆 Flip cup with one finger to land right-side up</li>
                <li>⏱️ Fastest time wins!</li>
            </ol>
        </div>
    `;
}

// Toggle timer
export function toggleFlipTimer() {
    const btn = document.getElementById('timerBtn');
    
    if (gameState.flipTimer) {
        clearInterval(gameState.flipTimer);
        gameState.flipTimer = null;
        btn.innerHTML = '<i class="fas fa-play"></i> Start Timer';
        
        if (!gameState.bestFlipTime || gameState.flipTime < gameState.bestFlipTime) {
            gameState.bestFlipTime = gameState.flipTime;
            document.getElementById('bestTime').textContent = `Best Time: ${formatTime(gameState.bestFlipTime)}`;
            if (confetti) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    } else {
        gameState.flipTime = 0;
        gameState.flipTimer = setInterval(() => {
            gameState.flipTime++;
            document.getElementById('flipTimer').textContent = formatTime(gameState.flipTime);
        }, 10);
        btn.innerHTML = '<i class="fas fa-pause"></i> Stop Timer';
    }
}

// Reset timer
export function resetFlipTimer() {
    if (gameState.flipTimer) {
        clearInterval(gameState.flipTimer);
        gameState.flipTimer = null;
    }
    gameState.flipTime = 0;
    document.getElementById('flipTimer').textContent = '00:00';
    document.getElementById('timerBtn').innerHTML = '<i class="fas fa-play"></i> Start Timer';
}

// Initialize the game
export function initialize() {
    // Reset timer when switching to this game
    if (gameState.flipTimer) {
        clearInterval(gameState.flipTimer);
        gameState.flipTimer = null;
    }
    gameState.flipTime = 0;
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['flip-cup'] = {
    createGame: createFlipCupGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.toggleFlipTimer = toggleFlipTimer;
window.resetFlipTimer = resetFlipTimer;