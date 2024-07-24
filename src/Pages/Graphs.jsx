import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import "../css/graphs.css";
import API_CONFIG from "../config/api";
import Loader from "../components/Loader/Loader";

const BarAndPieCharts = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [number, setNumber] = useState([]);
  const { apiKey } = API_CONFIG;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const barChartResponse = await axios.get(`${apiKey}/all-planes-data`);
        const data = barChartResponse.data.data;
        setNumber(data.counts);
        const { total, ...countsWithoutTotal } = data.counts;
        const formattedBarData = Object.keys(countsWithoutTotal).map((key) => ({
          name: key,
          value: countsWithoutTotal[key],
        }));
        setBarChartData(formattedBarData);
        setPieChartData(formattedBarData); // Assuming pie chart data structure is similar
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setLoading(false)
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLORS = ["#FFBB28", "#00C49F", "#0088FE", "#FF8042"]; // Different colors for bars and pie sectors

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {loading? (
                <Loader />

      ):
      number == "" ?  (
        <>
          <div className="numbers">
            <div className="num1">
              <span>Total: {number.total}</span>
            </div>
            <div className="num2">
              <span>Pending: {number.pending}</span>
            </div>
            <div className="num3">
              <span>Progress: {number.progress}</span>
            </div>
            <div className="num4">
              <span>Complete: {number.complete}</span>
            </div>
            <div className="num5">
              <span>Cancel: {number.cancel}</span>
            </div>
          </div>
          <div className="graphs">
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#065671",
                }}
              >
                Bar Chart
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="value">
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#065671",
                }}
              >
                Pie Chart
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ):(
      <p style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.2rem"}}>No Graphs Availabe!</p>
      )}
    </div>
  );
};

export default BarAndPieCharts;
