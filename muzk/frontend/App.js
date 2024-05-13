import React, { Component, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

import {content_about, contacts, 
        dropdown_uris, baseUrl} from "./constants";

// all in one file because it's more interesting than react as a separate server
// so you can see the combination of react and jinja2
// although it's still bad code, I'm just writing this for fun.

function formatDate(dateString) {
  // '2023-04-17T14:14:55.232984Z' -> '17.04.2023 14:14:55'
  // piece by piece, separate the date and put it all back together again
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
  // draws button to change the status of task completion
  return (
    <a href={`${baseUrl}update_todo/${todoId}`}>
      <button className="update-todo-button">Update status</button>
    </a>
  );
};
const DeleteTodoButton = ({ todoId }) => { // TODO:
  // draws a button to delete a task from the database 
  return (
    <a href={`${baseUrl}delete_todo/${todoId}`}>
      <button className="delete-todo-button">Delete</button>
    </a>
  )
};
const AboutBlock = () => {
  // plain text with markdown formatting
  return (
    <div className="mrkdn" id="about">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content_about}
    </ReactMarkdown>
    </div>
  )
}
const Contact = () => {
  // generates a list of contact records
  return (
    <div className="contact" id="contact">
        {contacts.map((contact, index) => (
        <div key={index}>
          <a href={contact.url} target="_blank" rel="noopener noreferrer">
            {contact.name}
          </a>
          <p>{contact.add_i}</p>
        </div>
      ))}
    </div>
  )
}
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // for smooth menu opening/closing effect
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // list of places to go from frnt, TODO: remove redirect
  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>Menu</button>
      {isOpen && (
        <ul className="dropdown-content task_ul">
          {dropdown_uris.map((elem_uri, index) => (
            <li className="task_li">
              <a href={elem_uri.uri} onClick={toggleDropdown}>{elem_uri.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const Blog = () => {
  // generates an element with a list of blog entries dynamically by condition
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const location = useLocation();

  useEffect(() => {
    // if URL contains hash fragment #posts
    if (location.hash === '#posts') {
      fetch(`${baseUrl}post/api/get_posts/`)
        .then(response => {
          if (response.status > 400) {
            setPlaceholder('Something went wrong!');
          } else {
            return response.json();
          }
        })
        .then(data => { // if response
          setData(data);
          setLoaded(true);
        })
        .catch(error => {
          setPlaceholder('Something went wrong!');
        });
    }
  }, [location.hash]); // check for useEffect
  return (
    <div id='posts'>
      {location.hash === '#posts' && (
        <div>
          {loaded ? (
            data.map(item => (
              <div key={item.id}>
                {item.title}
              </div>
            ))
          ) : (
            <div>{placeholder}</div>
          )}
        </div>
      )}
    </div>
  );
};
class App extends Component {
  // basic drawing of the application
  constructor(props) { // to process the request
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }
  // get tasks execute immediately after loading 
  componentDidMount() {
    fetch(`${baseUrl}api/todo`) // TODO: clean front
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
          // console.log(data); // to check the accuracy of the data by eye  
          return { data, loaded: true };
        });
      });
  }

  // base list of tasks 
  render() {
    return (
       <div><Dropdown/>
      <ul className="task_ul">
        {this.state.loaded ? ( // if the data is loaded from backend
          this.state.data.map(contact => ( // then go through the data list 
            <li className="task_li" key={contact.id}>
              {contact.is_complete ? '✔️' : '❌' } | {contact.title} | {formatDate(contact.date_created)}
              | <UpdateTodoButton todoId={contact.id} />
                <DeleteTodoButton todoId={contact.id} />
            </li>
          ))
        ) :(
          <li>Loading tasks...</li> // if the data is not loaded
        )}
      </ul>
      <AboutBlock/>
      <Contact/>
      </div>
    );
  }
}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
