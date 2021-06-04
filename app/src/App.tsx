import './App.scss';
import React from 'react';
import {
  ToastContainer
} from 'react-toastify';
import RouterPage from 'src/router';
// toast css
import 'react-toastify/dist/ReactToastify.css';
import JLoading from 'src/componets/common/jLoading/JLoading';
import { connect } from 'react-redux';

interface IApp {
  app: any
}

const mapStateToProps = (state: any) => ({
  app: state.app,
  userInf: state.userInf
});

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

export default connect(mapStateToProps)(App);
