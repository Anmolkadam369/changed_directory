import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import backendUrl from '../../environment';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MostNumberOfVehicle = () => {
  const [newAccidentData, setData] = useState([]);
  const [expandTable, setExpandTable] = useState(false);
  const [height, setHeight] = useState('400px');


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(`${backendUrl}/api/mostNumberOfVehicle`);
    console.log("response", response);
    const sortedData = response.data.data.sort((a,b) => b.NumberOfVehicles - a.NumberOfVehicles);
    if (response && response.message !== "No accident vehicle data found.") setData(sortedData);
  };

  const toggleExpandTable = () => {
    setExpandTable(!expandTable);
  };

  const colors = ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'];
  const borderColors = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'];


  const displayedData = expandTable ? newAccidentData.slice(0, 15) : newAccidentData.slice(0, 10);

  const data = {
    labels: displayedData.map(item => item.CustomerName),
    datasets: [
      {
        label: '',
        data: displayedData.map(item => item.NumberOfVehicles),
        backgroundColor: displayedData.map((_, index) => colors[index % colors.length]),
        borderColor: displayedData.map((_, index) => borderColors[index % borderColors.length]),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Most Number Of Vehicles Per Customer',
      }
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 8,
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 7,
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setHeight('200px');
      }else if(window.innerWidth <= 670){
        setHeight("300px");
      }else {
        setHeight('400px');
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="chart-container" style={{ marginTop: "40px", height}}>
      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
        <div style={{ fontSize: "14px" }}>
          <p>Most Number Of Vehicles</p>
        </div>
        <p
          style={{
            fontSize: "6px",
            padding: '5px',
            color: "green",
            marginTop: '6px',
            marginLeft: "auto",
            cursor: "pointer"
          }}
          onClick={toggleExpandTable}
        >
          {expandTable ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        </p>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MostNumberOfVehicle;
