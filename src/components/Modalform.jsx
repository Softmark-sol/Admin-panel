import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

function Modalform({ isOpened, heading, handleClose, formData }) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    company: '',
    description: '',
    // reference_sites: '',
    Link_to_Graphics: null, // Single file
    // animation: '',
    // drive_link: '',
    // domain: '',
  });

  useEffect(() => {
    if (formData) {
      setFormValues({
        name: formData.name || '',
        email: formData.email || '',
        company: formData.company || '',
        description: formData.description || '',
        // reference_sites: formData.reference_sites || '',
        Link_to_Graphics: null, // Reset to null for new upload
        // animation: formData.animation || '',
        // drive_link: formData.drive_link || '',
        // domain: formData.domain || '',
      });
    } else {
      setFormValues({
        name: '',
        email: '',
        company: '',
        description: '',
        // reference_sites: '',
        Link_to_Graphics: null, // Reset to null for new upload
        // animation: '',
        // drive_link: '',
        // domain: '',
      });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: files[0] // Single file upload
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { id, clientId } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append('name', formValues.name);
      formDataToSend.append('email', formValues.email);
      formDataToSend.append('company', formValues.company);
      formDataToSend.append('description', formValues.description);
      // formDataToSend.append('reference_sites', formValues.reference_sites);
      // formDataToSend.append('animation', formValues.animation);
      // formDataToSend.append('domain', formValues.domain);
      // formDataToSend.append('drive_link', formValues.drive_link);

      if (formValues.Link_to_Graphics) {
        formDataToSend.append('Link_to_Graphics', formValues.Link_to_Graphics);
      }

      const response = await axios.put(`http://localhost:4000/all-planes-data/${id}/${clientId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response){
        window.location.reload()
      }

      console.log(response);
      alert('User updated successfully');
      handleClose();
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ overflowY: 'scroll', paddingRight: '20px' }} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label className='custom-text'>Name</Form.Label>
            <Form.Control
              type='input'
              placeholder='Josh Anton'
              autoFocus
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label className='custom-text'>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='name@example.com'
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='company'>
            <Form.Label className='custom-text'>Company</Form.Label>
            <Form.Control
              type='input'
              placeholder='Company'
              value={formValues.company}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label className='custom-text'>Discription</Form.Label>
            <Form.Control
              type='input'
              placeholder='Company'
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* <Form.Group className='mb-3' controlId='reference_sites'>
            <Form.Label className='custom-text'>Reference Sites</Form.Label>
            <Form.Control
              type='input'
              placeholder='XYZ, XYZ, ABC'
              value={formValues.reference_sites}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          {/* <Form.Group className='mb-3' controlId='drive_link'>
            <Form.Label className='custom-text'>Drive Link</Form.Label>
            <Form.Control
              type='input'
              placeholder='Google drive link or any drive link for graphics'
              value={formValues.drive_link}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          {/* <Form.Group className='mb-3' controlId='animation'>
            <Form.Label className='custom-text'>Animation References</Form.Label>
            <Form.Control
              type='input'
              placeholder='3 Reference sites to be added'
              value={formValues.animation}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          {/* <Form.Group className='mb-3' controlId='domain'>
            <Form.Label className='custom-text'>Domain (If purchased)</Form.Label>
            <Form.Control
              type='input'
              placeholder='www.xyz.com OR three hosting options'
              value={formValues.domain}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          <Form.Group className='mb-3' controlId='Link_to_Graphics'>
            <Form.Label className='custom-text'>Upload Link to Graphics</Form.Label>
            <Form.Control
              type='file'
              name='Link_to_Graphics'
              onChange={handleFileChange}
            />
          </Form.Group>
        
          <Modal.Footer>
            <Button
              type='submit'
              style={{ backgroundColor: '#4599B4' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#F3972B')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4599B4')}
            >
              {loading ? (
                <>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />{' '}
                  Sending...
                </>
              ) : (
                'Update Data'
              )}
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Modalform;