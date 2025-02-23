import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    if (editIndex !== null) {
      const updatedList = [...todolist];
      updatedList[editIndex] = inputValue;
      setTodolist(updatedList);
      setEditIndex(null);
    } else {
      if (!todolist.includes(inputValue)) {
        setTodolist([...todolist, inputValue]);
      } else {
        alert(inputValue + " Already Added!");
      }
    }

    setInputValue("");
  };

  const handleEdit = (index) => {
    setInputValue(todolist[index]);
    setEditIndex(index);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleDelete = (index) => {
    setTodolist(todolist.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      <ul>
        {todolist.map((task, index) => (
          <ToDoItem
            key={index}
            value={task}
            index={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>

      
      <footer className="footer">@made by Manish Singh</footer>
    </div>
  );
}

export default App;

function ToDoItem({ value, index, handleEdit, handleDelete }) {
  const [status, setStatus] = useState(false);

  return (
    <li className={status ? "completed" : ""}>
      <span onClick={() => setStatus(!status)}>
        {index + 1}. {value}
      </span>
      <div className="btn-container">
        <button className="btn-edit" onClick={() => handleEdit(index)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => handleDelete(index)}>
          Delete
        </button>
      </div>
    </li>
  );
}
