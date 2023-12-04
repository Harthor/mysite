import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { produce } from 'immer';

// django의 models.py 양식을 따른다. id는 django에서도 자동으로 지정됨.
type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos]= useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>('');

  // useEffect : 마운트될 때만 동작(빈 배열 전달)
  useEffect(() => {
    fetchTodos();  
  }, []);

  // 조회
  const fetchTodos = async () => {
    try {
    const response = await axios.get<Todo[]>('http://localhost:8000/api/todos/');
    setTodos(response.data);
    console.log(response.data);
    } catch (error) {
      console.error(error)
    }
  };


  const addTodo = () => {
    axios.post('http://localhost:8000/api/todos/', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error(error);
      })
  }

  const toggleTodo = (id: number, completed: boolean) => {
    axios.patch<Todo>(`http://localhost:8000/api/todos/${id}/`, { completed: !completed})
      .then(() => {
        fetchTodos();
      })
      .catch(error => {
        console.error(error);
      });
  } ;

    const deleteTodo = (id: number) => {
      axios.delete(`http://localhost:8000/api/todos/${id}/`)
        .then(() => {
          fetchTodos();
          // setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));

        })
        .catch(error => {
          console.error(error);
        })
    };


  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.title}
            </span>
            <button onClick = {() => toggleTodo(todo.id, todo.completed)}>Finished</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div><input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
      <button onClick={addTodo}>Add Todo</button></div>
    </div>
  )
}

export default App;
