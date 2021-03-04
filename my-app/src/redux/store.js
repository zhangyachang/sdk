import redux, { createStore } from "redux";
import { addTodo, toggleTodo, setVisibilityFilter } from "./actions";
import { todoApps } from "./reducers";

console.log("111111redux: ", redux);

const initialState = {
  // VisibilityFilter: 'SHOW_ALL',
  todos: [],
};
const store = createStore(todoApps, initialState);

// console.log("引入了Store.js");
// // console.log("store", store.getState());
// const listener = function (...params) {
//   console.log("action", store.getState());
// };
// store.subscribe(listener);

// store.dispatch(addTodo("文本内容1"));
// store.dispatch(addTodo("2222"));
// store.dispatch(addTodo("3333"));
// store.dispatch(toggleTodo(1));
console.log("111111111");
store.dispatch(toggleTodo(2));
store.dispatch(toggleTodo(2));

// store.dispatch(setVisibilityFilter("SHOW_COMPLETED"));
