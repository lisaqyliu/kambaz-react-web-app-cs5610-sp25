import { useState } from "react";
import axios from "axios";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const createTodo = () =>
    window.location.assign(`${API}/create`);
  const deleteTodo = async (todo: any) => {
    try {
      await axios.delete(`${API}/${todo.id}`); // waits for server
      const newTodos = todos.filter((t) => t.id !== parseInt(todo.id));
      setTodos(newTodos); // only update UI if delete succeeded
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Delete failed.");
    }
  };
  
  const updateTitle = async () => {
    try {
      await axios.put(`${API}/${todo.id}`, { title: todo.title });
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Update title failed.");
    }
  };
  const updateDescription = async () => {
    try {
      await axios.put(`${API}/${todo.id}`, { description: todo.description });
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Update description failed.");
    }
  };
  const updateCompleted = async () => {
    try {
      await axios.put(`${API}/${todo.id}`, { completed: todo.completed });
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Update completed failed.");
    }
  };
  
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving by ID</h4>
      <a className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl
        value={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h4>Filtering</h4>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating</h4>
      <button className="btn btn-primary" onClick={createTodo}>
        Create Todo
      </button>
      <hr />

      <h4>Deleting</h4>
      <FormControl
        className="w-25 float-start me-2"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <button className="btn btn-danger float-end" onClick={() => deleteTodo(todo)}>
        Delete Todo with ID = {todo.id}
      </button>

      <hr />
      <br/>
      <h4>Updating</h4>
      <FormControl
        className="w-25 float-start me-2"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        className="w-50 float-start"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button className="btn btn-primary float-end" onClick={updateTitle}>
        Update Title
      </button>
      <br />
      <br />
      <hr />

      <h4>Updating Description and Completed</h4>
      <FormControl
        className="w-50 float-start me-2"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <button
        className="btn btn-warning float-start me-2"
        onClick={updateDescription}
      >
        Update Description
      </button>

      <div className="clearfix my-2" />
      <label htmlFor="wd-todo-completed" className="me-2">
        Completed?
      </label>
      <input
        id="wd-todo-completed"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({ ...todo, completed: e.target.checked })
        }
      />
      <button className="btn btn-success ms-2" onClick={updateCompleted}>
        Update Completed
      </button>
      <hr />
    </div>
  );
}
