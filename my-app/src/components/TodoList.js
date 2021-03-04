import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = (props) => {
  console.log("object");
  const { todos, onTodoClick } = props;
  console.log("props: ", props);

  return (
    <ul>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          {...todo}
          onClick={() => {
            console.log("点击了");
            onTodoClick(index);
          }}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
