// import React, { useEffect, useState } from "react";
// import "./Table.css";
// import "../VenderMaster/VendorMasterForm.css"
// import axios from 'axios';
// import backendUrl from '../../environment';
// import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
// import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

// const countVendors = (data) => {
//   const vendorCounts = {};

//   data.forEach((item) => {
//     ['mechanic', 'crane', 'advocate', 'workshop'].forEach((type) => {
//       const vendorId = item[type];
//       if (vendorId) {
//         if (!vendorCounts[vendorId]) {
//           vendorCounts[vendorId] = {
//             vendorId,
//             type,
//             count: 0,
//           };
//         }
//         vendorCounts[vendorId].count += 1;
//       }
//     });
//   });

//   return Object.values(vendorCounts);
// };


// const AssignedVendorsTable = () => {
//   const [newResponseData, setData] = useState([]);
//   const [expandTable, setExpandTable] = useState(false);
//   const [selectedType, setSelectedType] = useState('mechanic');
//   const [showDropdown, setShowDropdown] = useState(false);
//   useEffect(() => {
//     getData()
//   }, [])

//   const getData = async (e) => {
//     const response = await axios.get(`${backendUrl}/api/vendorResponse`);
//     console.log("response", response);
//     if (response && response.message !== "No accident vehicle data found.") setData(response.data.data)
//   };

//   const toggleExpandTable = () => {
//     setExpandTable(!expandTable)
//   }
//   const handleTypeChange = (e, type) => {
//     e.preventDefault();
//     setSelectedType(type);
//     setShowDropdown(false);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const vendorCounts = countVendors(newResponseData);
//   const filteredVendors = vendorCounts
//     .filter(item => item.type === selectedType)
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 5);


//   return (
//     <div className="some-table-container" >
//       <p style={{ fontSize: "13px", color: "purple" }}>Vendor Information By Most Number Of Vehicle Assigned</p>
//       <div style={{ display: 'flex' }}>
//         <div className="dropdown green-dropdown form-field" style={{ marginBottom: '10px' }}>
//         <button
//           className="form-field input-group mb-3"
//           type="button"
//           id="dropdownMenuButton"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//           onClick={toggleDropdown}
//           style={{background:"lightblue", padding:"4px", borderRadius:"10px"}}
//         >
//           {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
//         </button>
//         <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
//           <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "advocate")}>Advocate</a></li>
//           <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "crane")}>Crane</a></li>
//           <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "mechanic")}>Mechanic</a></li>
//           <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "workshop")}>Workshop</a></li>
//         </ul>
//       </div>
//         <p style={{ fontSize: "10px", padding: '5px', color: "blue", marginTop: '6px', marginLeft: "auto", cursor: "pointer" }} onClick={toggleExpandTable}>  {expandTable ? <UnfoldLessIcon /> : <UnfoldMoreIcon />} </p>
//       </div>
//       <table className="some-table" style={{marginTop:"0px"}}>
//         <thead>
//           <tr>
//             <th>Sr.No</th>
//             <th>Vendor Type</th>
//             <th>Vendor</th>
//             <th>Assigned Vehicles</th>
//           </tr>
//         </thead>
//         <tbody>
//           {(expandTable ? filteredVendors : filteredVendors.slice(0, 10)).map((item, index) => (
//             <tr key={index}>
//               <td style={{ fontSize: '10px', padding: '5px' }}>{index + 1}</td>
//               <td style={{ fontSize: '10px', padding: '5px' }}><span className="badge">{item.type}</span></td>
//               <td style={{ fontSize: '10px', padding: '5px' }}>{item.vendorId}</td>
//               <td style={{ fontSize: '10px', padding: '5px' }}>{item.count}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssignedVendorsTable;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import backendUrl from '../../environment';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const countVendors = (data) => {
  const vendorCounts = {};

  data.forEach((item) => {
    ['mechanic', 'crane', 'advocate', 'workshop'].forEach((type) => {
      const vendorId = item[type];
      if (vendorId) {
        if (!vendorCounts[vendorId]) {
          vendorCounts[vendorId] = {
            vendorId,
            type,
            count: 0,
          };
        }
        vendorCounts[vendorId].count += 1;
      }
    });
  });

  return Object.values(vendorCounts);
};

const AssignedVendorsTable = () => {
  const [newResponseData, setData] = useState([]);
  const [expandChart, setExpandChart] = useState(false);
  const [selectedType, setSelectedType] = useState('crane');
  const [showDropdown, setShowDropdown] = useState(false);
  const [height, setHeight] = useState('400px');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`${backendUrl}/api/vendorResponse`);
    if (response && response.data.message !== "No accident vehicle data found.") {
      setData(response.data.data);
    }
  };

  const toggleExpandChart = () => {
    setExpandChart(!expandChart);
  };

  const handleTypeChange = (e, type) => {
    e.preventDefault();
    setSelectedType(type);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const vendorCounts = countVendors(newResponseData);
  const filteredVendors = vendorCounts
    .filter(item => item.type === selectedType)
    .sort((a, b) => b.count - a.count)
    .slice(0, Math.max(5, expandChart ? vendorCounts.length : 5)); // Ensure at least 5 items

  const colors = ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'];
  const borderColors = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'];

  const data = {
    labels: filteredVendors.map(item => ""),
    datasets: [
      {
        label: 'Assigned Vehicles',
        data: filteredVendors.map(item => item.count),
        backgroundColor: filteredVendors.map((_, index) => colors[index % colors.length]),
        borderColor: filteredVendors.map((_, index) => borderColors[index % borderColors.length]),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        // text: `Assigned Vehicles for ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // Adjust the font size
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14, // Adjust the font size
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setHeight('200px');
      } else if (window.innerWidth <= 670) {
        setHeight('300px');
      } else {
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
    <div className="chart-container" style={{ marginBottom:"100px", height, marginTop:"20px" }}>
     {/* <div style={{ display: 'flex' }}> */}
     <p style={{ fontSize: "13px", color: "purple" }}>Vendor Information By Most Number Of Vehicle Assigned</p>
     <div className="dropdown" style={{display:'flex', justifyContent:"center", marginTop:"10px"}}>
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded={showDropdown}
            onClick={toggleDropdown}
            style={{ background: "lightblue", padding: "4px", borderRadius: "10px", width: "100px", fontSize:"12px" }}
          >
            {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
          </button>
          <ul className={`dropdown-menu${showDropdown ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "advocate")}>Advocate</a></li>
            <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "crane")}>Crane</a></li>
            <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "mechanic")}>Mechanic</a></li>
            <li><a className="dropdown-item" href="#" onClick={(e) => handleTypeChange(e, "workshop")}>Workshop</a></li>
          </ul>
        </div>
    {/* </div> */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default AssignedVendorsTable;
