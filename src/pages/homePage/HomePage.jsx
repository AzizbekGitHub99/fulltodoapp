import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../../components/form/ContactForm";
import ContactList from "../../components/list/ContactList";

const JSONtasks = localStorage.getItem("tasks");

class HomePage extends Component {
  state = {
    validated: false,
    tasks: JSON.parse(JSONtasks) || [
      {
        id: 1,
        firstName: "Edward",
        lastName: "Kenway",
        relationship: "friends",
        phoneNumber: "86694115",
        favorite: false,
      },
      {
        id: 2,
        firstName: "Gui",
        lastName: "Sezar",
        relationship: "relatives",
        phoneNumber: "66878945",
        favorite: false,
      },
      {
        id: 3,
        firstName: "Shay",
        lastName: "Cormac",
        relationship: "other",
        phoneNumber: "2118778",
        favorite: false,
      },
    ],
    task: {
      firstName: "",
      lastName: "",
      relationship: "other",
      phoneNumber: "",
    },
    selected: null,
    colors: {
      other: "secondary",
      relatives: "info",
      family: "success",
      friends: "primary",
    },
  };
  render() {
    let newTasks = [];
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity()) {
        if (selected) {
          newTasks = tasks.map((el) => {
            if (el.id === task.id) {
              return task;
            } else {
              return el;
            }
          });
          this.setState({ selected: null });
          this.setState({ validated: false });

        } else {
          newTasks = [...tasks, { ...task, id: Date.now(), favorite: false }];
        }
        this.setState({
          tasks: newTasks,
        });
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        this.setState({
          task: {
            firstName: "",
            lastName: "",
            relationship: "other",
            phoneNumber: "",
          },
        });
      } else {
        this.setState({ validated: true });
      }
    };
    const handleValue = (e) => {
      this.setState({
        task: { ...task, [e.target.id]: e.target.value },
      });
    };

    const handleDelete = (id) => {
      newTasks = tasks.filter((el) => el.id !== id);
      this.setState({ tasks: newTasks });
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    const handleEdit = (id) => {
      let newTask = tasks.find((el) => el.id === id);
      this.setState({ selected: id });
      this.setState({ task: newTask });
    };

    const toggleFavorite = (id) => {
      newTasks = tasks.map((el) => {
        if (el.id === id) {
          let newTask = { ...el, favorite: !el.favorite };
          return newTask;
        } else {
          return el;
        }
      });
      this.setState({ tasks: newTasks });
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    };
    const { validated, tasks, task, selected, colors } = this.state;
    return (
      <Container>
        <ContactForm
          validated={validated}
          handleSubmit={handleSubmit}
          handleValue={handleValue}
          tasks={tasks}
          task={task}
          selected={selected}
        />
        <ContactList
          tasks={tasks}
          colors={colors}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          toggleFavorite={toggleFavorite}
        />
      </Container>
    );
  }
}

export default HomePage;
