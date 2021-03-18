import './App.scss';
import React from 'react';
import {
  ToastContainer
} from 'react-toastify';
import AppContent from 'src/content/app/app.content';
import RouterPage from 'src/router/index';
// toast css
import 'react-toastify/dist/ReactToastify.css';
import JLoading from 'src/componets/common/JLoading/JLoading.jsx';

function App(props) {
  return (
    <div className="App">
      <AppContent.Provider value="">
        <RouterPage />
        <ToastContainer />
        <JLoading
          show={props.app.isLoading}
        />
      </AppContent.Provider>
    </div>
  );
}

export default App;
