
let flashcards = [];
let currentIndex = 0;
let players = [];
let currentPlayerIndex = 0;

// Fetch questions from the JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        flashcards = data;
    });

const playerSetupDiv = document.getElementById('player-setup');
const gameAreaDiv = document.getElementById('game-area');
const playerNamesDiv = document.getElementById('player-names');
const numPlayersInput = document.getElementById('num-players');
const startGameBtn = document.getElementById('start-game-btn');
const currentPlayerH2 = document.getElementById('current-player');
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const flashcardDiv = document.getElementById('flashcard');
const nextBtn = document.getElementById('next-btn');
const scoreboardDiv = document.getElementById('scoreboard');

// Setup player input fields
numPlayersInput.addEventListener('input', setupPlayerInputs);

function setupPlayerInputs() {
    playerNamesDiv.innerHTML = '';
    const numPlayers = numPlayersInput.value;
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.className = 'player-name';
        playerNamesDiv.appendChild(input);
    }
}

startGameBtn.addEventListener('click', startGame);

function startGame() {
    const nameInputs = document.querySelectorAll('.player-name');
    players = Array.from(nameInputs).map(input => ({
        name: input.value || `Player ${players.length + 1}`,
        score: 0
    }));
    if (players.length > 0) {
        playerSetupDiv.style.display = 'none';
        gameAreaDiv.style.display = 'block';
        showQuestion();
        updateScoreboard();
    }
}

function showQuestion() {
    if (flashcards.length > 0) {
        const currentCard = flashcards[currentIndex];
        questionDiv.textContent = currentCard.question;
        answerDiv.textContent = currentCard.answer + " (" + currentCard.scripture + ")";
        answerDiv.style.display = 'none';
        currentPlayerH2.textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    }
}

function showAnswer() {
    answerDiv.style.display = 'block';
    players[currentPlayerIndex].score += 1;
    updateScoreboard();
}

function nextFlashcard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    showQuestion();
}

function updateScoreboard() {
    scoreboardDiv.innerHTML = '<h3>Scoreboard</h3>';
    players.forEach(player => {
        const playerScore = document.createElement('div');
        playerScore.textContent = `${player.name}: ${player.score}`;
        scoreboardDiv.appendChild(playerScore);
    });
}

flashcardDiv.addEventListener('click', () => {
    if (answerDiv.style.display === 'none') {
        showAnswer();
    } else {
        showQuestion();
    }
});

nextBtn.addEventListener('click', nextFlashcard);
