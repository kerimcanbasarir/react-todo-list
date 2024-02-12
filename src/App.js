import "./App.css";
import TodoItem from "./companent/TodoItem";
import { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodoList = sessionStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  const submitItem = (e) => {
    e.preventDefault();
    const submitValue = e.target.add.value.trim();
    if (submitValue.length > 0) {
      const newTodoList = [...todoList, submitValue];
      setTodoList(newTodoList);
      sessionStorage.setItem("todoList", JSON.stringify(newTodoList));
      e.target.reset();
    }
  };

  const handleDelete = (itemContent) => {
    const updatedTodoList = todoList.filter((item) => item !== itemContent);
    setTodoList(updatedTodoList);
  };

  return (
    <div className="container">
      <div className="todo-header">
        <h1>T O D O 🔖</h1>
      </div>

      <div className="todo-body">
        <form className="todo-form" onSubmit={submitItem}>
          <input
            className="todo-input"
            name="add"
            type="text"
            maxLength="48"
            placeholder="Add Your Task"
          />

          <button>Gönder</button>
        </form>
      </div>

      <ul className="listItems">
        {todoList.map((item, index) => (
          <TodoItem
            key={index}
            content={item}
            onDelete={() => handleDelete(item)}
            setTodoList={setTodoList}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
