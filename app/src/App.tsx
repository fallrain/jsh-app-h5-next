import './App.scss';
import React from 'react';
import {
  ToastContainer
} from 'react-toastify';
import RouterPage from 'src/router';
// toast css
import 'react-toastify/dist/ReactToastify.css';
import JLoading from 'src/componets/common/JLoading/JLoading';

interface IApp {
  app: any
}

function App(props: IApp) {
  return (
    <div className="App">
      <RouterPage />
      <ToastContainer />
      <JLoading
        show={props.app.isLoading}
      />
    </div>
  );
}

export default App;
