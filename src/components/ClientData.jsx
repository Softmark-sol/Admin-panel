
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const ClientData = () => {

    const[data,setData]=useState('');

    const {clientId}=useParams()
    console.log('clientId',clientId)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/all-planes-data/${clientId}`
            );
            console.log(response.data.data);
            setData(response.data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [clientId]);
  return (
    <div>
      client data
    </div>
  )
}

export default ClientData
