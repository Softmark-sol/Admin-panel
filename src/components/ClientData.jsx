import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ClientData.css";

const ClientData = () => {
  const [data, setData] = useState({}); 

  const { clientId } = useParams();
  console.log("clientId", clientId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/all-planes-data/${clientId}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clientId]); 

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); 
  };

  const renderValue = (value) => {
    return value !== null && value !== undefined && value !== "" ? value : "nil";
  };

  return (
    <div style={{ overflowY: "scroll", height: "88vh" }}>
      {Object.keys(data).map((key) => (
        <div key={key} className="client-main">
          <>
            <h2 className="clientH2">{key}</h2>
            {data[key].map((item, index) => (
              <div key={index}>
                {Object.keys(item).map((itemKey) => (
                  <div key={itemKey} className="client-subMain">
                    {itemKey === "updated_at" ? null : (
                      <>
                        {itemKey === "Link_to_Graphics" ? (
                          <>
                            <span className="keys">{itemKey}: </span>
                            <a
                              href={item[itemKey]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {renderValue(item[itemKey])}
                            </a>
                          </>
                        ) : itemKey === "functionalities" ? (
                          <>
                            <span className="keys">{itemKey}: </span>
                            <ul>
                              {item[itemKey].map((func, idx) => (
                                <li key={idx}>{renderValue(func.trim())}</li>
                              ))}
                            </ul>
                          </>
                        ) : itemKey === "created_at" ? (
                          <>
                            <span className="keys">{itemKey}: </span>
                            <span>{formatCreatedAt(renderValue(item[itemKey]))}</span>
                          </>
                        ) : (
                          <>
                            <span className="keys">{itemKey}: </span>
                            <span>{renderValue(item[itemKey])}</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <hr />
          </>
        </div>
      ))}
    </div>
  );
};

export default ClientData;
