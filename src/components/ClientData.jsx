import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modalform from './Modalform';
import '../css/ClientData.css';

const ClientData = () => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to hold selected item for update

  const navigate = useNavigate();

  const { clientId } = useParams(); // Only get clientId from useParams
  console.log('clientId', clientId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/all-planes-data/${clientId}`);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clientId]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  const renderValue = (value) => {
    return value !== null && value !== undefined && value !== '' ? value : 'nil';
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/all-planes-data/${itemId}/${clientId}`);
      console.log(response);
      alert('User deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete user');
    }
  };

  const handleUpdate = async (item) => {
    setSelectedItem(item); // Set the item to be edited
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null); // Clear selected item when modal is closed
  };

  return (
    <div style={{ overflowY: 'scroll', height: '88vh' }}>
      {Object.keys(data).map((key) => (
        <div key={key} className='client-main'>
          <>
            <h2 className='clientH2'>{key}</h2>
            {data[key].map((item, index) => (
              <div key={index}>
                {Object.keys(item).map((itemKey) => (
                  <div key={itemKey} className='client-subMain'>
                    {itemKey === 'updated_at' ? null : (
                      <>
                        {itemKey === 'Link_to_Graphics' ? (
                          <>
                            <span className='keys'>{itemKey}: </span>
                            <a href={item[itemKey]} target='_blank' rel='noopener noreferrer'>
                              {renderValue(item[itemKey])}
                            </a>
                          </>
                        ) : itemKey === 'functionalities' ? (
                          <>
                            <span className='keys'>{itemKey}: </span>
                            <ul>
                              {item[itemKey].map((func, idx) => (
                                <li key={idx}>{renderValue(func.trim())}</li>
                              ))}
                            </ul>
                          </>
                        ) : itemKey === 'created_at' ? (
                          <>
                            <span className='keys'>{itemKey}: </span>
                            <span>{formatCreatedAt(renderValue(item[itemKey]))}</span>
                          </>
                        ) : (
                          <>
                            <span className='keys'>{itemKey}: </span>
                            <span>{renderValue(item[itemKey])}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                  <div>
                    <button className='btn' onClick={() => handleUpdate(item)}>
                      Update
                    </button>
                  </div>
                  <div>
                    <button className='btn' onClick={() => handleDelete(item.id)}> {/* Pass the correct id here */}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </>
        </div>
      ))}
      {/* Modalform component */}
      <Modalform isOpened={showModal} heading='Update Data' handleClose={handleCloseModal} formData={selectedItem} />
    </div>
  );
};

export default ClientData;
