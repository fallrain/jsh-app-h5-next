import './App.scss';
import React from 'react';
import {
  ToastContainer
} from 'react-toastify';
import RouterPage from './router';
// toast css
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <RouterPage />
      <ToastContainer />
    </div>
  );
}

export default App;
