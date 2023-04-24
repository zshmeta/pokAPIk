import React, { useState } from 'react';
// import Landing from './Components/Landing';
// import Waiting from './Components/Waiting';
// import QuizGame from './Components/QuizGame';
// import FightingDeck from './Components/FightingDeck';
// import Navbar from './Components/Navbar';
import Signup from "./Components/Signup/Signup";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";


function App() {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState('landing');

  const handleLogin = (userData) => {
    setUser(userData);
    setGameState('waiting');
  };

  const handleLogout = () => {
    setUser(null);
    setGameState('landing');
  };

  const handleStartQuiz = () => {
    setGameState('quiz');
  };

  const handleEndQuiz = () => {
    setGameState('fighting');
  };

  return (
    <div>
      {/*<Navbar user={user} onLogout={handleLogout} />*/}
      {/*{gameState === 'landing' && <Landing onLogin={handleLogin} />}*/}
      {/*{gameState === 'waiting' && <Waiting onStartQuiz={handleStartQuiz} />}*/}
      {/*{gameState === 'quiz' && <QuizGame onEndQuiz={handleEndQuiz} />}*/}
      {/*{gameState === 'fighting' && <FightingDeck />}*/}
      <Signup />
      <Sidebar />
    </div>
  );
}

import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <App />
      <SideBar />
      <Signup />
    </div>
  </React.StrictMode>
);


export default App;
