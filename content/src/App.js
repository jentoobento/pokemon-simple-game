import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Index from './containers/Index';
import reducedStore from './reducers/index';
import './App.css';

const store = createStore(reducedStore);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Index />
        </Router>
      </Provider>
    )
  }
}

export default App;
