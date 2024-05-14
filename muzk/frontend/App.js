import React, { Component, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import axios from 'axios';

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
const UpdateTodoButton = ({ todoId }) => {
  // draws button to change the status of task completion
  const handleUpdateTodo = async () => {
    try {
      const response = await axios.patch(`${baseUrl}api/todo/update/${todoId}`,{});
      console.log(response.data); // DEBUG
    } catch (error) {
      // console.error(error); // DEBUG
      alert("Error updating, please reload page");
    }
  }; // TODO: fix reload 
  return ( 
    <a href=""> 
      <button className="update-todo-button" onClick={handleUpdateTodo}>
        Update status</button>
    </a>
  );
};
const DeleteTodoButton = ({ todoId }) => { 
  // draws a button to delete a task from the database 
  const handleDeleteTodo = async () => {
    try { // TODO: create security check before del from DB
      await axios.delete(`${baseUrl}api/todo/delete/${todoId}`);
      onDelete(todoId); // from axios to parent element
    } catch (error) {
      // console.error(error); DEBUG
      alert("Error updating, please reload page");
    }
  }; // TODO: fix reload 
  return (
    <a href="">
      <button className="delete-todo-button"  onClick={handleDeleteTodo}>
        Delete</button>
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
  console.log("================================");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}post/api/get_posts/`);
        setData(response.data);
        setLoaded(true);
      } catch (error) {
        setPlaceholder('Something went wrong!');
      };
    };
    fetchPosts();
  }, []);
  return (
    <div id="posts"> {loaded ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) :(
        <p>{placeholder}</p>
      )}
    </div>
);};
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
      {window.location.hash === '#posts' && <Blog/> }
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
