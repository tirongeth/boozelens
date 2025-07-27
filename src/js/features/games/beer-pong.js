// ========================================
// BEER PONG GAME MODULE
// ========================================

import { gameData } from './game-data.js';
import { 
    gameState, 
    confetti, 
    showNotification,
    getGameTitle 
} from './game-utils.js';
import { getAppState, setStateValue } from '../../config/app-state.js';

// Beer Pong specific functions
export function createBeerPongGame() {
    return `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-flex; background: rgba(255,255,255,0.1); border-radius: 30px; padding: 5px;">
                <button class="btn" id="standardRulesBtn" onclick="showBeerPongRules('standard')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    📜 Standard Rules
                </button>
                <button class="btn" id="creatorRulesBtn" onclick="showBeerPongRules('creator')" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🎯 Creator's Rules
                </button>
                <button class="btn btn-primary" id="playGameBtn" onclick="showBeerPongGame()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏓 Play Game
                </button>
                <button class="btn" id="tournamentBtn" onclick="showBeerPongTournament()" 
                    style="padding: 10px 20px; border-radius: 25px; margin: 0;">
                    🏆 Tournament
                </button>
            </div>
        </div>
        
        <div id="beerPongRules" style="display: none; max-height: 400px; overflow-y: auto; padding: 20px; 
            background: rgba(0,0,0,0.3); border-radius: 15px; margin-bottom: 20px;">
        </div>
        
        <div id="beerPongGame" style="display: block;">
            <div id="gameModeSelection" style="display: block;">
                <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Game Mode</h3>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="startNormalBeerPong()" 
                        style="padding: 20px 30px; font-size: 1.1em;">
                        <i class="fas fa-beer"></i> Normal Beer Pong
                    </button>
                    <button class="btn btn-danger" onclick="startSpecialBeerPong()" 
                        style="padding: 20px 30px; font-size: 1.1em;">
                        <i class="fas fa-dice"></i> Special Beer Pong
                    </button>
                </div>
                <p style="text-align: center; margin-top: 20px; opacity: 0.7;">
                    Special mode: Each cup has a dare or rule!
                </p>
            </div>
            
            <div id="teamNameSetup" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">Name Your Teams</h3>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                    <div>
                        <label>Team 1:</label>
                        <input type="text" id="team1NameInput" placeholder="Enter team name" 
                            style="padding: 10px; background: rgba(255,255,255,0.1); 
                            border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                            color: white; width: 200px; margin-left: 10px;" value="Team 1">
                    </div>
                    <div>
                        <label>Team 2:</label>
                        <input type="text" id="team2NameInput" placeholder="Enter team name" 
                            style="padding: 10px; background: rgba(255,255,255,0.1); 
                            border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                            color: white; width: 200px; margin-left: 10px;" value="Team 2">
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="startGameWithNames()" style="padding: 10px 30px;">
                        <i class="fas fa-play"></i> Start Game
                    </button>
                </div>
            </div>
            
            <div id="normalGamePlay" style="display: none;">
                <div class="score-display">
                    <div class="team-score">
                        <div class="team-name" id="team1Display">Team 1</div>
                        <div class="team-points" id="team1Score">0</div>
                        <button class="btn" onclick="addScore('team1')">+1</button>
                    </div>
                    <div class="team-score">
                        <div class="team-name" id="team2Display">Team 2</div>
                        <div class="team-points" id="team2Score">0</div>
                        <button class="btn" onclick="addScore('team2')">+1</button>
                    </div>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <button class="btn btn-primary" onclick="resetBeerPong()">
                        <i class="fas fa-redo"></i> New Game
                    </button>
                </div>
                <div id="gameStatus" style="text-align: center; font-size: 1.5em; margin-top: 20px;"></div>
            </div>
            
            <div id="specialGamePlay" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">
                    <span id="specialTeam1Name">Team 1</span> vs <span id="specialTeam2Name">Team 2</span>
                </h3>
                <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 40px;">
                    <div id="team1Cups" style="text-align: center;">
                        <h4 id="specialTeam1Display">Team 1</h4>
                        <div class="cup-formation" style="margin-top: 20px;">
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 3em;">🏓</div>
                        <button class="btn btn-primary" onclick="resetSpecialGame()" style="margin-top: 20px;">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>
                    <div id="team2Cups" style="text-align: center;">
                        <h4 id="specialTeam2Display">Team 2</h4>
                        <div class="cup-formation" style="margin-top: 20px;">
                        </div>
                    </div>
                </div>
                <div id="ruleDisplay" style="display: none; margin-top: 30px; text-align: center; 
                    padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;">
                </div>
            </div>
        </div>
        
        <div id="beerPongTournament" style="display: none;">
            <div id="tournamentSetup" style="display: block;">
                <h3 style="text-align: center; margin-bottom: 20px;">🏆 Tournament Setup</h3>
                <div style="text-align: center; margin-bottom: 30px;">
                    <p style="margin-bottom: 15px;">Select number of teams:</p>
                    <div style="display: flex; justify-content: center; gap: 20px;">
                        <button class="btn btn-primary" onclick="setupTournament(4)" style="padding: 15px 30px;">
                            4 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(8)" style="padding: 15px 30px;">
                            8 Teams
                        </button>
                        <button class="btn btn-primary" onclick="setupTournament(16)" style="padding: 15px 30px;">
                            16 Teams
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="teamNaming" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">Name Your Teams</h3>
                <div id="teamInputs" style="max-height: 400px; overflow-y: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="startTournament()" style="padding: 10px 30px;">
                        <i class="fas fa-trophy"></i> Start Tournament
                    </button>
                </div>
            </div>
            
            <div id="tournamentBracket" style="display: none;">
                <h3 style="text-align: center; margin-bottom: 20px;">
                    <span id="tournamentRoundTitle">Tournament Bracket</span>
                </h3>
                <div id="bracketDisplay" style="overflow-x: auto; padding: 20px;">
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn" onclick="resetTournament()" style="padding: 10px 20px;">
                        <i class="fas fa-redo"></i> New Tournament
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function showBeerPongRules(type) {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    const rules = gameData.beerPongRules[type];
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.remove('btn-primary');
    document.getElementById('tournamentBtn').classList.remove('btn-primary');
    
    document.getElementById(`${type}RulesBtn`).classList.add('btn-primary');
    
    // Hide others, show rules
    gameDiv.style.display = 'none';
    tournamentDiv.style.display = 'none';
    rulesDiv.style.display = 'block';
    
    // Display rules with fun animations
    rulesDiv.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 10px;">${rules.title}</h2>
        <p style="text-align: center; opacity: 0.8; margin-bottom: 20px;">${rules.description}</p>
        <div style="display: grid; gap: 15px;">
            ${rules.rules.map((rule, index) => `
                <div class="rule-item" style="background: rgba(255,255,255,0.05); padding: 15px; 
                    border-radius: 10px; border-left: 3px solid ${type === 'creator' ? '#00ff88' : '#00d4ff'};
                    animation: slideIn 0.3s ease-out ${index * 0.05}s both;">
                    <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px;">
                        ${rule.name}
                    </div>
                    <div style="opacity: 0.9; line-height: 1.4;">
                        ${rule.desc}
                    </div>
                </div>
            `).join('')}
        </div>
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
    `;
    
    if (confetti && type === 'creator') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.2 },
            colors: ['#00ff88', '#00d4ff', '#ff0088']
        });
    }
}

export function showBeerPongGame() {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.add('btn-primary');
    document.getElementById('tournamentBtn').classList.remove('btn-primary');
    
    // Hide others, show game
    rulesDiv.style.display = 'none';
    tournamentDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    
    // Reset to mode selection
    document.getElementById('gameModeSelection').style.display = 'block';
    document.getElementById('teamNameSetup').style.display = 'none';
    document.getElementById('normalGamePlay').style.display = 'none';
    document.getElementById('specialGamePlay').style.display = 'none';
}

export function showBeerPongTournament() {
    const rulesDiv = document.getElementById('beerPongRules');
    const gameDiv = document.getElementById('beerPongGame');
    const tournamentDiv = document.getElementById('beerPongTournament');
    
    // Update button styles
    document.getElementById('standardRulesBtn').classList.remove('btn-primary');
    document.getElementById('creatorRulesBtn').classList.remove('btn-primary');
    document.getElementById('playGameBtn').classList.remove('btn-primary');
    document.getElementById('tournamentBtn').classList.add('btn-primary');
    
    // Hide others, show tournament
    rulesDiv.style.display = 'none';
    gameDiv.style.display = 'none';
    tournamentDiv.style.display = 'block';
    
    // Reset to setup screen
    document.getElementById('tournamentSetup').style.display = 'block';
    document.getElementById('teamNaming').style.display = 'none';
    document.getElementById('tournamentBracket').style.display = 'none';
}

export function setupTournament(numTeams) {
    gameState.tournament.totalTeams = numTeams;
    gameState.tournament.teams = [];
    gameState.tournament.bracket = [];
    gameState.tournament.currentRound = 0;
    
    // Show team naming screen
    document.getElementById('tournamentSetup').style.display = 'none';
    document.getElementById('teamNaming').style.display = 'block';
    
    // Create team input fields
    const teamInputsDiv = document.getElementById('teamInputs');
    teamInputsDiv.innerHTML = '';
    
    for (let i = 1; i <= numTeams; i++) {
        teamInputsDiv.innerHTML += `
            <div style="margin-bottom: 15px;">
                <label style="display: inline-block; width: 100px;">Team ${i}:</label>
                <input type="text" id="team${i}Name" placeholder="Enter team name" 
                    style="padding: 10px; background: rgba(255,255,255,0.1); 
                    border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; 
                    color: white; width: 250px;" value="Team ${i}">
            </div>
        `;
    }
    
    if (confetti) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF6347']
        });
    }
}

export function startTournament() {
    const numTeams = gameState.tournament.totalTeams;
    gameState.tournament.teams = [];
    
    // Collect team names
    for (let i = 1; i <= numTeams; i++) {
        const teamName = document.getElementById(`team${i}Name`).value.trim() || `Team ${i}`;
        gameState.tournament.teams.push({
            id: i,
            name: teamName,
            eliminated: false
        });
    }
    
    // Create initial bracket
    createTournamentBracket();
    
    // Show bracket screen
    document.getElementById('teamNaming').style.display = 'none';
    document.getElementById('tournamentBracket').style.display = 'block';
    
    // Display the bracket
    displayTournamentBracket();
}

function createTournamentBracket() {
    const teams = [...gameState.tournament.teams];
    const rounds = [];
    let currentRoundMatches = [];
    
    // Create first round matches
    for (let i = 0; i < teams.length; i += 2) {
        currentRoundMatches.push({
            team1: teams[i],
            team2: teams[i + 1],
            winner: null,
            matchId: `R1M${Math.floor(i/2) + 1}`
        });
    }
    rounds.push(currentRoundMatches);
    
    // Calculate subsequent rounds
    let roundNumber = 2;
    while (currentRoundMatches.length > 1) {
        const nextRoundMatches = [];
        for (let i = 0; i < currentRoundMatches.length; i += 2) {
            nextRoundMatches.push({
                team1: null, // Will be filled by winner
                team2: null, // Will be filled by winner
                winner: null,
                matchId: `R${roundNumber}M${Math.floor(i/2) + 1}`,
                previousMatch1: currentRoundMatches[i].matchId,
                previousMatch2: currentRoundMatches[i + 1] ? currentRoundMatches[i + 1].matchId : null
            });
        }
        rounds.push(nextRoundMatches);
        currentRoundMatches = nextRoundMatches;
        roundNumber++;
    }
    
    gameState.tournament.rounds = rounds;
}

function displayTournamentBracket() {
    const bracketDiv = document.getElementById('bracketDisplay');
    const rounds = gameState.tournament.rounds;
    
    // Create responsive bracket display
    let bracketHTML = '<div style="display: flex; gap: 50px; align-items: center; min-width: max-content;">';
    
    rounds.forEach((round, roundIndex) => {
        const roundName = getRoundName(roundIndex, rounds.length);
        bracketHTML += `
            <div style="flex-shrink: 0;">
                <h4 style="text-align: center; margin-bottom: 20px; color: #00ff88;">${roundName}</h4>
                <div style="display: flex; flex-direction: column; gap: ${30 * (roundIndex + 1)}px;">
        `;
        
        round.forEach(match => {
            const team1Name = match.team1 ? match.team1.name : 'TBD';
            const team2Name = match.team2 ? match.team2.name : 'TBD';
            const canSelectWinner = match.team1 && match.team2 && !match.winner;
            
            bracketHTML += `
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;
                    border: 2px solid ${match.winner ? '#00ff88' : 'rgba(255,255,255,0.2)'};">
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                            <span style="${match.winner === match.team1 ? 'color: #00ff88; font-weight: bold;' : ''}">${team1Name}</span>
                            ${canSelectWinner ? `<button class="btn btn-sm" onclick="selectWinner('${match.matchId}', 1)" style="padding: 5px 10px;">Win</button>` : ''}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="${match.winner === match.team2 ? 'color: #00ff88; font-weight: bold;' : ''}">${team2Name}</span>
                            ${canSelectWinner ? `<button class="btn btn-sm" onclick="selectWinner('${match.matchId}', 2)" style="padding: 5px 10px;">Win</button>` : ''}
                        </div>
                    </div>
                    ${match.winner ? `<div style="text-align: center; font-size: 0.9em; color: #00ff88;">Winner: ${match.winner.name}</div>` : ''}
                </div>
            `;
        });
        
        bracketHTML += '</div></div>';
    });
    
    bracketHTML += '</div>';
    bracketDiv.innerHTML = bracketHTML;
    
    // Update round title
    updateRoundTitle();
}

function getRoundName(roundIndex, totalRounds) {
    if (roundIndex === totalRounds - 1) return '🏆 FINAL';
    if (roundIndex === totalRounds - 2) return '🥈 Semi-Finals';
    if (roundIndex === totalRounds - 3) return '🥉 Quarter-Finals';
    return `Round ${roundIndex + 1}`;
}

export function selectWinner(matchId, teamNumber) {
    const rounds = gameState.tournament.rounds;
    
    // Find the match
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
        const match = rounds[roundIndex].find(m => m.matchId === matchId);
        if (match) {
            // Set winner
            match.winner = teamNumber === 1 ? match.team1 : match.team2;
            
            // Advance winner to next round
            if (roundIndex < rounds.length - 1) {
                const nextRound = rounds[roundIndex + 1];
                const nextMatch = nextRound.find(m => 
                    m.previousMatch1 === matchId || m.previousMatch2 === matchId
                );
                
                if (nextMatch) {
                    if (nextMatch.previousMatch1 === matchId) {
                        nextMatch.team1 = match.winner;
                    } else {
                        nextMatch.team2 = match.winner;
                    }
                }
            }
            
            // Check if tournament is complete
            if (roundIndex === rounds.length - 1) {
                // Final match completed!
                showTournamentWinner(match.winner);
            }
            
            break;
        }
    }
    
    // Redisplay bracket
    displayTournamentBracket();
}

function showTournamentWinner(winner) {
    const bracketDiv = document.getElementById('bracketDisplay');
    
    // Epic winner announcement
    bracketDiv.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">CHAMPIONS!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${winner.name}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Congratulations on winning the Beer Pong Tournament!
            </p>
        </div>
    `;
    
    // Epic confetti
    if (confetti) {
        // Multiple bursts for epic effect
        const colors = ['#FFD700', '#FFA500', '#FF6347', '#00ff88', '#00d4ff'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { x: Math.random(), y: Math.random() * 0.5 },
                    colors: colors
                });
            }, i * 200);
        }
    }
}

function updateRoundTitle() {
    const rounds = gameState.tournament.rounds;
    let currentRoundIndex = 0;
    
    // Find current round (first round with incomplete matches)
    for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].some(match => match.team1 && match.team2 && !match.winner)) {
            currentRoundIndex = i;
            break;
        }
    }
    
    const roundName = getRoundName(currentRoundIndex, rounds.length);
    document.getElementById('tournamentRoundTitle').textContent = `${roundName} - Beer Pong Tournament`;
}

export function resetTournament() {
    gameState.tournament = {
        teams: [],
        bracket: [],
        currentRound: 0,
        totalTeams: 0,
        rounds: []
    };
    
    showBeerPongTournament();
}

// Normal & Special Mode Functions
export function startNormalBeerPong() {
    gameState.beerPong.currentMode = 'normal';
    document.getElementById('gameModeSelection').style.display = 'none';
    document.getElementById('teamNameSetup').style.display = 'block';
}

export function startSpecialBeerPong() {
    gameState.beerPong.currentMode = 'special';
    document.getElementById('gameModeSelection').style.display = 'none';
    
    // Show category selection first
    const categoryDiv = document.createElement('div');
    categoryDiv.id = 'specialCategorySelection';
    categoryDiv.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 20px;">Choose Your Vibe</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px;">
            <button class="btn btn-primary" onclick="selectSpecialBeerPongCategory('classic')">
                <i class="fas fa-beer"></i> Classic
            </button>
            <button class="btn" onclick="selectSpecialBeerPongCategory('gettingStarted')">
                <i class="fas fa-play-circle"></i> Getting Started
            </button>
            <button class="btn" onclick="selectSpecialBeerPongCategory('normal')">
                <i class="fas fa-dice"></i> Normal
            </button>
            <button class="btn btn-danger" onclick="selectSpecialBeerPongCategory('spicy')">
                <i class="fas fa-fire"></i> Spicy
            </button>
            <button class="btn" style="background: linear-gradient(45deg, #ff0088, #ff4444);" 
                onclick="selectSpecialBeerPongCategory('couples')">
                <i class="fas fa-heart"></i> Couples
            </button>
        </div>
    `;
    
    const gameDiv = document.getElementById('beerPongGame');
    if (document.getElementById('specialCategorySelection')) {
        document.getElementById('specialCategorySelection').remove();
    }
    gameDiv.insertBefore(categoryDiv, gameDiv.firstChild);
}

export function selectSpecialBeerPongCategory(category) {
    gameState.selectedCategory = category;
    document.getElementById('specialCategorySelection').style.display = 'none';
    document.getElementById('teamNameSetup').style.display = 'block';
}

export function startGameWithNames() {
    // Get team names
    const team1Name = document.getElementById('team1NameInput').value.trim() || 'Team 1';
    const team2Name = document.getElementById('team2NameInput').value.trim() || 'Team 2';
    
    gameState.beerPong.team1Name = team1Name;
    gameState.beerPong.team2Name = team2Name;
    
    document.getElementById('teamNameSetup').style.display = 'none';
    
    if (gameState.beerPong.currentMode === 'normal') {
        // Update normal game display
        document.getElementById('team1Display').textContent = team1Name;
        document.getElementById('team2Display').textContent = team2Name;
        document.getElementById('normalGamePlay').style.display = 'block';
    } else {
        // Initialize special game
        initializeSpecialGame(team1Name, team2Name);
        document.getElementById('specialGamePlay').style.display = 'block';
    }
}

function initializeSpecialGame(team1Name, team2Name) {
    // Update team names
    document.getElementById('specialTeam1Name').textContent = team1Name;
    document.getElementById('specialTeam2Name').textContent = team2Name;
    document.getElementById('specialTeam1Display').textContent = team1Name;
    document.getElementById('specialTeam2Display').textContent = team2Name;
    
    // Initialize cups for both teams
    gameState.beerPong.specialCups.team1 = createCupFormation('team1');
    gameState.beerPong.specialCups.team2 = createCupFormation('team2');
    
    // Display cups
    displayCupFormation('team1');
    displayCupFormation('team2');
}

function createCupFormation(team) {
    const cups = [];
    const rules = gameData.specialBeerPongRules[gameState.selectedCategory] || gameData.specialBeerPongRules.classic;
    const dares = gameData.specialBeerPongDares[gameState.selectedCategory] || gameData.specialBeerPongDares.classic;
    
    // Create 10 cups with random rules/dares
    for (let i = 0; i < 10; i++) {
        const isRule = Math.random() > 0.5;
        const content = isRule 
            ? rules[Math.floor(Math.random() * rules.length)]
            : dares[Math.floor(Math.random() * dares.length)];
        
        cups.push({
            id: `${team}-cup-${i}`,
            active: true,
            type: isRule ? 'rule' : 'dare',
            content: content
        });
    }
    return cups;
}

function displayCupFormation(team) {
    const cups = gameState.beerPong.specialCups[team];
    const container = document.querySelector(`#${team}Cups .cup-formation`);
    
    // Create pyramid formation (4-3-2-1)
    const rows = [4, 3, 2, 1];
    let cupIndex = 0;
    let formationHTML = '';
    
    rows.forEach((cupsInRow, rowIndex) => {
        formationHTML += `<div style="display: flex; justify-content: center; margin-bottom: 5px;">`;
        for (let i = 0; i < cupsInRow; i++) {
            const cup = cups[cupIndex];
            const cupStyle = cup.active 
                ? 'font-size: 2.5em; cursor: pointer; margin: 0 5px; transition: transform 0.2s;'
                : 'font-size: 2.5em; margin: 0 5px; opacity: 0.3;';
            
            formationHTML += `
                <span id="${cup.id}" 
                    style="${cupStyle}" 
                    onclick="${cup.active ? `hitCup('${team}', ${cupIndex})` : ''}"
                    onmouseover="this.style.transform='scale(1.1)'"
                    onmouseout="this.style.transform='scale(1)'">
                    ${cup.active ? '🥤' : '💨'}
                </span>
            `;
            cupIndex++;
        }
        formationHTML += '</div>';
    });
    
    container.innerHTML = formationHTML;
}

export function hitCup(team, cupIndex) {
    const cup = gameState.beerPong.specialCups[team][cupIndex];
    if (!cup.active) return;
    
    // Mark cup as hit
    cup.active = false;
    
    // Display the rule/dare
    const ruleDisplay = document.getElementById('ruleDisplay');
    ruleDisplay.style.display = 'block';
    ruleDisplay.innerHTML = `
        <h3 style="color: ${cup.type === 'rule' ? '#00ff88' : '#ff0088'};">
            ${cup.type === 'rule' ? '📜 NEW RULE!' : '🎯 DARE TIME!'}
        </h3>
        <p style="font-size: 1.3em; margin: 20px 0;">
            ${cup.content}
        </p>
        <button class="btn btn-primary" onclick="closeRuleDisplay()">
            Got it!
        </button>
    `;
    
    // Redisplay cups
    displayCupFormation(team);
    
    // Check for winner
    const activeCups = gameState.beerPong.specialCups[team].filter(c => c.active).length;
    if (activeCups === 0) {
        showSpecialGameWinner(team === 'team1' ? gameState.beerPong.team2Name : gameState.beerPong.team1Name);
    }
    
    // Confetti for hits
    if (confetti) {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: cup.type === 'rule' ? ['#00ff88', '#00d4ff'] : ['#ff0088', '#ff4444']
        });
    }
}

export function closeRuleDisplay() {
    document.getElementById('ruleDisplay').style.display = 'none';
}

function showSpecialGameWinner(winnerName) {
    document.getElementById('specialGamePlay').innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <div style="font-size: 6em; margin-bottom: 20px;">🏆</div>
            <h1 style="font-size: 3em; color: #FFD700; margin-bottom: 20px;">WINNER!</h1>
            <h2 style="font-size: 2em; color: #00ff88;">${winnerName}</h2>
            <p style="font-size: 1.2em; margin-top: 30px; opacity: 0.8;">
                Conquered Special Beer Pong!
            </p>
            <button class="btn btn-primary" onclick="resetBeerPong()" style="margin-top: 30px;">
                <i class="fas fa-redo"></i> Play Again
            </button>
        </div>
    `;
    
    // Epic confetti
    if (confetti) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x: Math.random(), y: Math.random() * 0.5 }
                });
            }, i * 300);
        }
    }
}

export function resetSpecialGame() {
    initializeSpecialGame(gameState.beerPong.team1Name, gameState.beerPong.team2Name);
    document.getElementById('ruleDisplay').style.display = 'none';
}

// Score management
export function addScore(team) {
    let gameScores = getAppState().gameScores || { team1: 0, team2: 0 };
    gameScores[team]++;
    setStateValue('gameScores', gameScores);
    updateBeerPongScore();
    
    if (gameScores[team] >= 10) {
        document.getElementById('gameStatus').textContent = `${team === 'team1' ? 'Team 1' : 'Team 2'} Wins! 🏆`;
        if (confetti) {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }
}

function updateBeerPongScore() {
    const gameScores = getAppState().gameScores || { team1: 0, team2: 0 };
    document.getElementById('team1Score').textContent = gameScores.team1;
    document.getElementById('team2Score').textContent = gameScores.team2;
}

export function resetBeerPong() {
    setStateValue('gameScores', { team1: 0, team2: 0 });
    updateBeerPongScore();
    document.getElementById('gameStatus').textContent = '';
    
    // Reset to mode selection
    showBeerPongGame();
}

// Initialize module
export function initialize() {
    // Nothing to initialize yet
}

// Register beer pong module
window.gameModules = window.gameModules || {};
window.gameModules['beer-pong'] = {
    createGame: createBeerPongGame,
    initialize: initialize
};

// Make functions globally available for onclick handlers
window.showBeerPongRules = showBeerPongRules;
window.showBeerPongGame = showBeerPongGame;
window.showBeerPongTournament = showBeerPongTournament;
window.setupTournament = setupTournament;
window.startTournament = startTournament;
window.selectWinner = selectWinner;
window.resetTournament = resetTournament;
window.startNormalBeerPong = startNormalBeerPong;
window.startSpecialBeerPong = startSpecialBeerPong;
window.selectSpecialBeerPongCategory = selectSpecialBeerPongCategory;
window.startGameWithNames = startGameWithNames;
window.hitCup = hitCup;
window.closeRuleDisplay = closeRuleDisplay;
window.resetSpecialGame = resetSpecialGame;
window.addScore = addScore;
window.resetBeerPong = resetBeerPong;