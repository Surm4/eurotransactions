import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { RootSaga } from './sagas/saga';
import React, { Component } from 'react';
import reducer from './reducers/reducers';
import AddTransaction from './compontents/AddTransaction';
import Transactions from './compontents/Transactions';
import './css/App.css';
import './css/fontawesome/css/all.css';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Transactions />
        <AddTransaction />
      </Provider>
    );
  }
}

export default App;
