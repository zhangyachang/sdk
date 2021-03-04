import { createStore, combineReducers } from 'redux'

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

const FIRST_NAME_CHANGE = 'FIRST_NAME_CHANGE';

function counter(state = 0, action) {
  console.log('state', state);
  switch (action.type) {
  case INCREMENT:
    return {
      ...state,
      age: state.age + 1
    };
  case DECREMENT:
    return {
      ...state,
      age: state.age + -1
    };
  default:
    return state;
  }
}

function firstNameChange(state, action){
  switch(action.type){
    case FIRST_NAME_CHANGE:
      return {
        ...state,
        firstName: action.payload.firstName
      }
    default:
      return state;
  }
}

// const rootReducers = combineReducers({
//   counter,
//   firstNameChange,
// });


function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case 'ADD_TODO':
    return state.concat([{ text: action.text, completed: false }]);
  case 'TOGGLE_TODO':
    return state.map((todo, index) =>
      action.index === index ?
        { text: todo.text, completed: !todo.completed } :
        todo
   )
  default:
    return state;
  }
}

function todoApps(state = {}, action){
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}


const state = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
};

// const store = createStore(todoApps, {age: 20, name: '张三', firstName: '张'});
const store = createStore(todoApps, state);

// 监听函数
const listener = function(){
  console.log(store.getState());
};
store.subscribe(listener);

// store.dispatch({type: INCREMENT});
// store.dispatch({type: INCREMENT});
// store.dispatch({type: INCREMENT});
// store.dispatch({type: FIRST_NAME_CHANGE, payload: {firstName: '王'}});
// store.dispatch({type: FIRST_NAME_CHANGE, payload: {firstName: 'zhangxiao'}});

console.log(111)

store.dispatch({type: 'ADD_TODO', text: '文本内容被修改'})
store.dispatch({type: 'TOGGLE_TODO', index: 1})
store.dispatch({type: 'TOGGLE_TODO', index: 1})
store.dispatch({type: 'TOGGLE_TODO', index: 1})
store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'AAAAA'})


export default store;
