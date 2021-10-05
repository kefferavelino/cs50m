import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'left',
}

let id = 0;

const Todo = props => (
  <li>
    <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
)


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  addTodo(){
    const text = prompt("TODO text please!")
    this.setState({
      todos: [...this.state.todos, {text: text, id: id++, checked: false }]
    })
  }

  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id){
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id !== id) return todo
        return{
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <div style={styles}>
      <div>Todo count: {this.state.todos.length}</div>
      <div>Unchecked toto count: {this.state.todos.filter(todo => !todo.checked).length}</div>
      <button onClick={() => this.addTodo()}>Add TODOS</button>
        <ul>
          {
            this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
              todo={todo}
              key={todo.id}
            />
          ))}
        </ul>
      </div>
    );
  }

}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
