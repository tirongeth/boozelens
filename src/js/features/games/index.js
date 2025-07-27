// ========================================
// GAMES MODULE INDEX
// ========================================
// Main entry point for all game modules

// Import shared utilities
import { 
    startGame,
    closeGame,
    selectGameCategory,
    changeCategoryMidGame,
    addPlayer,
    removePlayer,
    resetToPlayerSetup
} from './game-utils.js';

// Import game data
import { gameData } from './game-data.js';

// Import all game modules
import './beer-pong.js';
import './never-have-i-ever.js';
import './truth-or-dare.js';
import './would-you-rather.js';
import './most-likely-to.js';
import './spin-bottle.js';
import './kings-cup.js';
import './flip-cup.js';
import './trivia.js';

// Re-export all functions that main.js uses
export { startGame, closeGame };

// Export all game-specific functions
export { 
    // Beer Pong
    showBeerPongRules,
    showBeerPongGame,
    showBeerPongTournament,
    setupTournament,
    startTournament,
    selectWinner,
    resetTournament,
    startNormalBeerPong,
    startSpecialBeerPong,
    selectSpecialBeerPongCategory,
    startGameWithNames,
    hitCup,
    closeRuleDisplay,
    resetSpecialGame,
    addScore,
    resetBeerPong
} from './beer-pong.js';

export {
    // Never Have I Ever
    startNeverHaveIEver,
    nextNeverHaveIEver
} from './never-have-i-ever.js';

export {
    // Truth or Dare
    startTruthOrDare,
    nextTurnTruthOrDare,
    showTruth,
    showDare
} from './truth-or-dare.js';

export {
    // Would You Rather
    startWouldYouRather,
    nextWouldYouRather,
    voteWouldYouRather
} from './would-you-rather.js';

export {
    // Most Likely To
    startMostLikelyTo,
    nextMostLikelyTo,
    showVotes
} from './most-likely-to.js';

export {
    // Spin the Bottle
    startSpinBottle,
    spinBottle
} from './spin-bottle.js';

export {
    // King's Cup
    drawCard
} from './kings-cup.js';

export {
    // Flip Cup
    toggleFlipTimer,
    resetFlipTimer
} from './flip-cup.js';

export {
    // Trivia
    nextTrivia,
    answerTrivia
} from './trivia.js';

// Export shared utilities that games.js was exporting
export { 
    selectGameCategory,
    changeCategoryMidGame,
    addPlayer,
    removePlayer,
    resetToPlayerSetup
};

// Make sure global functions are available for onclick handlers
// (This is already done in individual modules, but ensuring it here too)
window.closeGame = closeGame;