import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./redux/rootReducer";
import Counter from "./components/Counter/container";

import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
