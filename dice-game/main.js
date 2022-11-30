let dices = [
	null,
	'img/dice-1.png',
	'img/dice-2.png',
	'img/dice-3.png',
	'img/dice-4.png',
	'img/dice-5.png',
	'img/dice-6.png',
];

let playerOne = {
	name: prompt('Prvi igrac je: '),
	playerName: document.querySelector('.player-one .player-name'),
	currentDice: document.querySelector('.player-one .dice'),
	storeDice: [],
	showDice: document.querySelector('.player-one .rolled-dice'),
	score: 0,
};

let playerTwo = {
	name: prompt('Drugi igrac je: '),
	playerName: document.querySelector('.player-two .player-name'),
	currentDice: document.querySelector('.player-two .dice'),
	storeDice: [],
	showDice: document.querySelector('.player-two .rolled-dice'),
	score: 0,
};
console.log(playerOne.playerName);

let winnerIs = document.querySelector('.footer');
let roundNumberBox = document.querySelector('.round-number');

let players = [playerOne, playerTwo];
let currentPlayer = null;
let playersIndex = null;
let maxRound = 10;

let roundCounter = 1;

// okrece koji ce user/kad igra!
function switchPlayer() {
	players.reverse();
	currentPlayer = players[playersIndex];
}

function showPlayer() {
	playerOne.playerName.innerHTML = `<h2>${playerOne.name}</h2>`;
	playerTwo.playerName.innerHTML = `<h2>${playerTwo.name}</h2>`;
}

function renderRoundCounter() {
	roundNumberBox.innerHTML = `<h2>${roundCounter}</h2>`;
}

function showDiceFromPlayer() {
	let saveDice = '';
	currentPlayer.storeDice.forEach(function (dice) {
		saveDice += `<img src="${dices[dice]}" />`;
	});
	currentPlayer.showDice.innerHTML = saveDice;
}

function saveDice(currentDice) {
	currentPlayer.score += currentDice;
	currentPlayer.storeDice.push(currentDice);

	showDiceFromPlayer();

	if (playerOne.storeDice.length === playerTwo.storeDice.length) {
		roundCounter++;
	}
	switchPlayer();
	if (
		playerOne.storeDice.length === maxRound &&
		playerTwo.storeDice.length === maxRound
	) {
		showWinner();
	} else {
		rollDice();
	}
}

function rollDice() {
	let currentDice = randomNum(1, 7);
	renderRoundCounter();
	// simulira obrt kocke!
	let interval = setInterval(function () {
		currentPlayer.currentDice.setAttribute(
			'src',
			dices[randomNum(1, 7)]
		);
	}, 300);

	setTimeout(function () {
		clearInterval(interval);
		currentPlayer.currentDice.setAttribute('src', dices[currentDice]);
		saveDice(currentDice);
	}, 1000);
}

function startGame() {
	playersIndex = randomNum(0, 2);
	currentPlayer = players[playersIndex];
	showPlayer();
	rollDice();
}

startGame();

// generise random brojeve
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// ovde prikazujem pobednika
function showWinner() {
	if (playerOne.score > playerTwo.score) {
		winnerIs.innerHTML = `<h3>WINER IS ${playerOne.name}</h3>`;
	} else if (playerOne.score < playerTwo.score) {
		winnerIs.innerHTML = `<h3>WINER IS ${playerTwo.name}</h3>`;
	} else {
		winnerIs.innerHTML = `<h3>NO WINNER </h3>`;
	}
}
