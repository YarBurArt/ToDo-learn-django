import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

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
      <ul>
        {this.state.loaded ? (
          this.state.data.map(contact => (
            <li key={contact.id}>
              {contact.title} - {contact.is_complete}
            </li>
          ))
        ) : (
          <li>Loading tasks...</li>
        )}
      </ul>
    );
  }
}

export default App;
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
