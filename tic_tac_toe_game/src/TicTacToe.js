import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * This is the main container for the TicTacToe Challenge.
   * Renders a centered 3x3 clickable grid, a status bar (showing turn/winner/draw), and a reset button.
   * Uses two-player mode, tracks game state, and applies light theme with custom brand colors.
   */

  // --- THEME COLORS (customized according to requirements)
  const COLORS = {
    primary: "#ffffff",   // main board/cell background
    secondary: "#000000", // main text color
    accent: "#2196f3",    // for highlighting turn or button
    border: "#e0e0e0",    // light grid border
  };

  // --- GAME LOGIC STATE ---
  // 0-8 board positions, 'X', 'O', or null
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' starts first
  const [xIsNext, setXIsNext] = useState(true);
  // null=ongoing, 'X'/'O'=win, 'draw'=draw
  const [gameResult, setGameResult] = useState(null);

  /**
   * Checks for win or draw.
   * Returns 'X' if X wins, 'O' if O wins, or 'draw' if board full, or null if not over.
   */
  // PUBLIC_INTERFACE
  function checkGameResult(board) {
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // cols
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    if (board.every(cell => cell)) {
      return "draw";
    }
    return null;
  }

  // --- EVENT HANDLERS ---
  // PUBLIC_INTERFACE
  function handleCellClick(i) {
    if (gameResult || board[i]) return; // ignore if game over or cell filled

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    const result = checkGameResult(newBoard);
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setGameResult(result);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameResult(null);
  }

  // --- STATUS BAR LOGIC ---
  let statusMsg;
  if (gameResult === "X") {
    statusMsg = "Player X wins! 🎉";
  } else if (gameResult === "O") {
    statusMsg = "Player O wins! 🎉";
  } else if (gameResult === "draw") {
    statusMsg = "It's a draw!";
  } else {
    statusMsg = `Turn: Player ${xIsNext ? "X" : "O"}`;
  }

  // --- RENDER ---
  return (
    <div style={styles.wrap}>
      {/* STATUS BAR */}
      <div style={{
        ...styles.statusBar,
        color: COLORS.secondary,
        background: COLORS.primary,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 0 10px 0 rgba(33,150,243,0.07)"
      }}>
        <span style={{
          color: (!gameResult ? COLORS.accent : COLORS.secondary),
          fontWeight: "bold",
          fontSize: 20
        }}>
          {statusMsg}
        </span>
      </div>

      {/* TIC TAC TOE GRID */}
      <div style={styles.gridContainer}>
        <div style={{
          ...styles.grid,
          background: COLORS.primary,
          border: `2px solid ${COLORS.accent}`,
          boxShadow: "0 4px 40px 0 rgba(33,150,243,0.11)"
        }}>
          {board.map((cell, i) => (
            <button
              key={i}
              style={{
                ...styles.cell,
                color: cell === "X" ? COLORS.accent : COLORS.secondary,
                cursor: board[i] || gameResult ? "not-allowed" : "pointer",
                border: `1px solid ${COLORS.border}`,
                background: COLORS.primary,
                fontFamily: "inherit"
              }}
              onClick={() => handleCellClick(i)}
              disabled={!!board[i] || !!gameResult}
              aria-label={`Tic Tac Toe Cell ${i} (${cell ? cell : "empty"})`}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      {/* RESET BUTTON */}
      <button
        style={{
          ...styles.resetButton,
          background: COLORS.accent,
          color: COLORS.primary,
          border: "none",
        }}
        onClick={handleReset}
        tabIndex={0}
      >
        Reset Game
      </button>
    </div>
  );
}

// --- INLINE STYLES FOR THEME AND LAYOUT ---
const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "20px 0"
  },
  statusBar: {
    marginBottom: 24,
    padding: "14px 36px",
    borderRadius: 8,
    textAlign: "center",
    minWidth: 220,
    minHeight: 30
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 64px)",
    gridTemplateRows: "repeat(3, 64px)",
    gap: 0,
    borderRadius: 14,
    overflow: "hidden"
  },
  cell: {
    width: 64,
    height: 64,
    fontSize: 32,
    fontWeight: 600,
    outline: "none",
    borderRight: "none",
    borderBottom: "none",
    background: "#fff",
    transition: "background 0.15s, color 0.15s"
  },
  resetButton: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 600,
    padding: "10px 24px",
    borderRadius: 6,
    boxShadow: "0 1px 8px 0 rgba(33,150,243,0.12)",
    cursor: "pointer"
  }
};

export default TicTacToe;
