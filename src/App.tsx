import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dictionary from './Dictionary';
import { DictionaryProvider } from './DictionaryContext';

function App() {
  return (
    <div className="App">
      <DictionaryProvider>
        <Dictionary />
      </DictionaryProvider>
    </div>
  );
}

export default App;
