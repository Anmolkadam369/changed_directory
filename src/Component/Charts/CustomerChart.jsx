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

const CustomerChart = ({ aspect, title }) => {
    const [customerData, setCustomerData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        getCustomerData();
    }, []);

    useEffect(() => {
        const customerByMonth = Array(12).fill(0);
        customerData.forEach((customer) => {
            const date = new Date(customer.systemDate);
            const month = date.getMonth();
            customerByMonth[month]++;
        });

        const formattedData = customerByMonth.map((count, index) => ({
            name: new Date(0, index).toLocaleString('default', { month: 'short' }),
            Total: count,
        }));

        setLineData(formattedData);
    }, [customerData]);

    const getCustomerData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/getCustomer/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
            setCustomerData(response.data.data);
        } catch (error) {
            console.error("Error fetching customer data", error);
        }
    };

    return (
        // <div className="chart">
        //     <div className="chart-title">Customer</div>
        //     <ResponsiveContainer width="100%" aspect={aspect}>
        //         <AreaChart
        //             data={lineData}
        //             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        //         >
        //             <defs>
        //                 <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
        //                     <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        //                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        //                 </linearGradient>
        //             </defs>
        //             <XAxis dataKey="name" stroke="gray" />
        //             <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        //             <Tooltip />
        //             <Area
        //                 type="monotone"
        //                 dataKey="Total"
        //                 stroke="#8884d8"
        //                 fillOpacity={1}
        //                 fill="url(#total)"
        //             />
        //         </AreaChart>
        //     </ResponsiveContainer>
        // </div>

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
<p style={{fontSize:"10px", color:'green'}}>Customers</p>
</div>

    );
};

export default CustomerChart;
