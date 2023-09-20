import {useState} from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    setTodos(prev => {
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          checked: false
        }
      ];
    });
    setNewTodo('');
    // pre-select:
    window.onload = document.getElementById('newTodo').select();
  };

  const toggleTodo = (id, checked) => {
    setTodos(prev => {
      return prev.map(todo => {
        return todo.id === id ? {...todo, checked} : todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos(prev => {
      return prev.filter(todo => todo.id !== id );
    });
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">New Todo</label>
        <br />
        <input type="text"
               id='newTodo'
               autoFocus
               value={newTodo}
               onChange={e => setNewTodo(e.target.value)} />
        <br />
        <br />
        <button>Add</button>
      </form>
      <h1>Todo List</h1>
      {todos.length === 0 && <p>No todos</p>}
      {todos.length >= 2 && <button onClick={() => deleteAll()}>Delete All</button>}
      <br />
      <br />
      {todos.map(todo => {
        return  <li key={todo.id}>
                  <input type='checkbox'
                         id='checkbox'
                         value={todo.checked}
                         onChange={e => toggleTodo(todo.id, e.target.checked)} />
                  <label htmlFor="checkbox">{todo.text}</label>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>;
      })}
    </>
  );
};

export default App;
