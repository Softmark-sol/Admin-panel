import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import API_CONFIG from "../config/api";
import Swal from "sweetalert2";

function Modalform({ isOpened, heading, handleClose, formData }) {
  const { apiKey } = API_CONFIG;
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    status: "",
    Link_to_Graphics: null, // Single file
  });

  useEffect(() => {
    if (formData) {
      setFormValues({
        name: formData.name || "",
        email: formData.email || "",
        company: formData.company || "",
        description: formData.description || "",
        status: formData.status || "",
        Link_to_Graphics: null, // Reset to null for new upload
      });
    } else {
      setFormValues({
        name: "",
        email: "",
        company: "",
        description: "",
        status: "",
        Link_to_Graphics: null, // Reset to null for new upload
      });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    setFormValues({
      ...formValues,
      [id || name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files[0], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { id, clientId } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("name", formValues.name);
      formDataToSend.append("email", formValues.email);
      formDataToSend.append("company", formValues.company);
      formDataToSend.append("description", formValues.description);
      formDataToSend.append("status", formValues.status);

      if (formValues.Link_to_Graphics) {
        formDataToSend.append("Link_to_Graphics", formValues.Link_to_Graphics);
      }

      const response = await axios.put(
        `${apiKey}/all-planes-data/${id}/${clientId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      const result = await Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'User updated successfully.',
      });
      handleClose();
      if (response && result.isConfirmed) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        icon: "error",
        title: "Try Again",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          style={{ overflowY: "scroll", paddingRight: "20px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="custom-text">Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Josh Anton"
              autoFocus
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="custom-text">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="company">
            <Form.Label className="custom-text">Company</Form.Label>
            <Form.Control
              type="input"
              placeholder="Company"
              value={formValues.company}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label className="custom-text">Description</Form.Label>
            <Form.Control
              type="input"
              placeholder="Company"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Label className="custom-text">Select</Form.Label>
            <Form.Select
              value={formValues.status}
              onChange={handleInputChange}
              name="status"
            >
              <option value="Pending" style={{color: "yellow"}}>Pending</option>
              <option value="Complete" style={{color: "green"}}>Completed</option>
              <option value="Progress" style={{color: "blue"}}>Progress</option>
              <option value="Cancel" style={{color: "red"}}>Cancelled</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Link_to_Graphics">
            <Form.Label className="custom-text">Upload Link to Graphics</Form.Label>
            <Form.Control
              type="file"
              name="Link_to_Graphics"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Modal.Footer>
            <Button
              type="submit"
              style={{ backgroundColor: "#4599B4" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#F3972B")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#4599B4")}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Sending...
                </>
              ) : (
                "Update Data"
              )}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Modalform;
