import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Tasks from "./components/Tasks";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";

import "./App.css";

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       message: "hello world",
//     };
//   }

//   componentDidMount() {
//     console.log("Foi renderizado");
//   }

//   handleMessageChangeClick() {
//     this.setState({ message: "Hello" });
//   }

//   render() {
//     return (
//       <>
//         <h1>{this.state.message}</h1>
//         <button onClick={this.handleMessageChangeClick.bind(this)}>
//           Change Message
//         </button>
//       </>
//     );
//   }
// }

// export default App;

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Studing Programming",
      completed: false,
    },
    {
      id: "2",
      title: "Read Books",
      completed: true,
    },
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );

      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };

      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];
    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </>
            }
          />
          <Route
            path="/:taskTitle"
            exact
            element={
              <>
                <TaskDetails />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
