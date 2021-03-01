import './App.scss';
import React from 'react';
import {
  Route,
} from 'react-router';
import Register from './pages/register/register';

function App() {
  return (
    <div className="App">
      <Route
        path="/register"
        component={Register}
      />
    </div>
  );
}

export default App;
