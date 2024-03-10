import React, { useState } from "react";
import ToDoInput from "../ToDoInput";
import ToDoList from "../ToDoList";
// import styles from "./ToDo.module.css";

function ToDo() {
  const [Todos, setTodos] = useState([]);
  function addTodo(todo) {
    setTodos((prevTodo) => [todo, ...prevTodo]);
    console.log("addtodo", todo);
  }

  function updateTodo(id, updatedTodo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  }

  function removeTodo(id) {
    const filteredItem = Todos.filter((todo) => todo.id !== id);
    setTodos(filteredItem);
    console.log(id);
  }
  return (
    <div>
      <ToDoInput onData={addTodo} />
      <ToDoList list={Todos} removeItem={removeTodo} updateItem={updateTodo} />
    </div>
  );
}

export default ToDo;
