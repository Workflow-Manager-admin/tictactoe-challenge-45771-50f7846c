import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// The App renders the KAVIA navbar and the TicTacToe main container.
function App() {
  return (
    <div className="app">
      {/* KAVIA navbar unchanged */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" style={{ pointerEvents: "none", opacity: 0.5 }}>TicTacToe</button>
          </div>
        </div>
      </nav>

      {/* Centered Main Game Container */}
      <main>
        <div className="container">
          <div style={{ paddingTop: 120, minHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 className="title" style={{ marginBottom: 16 }}>TicTacToe Challenge</h1>
            <div className="description" style={{ color: "#555", fontSize: "1.07rem", marginBottom: 16, maxWidth: 600, textAlign: "center" }}>
              Play the classic two-player TicTacToe game. Take turns, try to win, or it’s a draw!<br/>
              <span style={{color:'#2196f3'}}>Powered by React & KAVIA template.</span>
            </div>
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;