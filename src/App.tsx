import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Dashboard from './containers/dashboard';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Dashboard />
      </div>
    </Provider>
  );

}

export default App;
