import React, { Component, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";


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
const AboutBlock = () => {
  let content = `
## About Me

I'm a passionate learner with a love for programming!  I recently began diving into the worlds of Python and C#, eager to expand my knowledge in these languages. As a beginner, I'm focusing on building a strong foundation by mastering the fundamentals of programming concepts. I'm also exploring the vast landscape of libraries, frameworks, and tools available for both languages.

- Self-Driven Learner

Beyond programming, I'm also captivated by the world of digital art.  I find joy in using various digital art tools to bring unique designs and illustrations to life. The challenge of creating something new and the boundless freedom of digital art truly inspire me. I'm constantly experimenting with different techniques and tools, eager to see where my creative journey takes me.

- Strong Work Ethic and Determination

In my eyes, programming and digital art beautifully complement each other. By grasping programming fundamentals, I'm able to craft more intricate and captivating artwork. Likewise, my understanding of digital art empowers me as a programmer, allowing me to design visually stunning applications and websites.

- Cross-disciplinary Skills

My passion for both programming and digital art has fueled a strong work ethic, determination, and unwavering motivation to succeed. I constantly push myself to learn more and refine my skills in both disciplines. I'm incredibly excited to see how far I can take my programming and digital art journey!
`;
  return (
    <div className="mrkdn" id="about">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
    </div>
  )
}
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menu
      </button>
      {isOpen && (
        <ul className="dropdown-content task_ul">
          <li className="task_li">
            <a href="" onClick={toggleDropdown}>Home</a>
          </li>
          <li className="task_li">
            <a href="#about" onClick={toggleDropdown}>About</a>
          </li>
          <li className="task_li">
            <a href="/contact" onClick={toggleDropdown}>Contact</a>
          </li>
          <li className="task_li">
            <a href="/blog" onClick={toggleDropdown}>Blog</a>
          </li>
          <li className="task_li">
            <a href="/new-post" onClick={toggleDropdown}>New Post</a>
          </li>
          <li className="task_li">
            <a href="/login" onClick={toggleDropdown}>Login</a>
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
      <ul className="task_ul">
        {this.state.loaded ? (
          this.state.data.map(contact => (
            <li className="task_li" key={contact.id}>
              {contact.is_complete ? '✔️' : '❌' } | {contact.title} | {formatDate(contact.date_created)}
              | <UpdateTodoButton todoId={contact.id} />
            </li>
          ))
        ) : (
          <li>Loading tasks...</li>
        )}
      </ul>
      <AboutBlock/>
      </div>
    );
  }
}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
