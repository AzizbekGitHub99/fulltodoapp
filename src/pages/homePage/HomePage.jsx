import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../../components/form/ContactForm";
import ContactList from "../../components/list/ContactList";

const JSONcontacts = localStorage.getItem("contacts");

class HomePage extends Component {
  state = {
    validated: false,
    contacts: JSON.parse(JSONcontacts) || [
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
    contact: {
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
    let newContacts = [];
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity()) {
        if (selected) {
          newContacts = contacts.map((el) => {
            if (el.id === contact.id) {
              return contact;
            } else {
              return el;
            }
          });
          this.setState({ selected: null });
          this.setState({ validated: false });

        } else {
          newContacts = [...contacts, { ...contact, id: Date.now(), favorite: false }];
        }
        this.setState({
          contacts: newContacts,
        });
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        this.setState({
          contact: {
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
        contact: { ...contact, [e.target.id]: e.target.value },
      });
    };

    const handleDelete = (id) => {
      newContacts = contacts.filter((el) => el.id !== id);
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };

    const handleEdit = (id) => {
      let newContact = contacts.find((el) => el.id === id);
      this.setState({ selected: id });
      this.setState({ contact: newContact });
    };

    const toggleFavorite = (id) => {
      newContacts = contacts.map((el) => {
        if (el.id === id) {
          let newContact = { ...el, favorite: !el.favorite };
          return newContact;
        } else {
          return el;
        }
      });
      this.setState({ contacts: newContacts });
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    };
    const { validated, contacts, contact, selected, colors } = this.state;
    return (
      <Container>
        <ContactForm
          validated={validated}
          handleSubmit={handleSubmit}
          handleValue={handleValue}
          contacts={contacts}
          contact={contact}
          selected={selected}
        />
        <ContactList
          contacts={contacts}
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
