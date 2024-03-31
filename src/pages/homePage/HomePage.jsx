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
    search: "",
    filterBy: "",
    sortBy: "",
    result: [],
  };
  componentDidMount() {
    this.setState({ result: this.state.contacts });
  }
  render() {
    const {
      validated,
      contacts,
      contact,
      selected,
      colors,
      search,
      filterBy,
      sortBy,
      result,
    } = this.state;

    // let result = JSON.parse(JSON.stringify(contacts));
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
          this.setState({ selected: null, validated: false });
        } else {
          newContacts = [
            ...contacts,
            { ...contact, id: Date.now(), favorite: false },
          ];
        }
        this.setState({
          contacts: newContacts,
          result: newContacts,
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
      this.setState({ result: newContacts });
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
      this.setState({ result: newContacts });
    };

    const listChange = (e) => {
      if (e.target.id === "search") {
        this.setState({ search: e.target.value });
      }
      if (e.target.id === "filterBy") {
        this.setState({ filterBy: e.target.value });
      }
      if (e.target.id === "sortBy") {
        this.setState({ sortBy: e.target.value });
      }
      getResults(e.target.id, e.target.value);
    };

    const getResults = (id, val) => {
      console.log(id, typeof id);
      console.log(val, typeof val);
      if (id === "search" && val !== "") {
        newContacts = contacts.filter((el) => {
          return (
            el.firstName.toLowerCase().includes(val.trim().toLowerCase()) ||
            el.lastName.toLowerCase().includes(val.trim().toLowerCase())
          );
        });
        this.setState({ filterBy: "", sortBy: "" });
      } else if (val === "") {
        newContacts = contacts;
      }
      if (id === "filterBy" && val !== "") {
        // let filterBya = val;
        console.log(newContacts);
        newContacts = contacts.filter((el) => el.relationship === val);
        this.setState({ search: "", sortBy: "" });
      } else if (val === "") {
        newContacts = contacts;
      }
      if (id === "sortBy" && val !== "") {
        if (val === "desc") {
          newContacts = contacts.sort((a, b) => {
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        } else if (val === "asc") {
          newContacts = contacts.sort((a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          });
        } else {
          newContacts = contacts;
        }
        console.log(newContacts);
        this.setState({ search: "", filterBy: "" });
      } else if (val === "") {
        newContacts = contacts;
      }
      this.setState({ result: newContacts });
    };

    return (
      <Container>
        <ContactForm
          validated={validated}
          handleSubmit={handleSubmit}
          handleValue={handleValue}
          contact={contact}
          selected={selected}
        />
        <ContactList
          result={result}
          colors={colors}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          toggleFavorite={toggleFavorite}
          listChange={listChange}
          search={search}
          filterBy={filterBy}
          sortBy={sortBy}
        />
      </Container>
    );
  }
}

export default HomePage;
