import React, { Component, Fragment } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";


class ContactForm extends Component {

  render() {
    const { validated, contact, handleValue, selected, handleSubmit } = this.props;

    return (
      <Fragment>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="my-4 mx-auto col-md-12 col-lg-6"
        >
          <FloatingLabel
            controlId="firstName"
            label="First Name"
            className="mb-3"

          >
            <Form.Control required type="text" placeholder="First Name" onChange={handleValue} value={contact.firstName} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please fill!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="lastName"
            label="Last Name"
          >
            <Form.Control required type="text" placeholder="Last Name" onChange={handleValue} value={contact.lastName} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please fill!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="relationship"
            label="Choose relationship"
          >
            <Form.Select required aria-label="Choose relationship" onChange={handleValue} value={contact.relationship} >
              <option value="other">Other</option>
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="relatives">Relatives</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please fill!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="phoneNumber"
            label="Phone Number"
            required
          >
            <Form.Control required type="number" placeholder="Phone Number" onChange={handleValue} value={contact.phoneNumber} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please fill!</Form.Control.Feedback>
          </FloatingLabel>
          <Button type="submit" className="mb-2 w-100">
            {selected === null ? "Add Contact" : "Save Changes"}
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default ContactForm;
