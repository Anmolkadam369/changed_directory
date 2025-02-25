import React, { useEffect, useState } from "react";
import "./Chart.css";
import axios from 'axios';
import backendUrl from '../../environment';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FullyAssignedVendorsHere = ({ aspect, title }) => {
    const [vendorData, setVendorData] = useState([]);
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        getVendorData();
    }, []);

    useEffect(() => {
        const vendorsByMonth = Array(12).fill(0);
        vendorData.forEach((vendor) => {
            const date = new Date(vendor.systemDate);
            const month = date.getMonth();
            vendorsByMonth[month]++;
        });

        const formattedData = vendorsByMonth.map((count, index) => ({
            name: new Date(0, index).toLocaleString('default', { month: 'short' }),
            Total: count,
        }));

        setLineData(formattedData);
    }, [vendorData]);

    const getVendorData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getFullyAssigedVehicles`);
            setVendorData(response.data.data);
        } catch (error) {
            console.error("Error fetching vendor data", error);
        }
    };

    return (
    

<div className="chart-container">
<ResponsiveContainer width="100%" aspect={aspect}>
  <AreaChart
    data={lineData}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" stroke="gray" />
    <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="Total"
      stroke="#8884d8"
      fillOpacity={1}
      fill="url(#total)"
    />
  </AreaChart>
</ResponsiveContainer>
<p style={{fontSize:"10px", color:'green'}}>Fully Assigned Vendors</p>

</div>

        
    );
};

export default FullyAssignedVendorsHere;
