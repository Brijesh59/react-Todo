import React, { useState, useEffect } from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";
import Header from "./components/Header";
import CheckBox from "./components/CheckBox";

const App = () => {
  const [todosList, setTodosList] = useState([]);
  const [newtodo, setNewTodo] = useState("");

  useEffect(()=>{
    const list = localStorage.getItem('todosList')
    list && list.length>0 && setTodosList(JSON.parse(list))
  }, [])

  const handleChange = ({ target: { value: todo } }) => {
    setNewTodo(todo);
  };

  const addTodos = event => {
    event.preventDefault();
    if (!newtodo) return;
    if(todosList.some(todo=>todo.name === newtodo)) return;
    const newTodosList = [
      ...todosList,
      { id: generateUniqueId(newtodo), name: newtodo, done: false }
    ];
    setTodosList(newTodosList);
    setNewTodo("");
    localStorage.setItem('todosList', JSON.stringify(newTodosList))
  };

  const removeTodo = (event, todoIndex) => {
    event.stopPropagation();
    const newTodosList = [...todosList];
    newTodosList.splice(todoIndex, 1);
    setTodosList(newTodosList);
    localStorage.setItem('todosList', JSON.stringify(newTodosList))
  };

  const updateTodo = (event, todoIndex) => {
    // event.persist();
    event.stopPropagation();
    const newTodosList = [...todosList];
    newTodosList[todoIndex].name = event.currentTarget.value;
    setTodosList(newTodosList);
    localStorage.setItem('todosList', JSON.stringify(newTodosList))
  };

  const disableTodo = todoIndex => {
    const newTodosList = [...todosList];
    newTodosList[todoIndex].done = !newTodosList[todoIndex].done;
    setTodosList(newTodosList);
    localStorage.setItem('todosList', JSON.stringify(newTodosList))
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
          placeholder="add todo"
          onChange={handleChange}
          value={newtodo}
        />
      </form>
      <FlipMove>
        {todosList.map((todo, todoIndex) => (
          <li key={todo.id}>
            <CheckBox 
              onChange={() => disableTodo(todoIndex)} 
              checked={todo.done}
              id={todo.name} />
            <input
              disabled={todo.done}
              value={todo.name}
              style={{
                textDecoration: todo.done ? "line-through" : null,
                color: todo.done ? "grey" : "#000"
              }}
              onClick={event => event.stopPropagation()}
              onChange={event => updateTodo(event, todoIndex)}
            />
            <FontAwesomeIcon
              style={{ color: "red", cursor: "pointer", marginRight: 10 }}
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
