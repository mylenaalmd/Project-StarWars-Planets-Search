import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';

function App() {
  return (
    <>
      <span>Welcome!!</span>
      <Provider>
        <Table />
      </Provider>
    </>
  );
}

export default App;
