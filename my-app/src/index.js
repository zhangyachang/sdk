import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoApp from "./redux/reducers";
import * as redux from 'redux'

import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// import "./redux/index";
// import "./redux/store";
console.log('redux', redux)

const store = createStore(todoApp);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
