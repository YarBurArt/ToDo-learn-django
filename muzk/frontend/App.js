import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

function formatDate(dateString) {
  // '2023-04-17T14:14:55.232984Z' -> '17.04.2023 14:14:55'
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
const UpdateTodoButton = ({ todoId }) => { // TODO:
  return (
    <a href={`http://127.0.0.1:8000/update_todo/${todoId}`}>
      <button className="update-todo-button">Update status</button>
    </a>
  );
};
const Dropdown = ({}) => {
  return (
    <div className="dropdown">
      <button className="dropdown-button">
        Menu
      </button>
      {(
        <ul className="dropdown-content">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/new-post">New Post</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      )}
    </div>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }
  // get tasks 
  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/todo') // TODO: clean front
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      }).then(
        data => {
        this.setState(() => {
          console.log(data);
          return {
            data,
            loaded: true
          };
        });
      });
  }
  // base list of tasks 
  render() {
    return (
       <div><Dropdown/>
      <ul>
        {this.state.loaded ? (
          this.state.data.map(contact => (
            <li key={contact.id}>
              {contact.is_complete ? '✔️' : '❌' } | {contact.title} | {formatDate(contact.date_created)}
              | <UpdateTodoButton todoId={contact.id} />
            </li>
          ))
        ) : (
          <li>Loading tasks...</li>
        )}
      </ul>
      </div>
    );
  }
}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
