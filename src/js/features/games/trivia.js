// ========================================
// TRIVIA GAME MODULE
// ========================================

import { gameData } from './game-data.js';
import { 
    gameState,
    showNotification
} from './game-utils.js';

// Create Trivia game HTML
export function createTriviaGame() {
    return `
        <div class="question-card" id="gameQuestion">
            Click "Next Question" to start HSG Trivia!
        </div>
        <div id="triviaOptions" style="margin: 20px 0;"></div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="btn btn-primary" onclick="nextTrivia()">
                <i class="fas fa-arrow-right"></i> Next Question
            </button>
        </div>
        <div class="score-display">
            <div class="team-score">
                <div class="team-name">Score</div>
                <div class="team-points" id="triviaScore">0</div>
            </div>
        </div>
    `;
}

// Get next trivia question
export function nextTrivia() {
    const trivia = gameData.trivia;
    const current = trivia[gameState.currentTriviaIndex % trivia.length];
    
    document.getElementById('gameQuestion').textContent = current.question;
    
    const optionsHtml = current.options.map((option, index) => 
        `<button class="btn" style="width: 100%; margin: 10px 0;" onclick="answerTrivia(${index}, ${current.correct})">${option}</button>`
    ).join('');
    
    document.getElementById('triviaOptions').innerHTML = optionsHtml;
    gameState.currentTriviaIndex++;
}

// Answer trivia question
export function answerTrivia(selected, correct) {
    const buttons = document.getElementById('triviaOptions').querySelectorAll('button');
    
    if (selected === correct) {
        gameState.triviaScore++;
        document.getElementById('triviaScore').textContent = gameState.triviaScore;
        buttons[selected].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
        showNotification('✅ Correct! +1 point');
    } else {
        buttons[selected].style.background = 'linear-gradient(45deg, #ff4444, #ff0088)';
        buttons[correct].style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
        showNotification('❌ Wrong answer!');
    }
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Auto next question after 2 seconds
    setTimeout(nextTrivia, 2000);
}

// Initialize the game
export function initialize() {
    // Reset trivia state when switching to this game
    gameState.triviaScore = 0;
    gameState.currentTriviaIndex = 0;
}

// Register the module
window.gameModules = window.gameModules || {};
window.gameModules['trivia'] = {
    createGame: createTriviaGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.nextTrivia = nextTrivia;
window.answerTrivia = answerTrivia;