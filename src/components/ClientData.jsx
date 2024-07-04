import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modalform from './Modalform';
import { Table, Button } from 'antd';
import '../css/ClientData.css';

const { Column } = Table;

const ClientData = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [id, setId] = useState();

  const { clientId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/all-planes-data/${clientId}`);
        setData(response.data.data);
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
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete user');
    }
  };

  const handleUpdate = (item, id) => {
    setSelectedItem(item);
    setId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 50 },
    { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 150 },
    { title: 'Company Name', dataIndex: 'company', key: 'company', width: 150 },
    { title: 'Plan Name', dataIndex: 'plan', key: 'plan', width: 150 },
    { title: 'Social Media Links', dataIndex: 'links_to_social_media', key: 'links_to_social_media', width: 150 },
    { title: 'Target Audience', dataIndex: 'target_audience', key: 'target_audience', width: 150 },
    { title: 'Access_and_Permissions', dataIndex: 'access_and_permissions', key: 'access_and_permissions', width: 150 },
    { title: 'Reference Sides', dataIndex: 'reference_sites', key: 'reference_sites', width: 150 },
    { title: 'Animation', dataIndex: 'animation', key: 'animation', width: 150 },
    { title: 'Website Platform', dataIndex: 'Platform_of_the_website', key: 'Platform_of_the_website', width: 150 },
    { title: 'Client Website', dataIndex: 'Website_of_the_client', key: 'Website_of_the_client', width: 150 },
    { title: 'Competitor Website', dataIndex: 'competitor_website_reference', key: 'competitor_website_reference', width: 150 },
    { title: 'Current SEO Effort', dataIndex: 'current_SEO_Efforts', key: 'current_SEO_Efforts', width: 150 },
    { title: 'Images Drive Link', dataIndex: 'drive_link_to_reference_images', key: 'drive_link_to_reference_images', width: 150 },
    { title: 'Product Design', dataIndex: 'product_design', key: 'product_design', width: 150 },
    { title: 'Reference Logo', dataIndex: 'reference_logos', key: 'reference_logos', width: 150 },
    { title: 'Reference Template', dataIndex: 'reference_template', key: 'reference_template', width: 150 },
    { title: 'Reference Website', dataIndex: 'reference_websites', key: 'reference_websites', width: 150 },
    {
      title: 'Link to Graphics',
      dataIndex: 'Link_to_Graphics',
      key: 'Link_to_Graphics',
      width: 150,
      render: (text) => (
        <a href={text} target='_blank' rel='noopener noreferrer'>
          {renderValue(text)}
        </a>
      ),
    },
    { title: 'Description', dataIndex: 'description', key: 'description', className: 'desc' },
    { title: 'Functionalities', dataIndex: 'functionalities', key: 'functionalities', width: 200 },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (text) => <span>{formatCreatedAt(renderValue(text))}</span>,
    },
    { title: 'Order Updated Date', dataIndex: 'updated_at', key: 'updated_at', width: 150 },
    { title: 'Order Status', dataIndex: 'status', key: 'status', width: 150 },
  ];

  return (
    <div style={{ overflowY: 'scroll', height: '88vh' }}>
      {Object.keys(data).map((key) => (
        <div key={key} className='client-main'>
          <>
            <h2 className='clientH2'>{key}</h2>
            <Table dataSource={data[key]} pagination={false} rowKey="id">
              {columns.map((column) => {
                const dataIndex = column.dataIndex;
                if (data[key].every((item) => renderValue(item[dataIndex]) === 'nil')) {
                  return null;
                }
                return (
                  <Column
                    key={column.key}
                    title={column.title}
                    dataIndex={column.dataIndex}
                    width={column.width}
                    className={column.className}
                    render={column.render}
                  />
                );
              })}
              <Column
                title="Action"
                key="action"
                width={120}
                render={(text, record) => (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button
                      style={{ backgroundColor: '#74bed7', color: 'white', border: 'none' }}
                      onClick={() => handleUpdate(record, record.id)}
                    >
                      Update
                    </Button>
                    <Button
                      style={{ backgroundColor: '#74bed7', color: 'white', border: 'none' }}
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              />
            </Table>
          </>
        </div>
      ))}
      <Modalform isOpened={showModal} heading='Update Data' handleClose={handleCloseModal} formData={selectedItem} id={id} />
    </div>
  );
};

export default ClientData;
