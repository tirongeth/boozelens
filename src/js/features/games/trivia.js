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
        <div id="categorySelection" style="display: block;">
            <div class="question-card" style="margin-bottom: 30px;">
                <h2 style="text-align: center; color: #00d4ff;">Choose Your Category</h2>
            </div>
            <div class="category-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0;">
                <button class="category-btn" onclick="selectCategory('sports')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #ff6b6b, #ee5a24); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-football-ball" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Sports</div>
                </button>
                <button class="category-btn" onclick="selectCategory('history')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #4834d4, #686de0); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-landmark" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">History</div>
                </button>
                <button class="category-btn" onclick="selectCategory('science')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #00d2d3, #01a3a4); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-flask" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Science</div>
                </button>
                <button class="category-btn" onclick="selectCategory('flags')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #f9ca24, #f0932b); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-flag" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Flags</div>
                </button>
                <button class="category-btn" onclick="selectCategory('economy')" style="padding: 30px; border-radius: 15px; background: linear-gradient(135deg, #6ab04c, #badc58); border: none; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-chart-line" style="font-size: 2em; margin-bottom: 10px; display: block;"></i>
                    <div style="font-weight: bold;">Economy</div>
                </button>
            </div>
        </div>
        <div id="triviaGame" style="display: none;">
            <div class="question-card" id="gameQuestion">
                Select a category to start!
            </div>
            <div id="triviaOptions" style="margin: 20px 0;"></div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="btn btn-primary" onclick="nextTrivia()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
                <button class="btn btn-secondary" onclick="backToCategories()" style="margin-left: 10px;">
                    <i class="fas fa-arrow-left"></i> Change Category
                </button>
            </div>
            <div class="score-display">
                <div class="team-score">
                    <div class="team-name">Score</div>
                    <div class="team-points" id="triviaScore">0</div>
                </div>
            </div>
        </div>
    `;
}

// Select category
export function selectCategory(category) {
    gameState.currentCategory = category;
    gameState.currentTriviaIndex = 0;
    
    // Hide category selection, show game
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('triviaGame').style.display = 'block';
    
    // Epic animation
    const categoryNames = {
        sports: '🏃 Sports',
        history: '📚 History', 
        science: '🔬 Science',
        flags: '🌍 Flags',
        economy: '💰 Economy'
    };
    
    showNotification(`Category: ${categoryNames[category]}`);
    nextTrivia();
}

// Go back to categories
export function backToCategories() {
    document.getElementById('categorySelection').style.display = 'block';
    document.getElementById('triviaGame').style.display = 'none';
    gameState.currentTriviaIndex = 0;
}

// Get next trivia question
export function nextTrivia() {
    const category = gameState.currentCategory || 'sports';
    const trivia = gameData.triviaCategories[category] || gameData.trivia;
    
    if (gameState.currentTriviaIndex >= trivia.length) {
        gameState.currentTriviaIndex = 0;
    }
    
    const current = trivia[gameState.currentTriviaIndex];
    
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
    gameState.currentCategory = null;
    
    // Reset UI to show categories
    const categoryEl = document.getElementById('categorySelection');
    const gameEl = document.getElementById('triviaGame');
    if (categoryEl) categoryEl.style.display = 'block';
    if (gameEl) gameEl.style.display = 'none';
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
window.selectCategory = selectCategory;
window.backToCategories = backToCategories;