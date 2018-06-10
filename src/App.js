import * as React from "react";
import { Provider } from 'react-redux';
import reducer from './reducer';
import state from './state';
import configureStore from './store';
import './styles/global.scss';
import Main from "./components/Main";

const store = configureStore(state, reducer);

export default class App extends React.Component {
    render() {
        return (
        <div id="App">
          <Provider store={store}>
            <Main />
          </Provider>
        </div>
      )}
}
