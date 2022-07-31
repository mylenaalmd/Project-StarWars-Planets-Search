import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <span>Welcome!!</span>
      <Provider>
        <Home />
      </Provider>
    </>
  );
}

export default App;
