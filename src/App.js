import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './Components/List'
import ListForm from './Components/ListForm'

function App() {
  return (
    <div className="App">
      <ListForm />
      <List />
    </div>
  );
}

export default App;
