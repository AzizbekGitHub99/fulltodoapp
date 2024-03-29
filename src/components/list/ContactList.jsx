import React, { Component, Fragment } from "react";
import { Nav, Row, Tab } from "react-bootstrap";
import ContactCard from "../card/ContactCard";

class ContactList extends Component {
  render() {
    const { tasks, colors, toggleFavorite, handleDelete, handleEdit } =
      this.props;
    const favoriteTasks = tasks.filter((el) => el.favorite);

    return (
      <Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey="all">
          <Row>
            <Nav variant="pills" className="w-100">
              <Nav.Item className="w-50 text-center">
                <Nav.Link eventKey="all">All ({tasks.length})</Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-50 text-center">
                <Nav.Link eventKey="favorite">
                  Favorite ({favoriteTasks.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="all">
                {tasks.map((el) => (
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
                {favoriteTasks.map((el) => (
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
