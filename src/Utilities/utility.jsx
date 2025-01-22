export const minimax = (board, depth, isMaximizing, easy) => {
  const Winner = checkWinner(board); // Check the winner from the current board state
  if (Winner === "O") return 10 - depth; // Maximizer wins (AI 'O')
  if (Winner === "X") return depth - 10; // Minimizer wins (Player 'X')
  if (board.every((row) => row.every((cell) => cell !== ""))) return 0; // Draw (no moves left)
  // Limit depth for easy mode
  if (easy === "Easy" && depth > 2) {
    return 0; // Neutral score for shallow depth
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          board[row][col] = "O"; // AI move (Maximizing player is 'O')
          const score = minimax(board, depth + 1, false, easy); // Next turn is minimizing for player 'X'
          board[row][col] = ""; // Undo move
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          board[row][col] = "X"; // Player move (Minimizing player is 'X')
          const score = minimax(board, depth + 1, true, easy); // Next turn is maximizing for AI 'O'
          board[row][col] = ""; // Undo move
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
};
export const checkWinner = (currentBoard) => {
  // Horizontal check
  for (let row = 0; row < 3; row++) {
    if (
      currentBoard[row][0] &&
      currentBoard[row][0] === currentBoard[row][1] &&
      currentBoard[row][1] === currentBoard[row][2]
    ) {
      return currentBoard[row][0]; // Return the winner
    }
  }

  // Vertical check
  for (let col = 0; col < 3; col++) {
    if (
      currentBoard[0][col] &&
      currentBoard[0][col] === currentBoard[1][col] &&
      currentBoard[1][col] === currentBoard[2][col]
    ) {
      return currentBoard[0][col]; // Return the winner
    }
  }

  // Diagonal check
  if (
    currentBoard[0][0] &&
    currentBoard[0][0] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][2]
  ) {
    return currentBoard[0][0]; // Return the winner
  }
  if (
    currentBoard[0][2] &&
    currentBoard[0][2] === currentBoard[1][1] &&
    currentBoard[1][1] === currentBoard[2][0]
  ) {
    return currentBoard[0][2]; // Return the winner
  }

  return null; // No winner
};
