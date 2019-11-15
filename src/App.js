import React, { useState } from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import Header from "./Header";

const App = () => {
  const [todosList, setTodosList] = useState([]);
  const [newtodo, setNewTodo] = useState("");

  const handleChange = ({ target: { value: todo } }) => {
    setNewTodo(todo);
  };

  const addTodos = event => {
    event.preventDefault();
    if (!newtodo) return;
    const newTodosList = [
      ...todosList,
      { id: generateUniqueId(newtodo), name: newtodo, done: false }
    ];
    setTodosList(newTodosList);
    setNewTodo("");
  };

  const removeTodo = (event, todoIndex) => {
    event.stopPropagation();
    const newTodosList = [...todosList];
    newTodosList.splice(todoIndex, 1);
    setTodosList(newTodosList);
  };

  const updateTodo = (event, todoIndex) => {
    // event.persist();
    event.stopPropagation();
    const newTodosList = [...todosList];
    newTodosList[todoIndex].name = event.currentTarget.value;
    setTodosList(newTodosList);
  };

  const disableTodo = todoIndex => {
    const newTodosList = [...todosList];
    newTodosList[todoIndex].done = !newTodosList[todoIndex].done;
    setTodosList(newTodosList);
  };

  const generateUniqueId = todo => {
    const length = todo.length;
    const id = Math.random() * length;
    return id;
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={addTodos}>
        <input
          autoFocus
          placeholder="New Todo"
          onChange={handleChange}
          value={newtodo}
        />
      </form>
      <FlipMove>
        {todosList.map((todo, todoIndex) => (
          <li key={todo.id} onClick={() => disableTodo(todoIndex)}>
            <input
              value={todo.name}
              style={{
                textDecoration: todo.done ? "line-through" : null,
                color: todo.done ? "grey" : "#000"
              }}
              onClick={(event) => event.stopPropagation()}
              onChange={event => updateTodo(event, todoIndex)}
            />
            <FontAwesomeIcon
              style={{ color: "red", cursor: "pointer" }}
              icon={faTimes}
              onClick={event => removeTodo(event, todoIndex)}
            />
          </li>
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
