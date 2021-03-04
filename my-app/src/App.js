// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";

function App() {
  return (
    <div className="App">
      <AddTodo />
      <VisibleTodoList />
      <Footer />

      {/* <h1>React</h1> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {/* <TodoList
        onClick={() => {
          console.log("回调函数");
        }}
        completed={false}
        text={"跑步"}
      /> */}
    </div>
  );
}

export default App;
