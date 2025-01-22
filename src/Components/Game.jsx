import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { minimax } from "../Utilities/utility";
import { checkWinner } from "../Utilities/utility";
import Board from "./Board";
export default function TwoPlayer() {
  const [gameover, setGameover] = useState(false);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const location = useLocation();
  const gamemode = location.state?.gamemode;
  const selectedDifficulty = location.state?.selectedDifficulty;

  const easy = selectedDifficulty;

  const BestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          board[row][col] = "O"; // AI move (Maximizing player is 'O')
          const score = minimax(board, 0, false, easy); // Next turn is minimizing for player 'X'
          board[row][col] = ""; // Undo move
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row, col };
          }
        }
      }
    }

    return bestMove; // Return the best move (row, col)
  };

  const handleReset = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurn("X");
    setWinner("");
    setGameover(false);
  };

  const checkDraw = () => {
    if (board.every((row) => row.every((cell) => cell !== "")) && !winner) {
      setGameover(true);
    }
  };

  const botPlays = () => {
    // Check if the bot should make a move
    if (gamemode === "bot" && turn === "O" && !winner && !gameover) {
      const AiMove = BestMove(board); // Best calculated move for hard mode

      // Ensure both cell (easy mode) and AiMove (hard mode) are valid

      const newBoard = board.map((row, rIndex) =>
        row.map((square, cIndex) =>
          rIndex === AiMove.row && cIndex === AiMove.col ? turn : square
        )
      );

      // Update the board and switch turn back to the player
      setBoard(newBoard);
      setWinner(checkWinner(newBoard));
      setTurn("X");
    }
  };

  const handleClick = (rowIndex, colIndex) => {
    if (gamemode === "bot" && turn === "O") return;
    if (board[rowIndex][colIndex] !== "" || winner || gameover) return;
    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? turn : cell
      )
    );

    setBoard(newBoard);
    setWinner(checkWinner(newBoard));
    setTurn(turn === "X" ? "O" : "X");
  };

  useEffect(() => {
    checkDraw();
    if (gamemode === "bot" && turn === "O" && !gameover && !winner) {
      const timeout = setTimeout(() => {
        botPlays();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [turn, gamemode, winner, gameover, board]);
  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
      <div className=" h-[20%] w-full">
        <h1 className="text-4xl md:text-6xl font-extrabold flex justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse">
          Tic Tac Toe
        </h1>
      </div>
      <div className="flex justify-between md:w-[20rem] w-[12rem] m-2">
        <div
          className={`border ${
            turn === "X" ? "border-blue-500" : "border-gray-500"
          } md:px-6 px-2 py-1 text-white`}
        >
          X
        </div>
        <div
          className={`border ${
            turn === "O" ? "border-blue-500" : "border-gray-500"
          } md:px-6 px-2 py-1 text-white`}
        >
          O
        </div>
      </div>
      <Board board={board} handleClick={handleClick} />

      {gameover && !winner && (
        <div className="mt-4 text-3xl font-bold text-white">It's a Draw!</div>
      )}
      {winner && (
        <div className="mt-4 text-3xl font-bold text-white">{winner} Wins!</div>
      )}
      <div className="flex gap-2">
        <Link to="/">
          <button className="mt-4 md:px-4 md:py-2 px-2 py-1 bg-blue-500 text-white rounded">
            Back
          </button>
        </Link>
        <button
          className="mt-4 md:px-4 md:py-2 px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
