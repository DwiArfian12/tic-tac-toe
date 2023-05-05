// Variabel yang digunakan
let board = document.querySelector('.game-board');
let cells = document.querySelectorAll('.cell');
let message = document.querySelector('.message');
let reset = document.querySelector('.reset');
let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;
let gameOver = false;

// Membuat event listener untuk setiap cell pada board
cells.forEach(cell => {
	cell.addEventListener('click', handleClick, { once: true });
});

// Membuat event listener untuk tombol reset
reset.addEventListener('click', resetGame);

// Fungsi untuk menghandle click pada cell
function handleClick(e) {
	let cell = e.target;

	// Memasukkan simbol player pada cell yang diklik
	cell.textContent = currentPlayer;

	if (cell.textContent === player1) {
		cell.style.color = '#080b64'
		cell.style.boxShadow = '4px 4px 10px #080b643a'
	} else {
		cell.style.color = '#D21312'
		cell.style.boxShadow = '4px 4px 10px #D213123a'
	}

	// Mengecek apakah ada pemenang
	if (checkWin()) {
		gameOver = true;
		endGame(`${currentPlayer} wins!`);
	} else if (checkTie()) {
		gameOver = true;
		endGame('Tie game');
	} else {
		// Memindahkan giliran ke pemain berikutnya
		currentPlayer = currentPlayer === player1 ? player2 : player1;
		message.textContent = `Player ${currentPlayer}'s turn (${currentPlayer})`;
	}
}

// Fungsi untuk mengecek apakah ada pemenang
function checkWin() {
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	return winningCombos.some(combo => {
		return combo.every(index => {
			return cells[index].textContent === currentPlayer
		});
	});
}

// Fungsi untuk mengecek apakah game berakhir dengan hasil seri
function checkTie() {
	return [...cells].every(cell => {
		return cell.textContent !== '';
	});
}

// Fungsi untuk mengakhiri game
function endGame(msg) {
	message.textContent = msg;
	cells.forEach(cell => {
		cell.removeEventListener('click', handleClick);
	});

	reset.style.display = 'flex';
}

// Fungsi untuk me-reset game
function resetGame() {
	location.reload()
}

// Menampilkan pesan awal
message.textContent = `Player ${currentPlayer}'s turn (${currentPlayer})`;