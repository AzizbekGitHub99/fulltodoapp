import React, { Component, Fragment } from "react";
import { Alert, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import ContactCard from "../card/ContactCard";

class ContactList extends Component {
  render() {
    const {
      result,
      colors,
      toggleFavorite,
      handleDelete,
      handleEdit,
      listChange,
      sortBy,
      search,
      filterBy,
    } = this.props;

    let favoriteContacts = result.filter((el) => el.favorite);

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
          <Container>
            <Row>
              <Col>
                <Form.Control
                  onChange={listChange}
                  value={search}
                  id="search"
                  type="text"
                  placeholder="Search..."
                />
              </Col>
              <Col md="auto">
                <Form.Select
                  onChange={listChange}
                  value={filterBy}
                  id="filterBy"
                  aria-label="Filter"
                >
                  <option value="">All</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="relatives">Relatives</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Col>
              <Col xs lg="2">
                <Form.Select
                  onChange={listChange}
                  value={sortBy}
                  id="sortBy"
                  aria-label="Sort"
                >
                  <option value="">Sort by</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </Form>
        <Tab.Container id="tabs" defaultActiveKey="all">
          <Row>
            <Nav variant="pills" className="w-100">
              <Nav.Item className="text-center col-6">
                <Nav.Link eventKey="all">All ({result.length})</Nav.Link>
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
                {result.length ? (
                  ""
                ) : (
                  <Alert className="my-3" variant="info">
                    No Contacts
                  </Alert>
                )}
                {result.map((el) => (
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
