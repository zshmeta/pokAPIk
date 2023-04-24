import React from 'react';
import logo from './assets/pokeball.gif';
import './App.css';
import PokeSoon from './Components/PokeSoon/PokeSoon.js'; 

function App() {
  return (
    <div className="App">
    
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         The only way things should be done is the right way... 
        </p>
        <p>
          Coming Soon.....
        </p>
        <p
          className="signature"
        >
          ... by zshmeta
        </p>
          <PokeSoon />
      </header>
    </div>
  );
}

export default App;
