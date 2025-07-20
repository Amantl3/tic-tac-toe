"use client";

import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TIC TAC TOE</h1>

      <div style={styles.board}>
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              ...styles.square,
              color: "#000",
              backgroundColor: "#fff",
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div style={styles.status}>{status}</div>

      <button onClick={handleRestart} style={styles.restartButton}>
        RESTART
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Styling
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "50px",
    backgroundColor: "#ffe6f0",
    minHeight: "100vh",
    padding: "20px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#333",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  square: {
    width: "80px",
    height: "80px",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "2px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    wordWrap: "break-word",
    color: "#333",
  },
  restartButton: {
    padding: "10px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

