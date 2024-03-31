import React, { Component } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

class ContactCard extends Component {
  render() {
    const {
      id,
      firstName,
      lastName,
      favorite,
      relationship,
      phoneNumber,
      colors,
      toggleFavorite,
      handleDelete,
      handleEdit,
    } = this.props;
    return (
      <Card className="my-3">
        <Card.Body>
          <Row>
            <Col sm={8}>
              <Card.Title>
                {firstName} {lastName}
                <Badge className="mx-3" pill bg={colors[relationship]}>
                  {relationship}
                </Badge>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {phoneNumber}
              </Card.Subtitle>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-end gap-2"
              sm={4}
            >
              {favorite ? (
                <svg
                  onClick={() => toggleFavorite(id)}
                  style={{ cursor: "pointer" }}
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                >
                  <g transform="translate(0 -1028.4)">
                    <path
                      d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                      fill="#e74c3c"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  onClick={() => toggleFavorite(id)}
                  style={{ cursor: "pointer" }}
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.528a6 6 0 0 0-8.243 8.715l6.829 6.828a2 2 0 0 0 2.828 0l6.829-6.828A6 6 0 0 0 12 4.528zm-1.172 1.644l.465.464a1 1 0 0 0 1.414 0l.465-.464a4 4 0 1 1 5.656 5.656L12 18.657l-6.828-6.829a4 4 0 0 1 5.656-5.656z"
                    fill="#0D0D0D"
                  />
                </svg>
              )}
              <Button variant="primary" onClick={() => handleEdit(id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ContactCard;
