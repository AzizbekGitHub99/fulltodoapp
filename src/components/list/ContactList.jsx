import React, { Component, Fragment } from "react";
import { Alert, Form, Nav, Row, Tab } from "react-bootstrap";
import ContactCard from "../card/ContactCard";

class ContactList extends Component {
  render() {
    const { contacts, colors, toggleFavorite, handleDelete, handleEdit } =
      this.props;

    let allContacts = JSON.parse(JSON.stringify(contacts));
    let favoriteContacts = contacts.filter((el) => el.favorite);

    // const filterContact = (e) => {
    //   console.log(e.target.value);
    //   allContacts = allContacts.filter(
    //     (el) => el.relationship === e.target.value
    //   );
    //   allContacts.map((a) => console.log(a));
    // };

    return (
      <Fragment>
        <Form className="d-flex justify-content-end gap-3 mb-3">
          <Form.Select
            // onChange={(e) => filterContact(e)}
            id="filterBy"
            aria-label="Filter"
          >
            <option value="">All</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
            <option value="relatives">Relatives</option>
            <option value="other">Other</option>
          </Form.Select>
          <Form.Select id="sortBy" aria-label="Sort">
            <option value="">Sort by</option>
            <option value="1">A-Z</option>
            <option value="2">Z-A</option>
          </Form.Select>
        </Form>
        <Tab.Container id="tabs" defaultActiveKey="all">
          <Row>
            <Nav variant="pills" className="w-100">
              <Nav.Item className="text-center col-6">
                <Nav.Link eventKey="all">All ({allContacts.length})</Nav.Link>
              </Nav.Item>
              <Nav.Item className="text-center col-6">
                <Nav.Link eventKey="favorite">
                  Favorite ({favoriteContacts.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                {allContacts.length ? (
                  ""
                ) : (
                  <Alert className="my-3" variant="info">
                    No Contacts
                  </Alert>
                )}
                {allContacts.map((el) => (
                  <ContactCard
                    key={el.id}
                    {...el}
                    colors={colors}
                    toggleFavorite={toggleFavorite}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="favorite">
                {favoriteContacts.length ? (
                  ""
                ) : (
                  <Alert className="my-3" variant="info">
                    No Contacts
                  </Alert>
                )}
                {favoriteContacts.map((el) => (
                  <ContactCard
                    key={el.id}
                    {...el}
                    colors={colors}
                    toggleFavorite={toggleFavorite}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Fragment>
    );
  }
}

export default ContactList;
