import { combineReducers } from "redux";
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from "./actions";

const { SHOW_ALL } = VisibilityFilters;
const initialState = {
  VisibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [],
};

function visibilityFilter(state = SHOW_ALL, action) {
  console.log("visibilityFilter Reducer");
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  console.log("visibilityFilter Reducer2");
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          id: action.id,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

// function todoApp(state = initialState, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return Object.assign({}, state, {
//         VisibilityFilter: action.filter,
//       });
//     case ADD_TODO:
//       return Object.assign({}, state, {
//         todos: todos(state.todos, action),
//       });
//     case TOGGLE_TODO:
//       return Object.assign({}, state, {
//         todos: todos(state.todos, action),
//       });
//     default:
//       return state;
//   }
// }

// export function todoApps(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action),
//   };
// }

// export const todoApps = combineReducers({
//   visibilityFilter: visibilityFilter,
//   todos,
// });

// export function todoApps(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action),
//   };
// }

export default combineReducers({
  visibilityFilter,
  todos,
});
