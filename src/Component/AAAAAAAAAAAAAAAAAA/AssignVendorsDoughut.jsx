import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import backendUrl from "../../environment";

const countVendors = (data) => {
  const vendorCounts = {};

  data.forEach((item) => {
    ["mechanic", "crane", "advocate", "workshop"].forEach((type) => {
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

const AssignVendorsDoughnut = () => {
  const [newResponseData, setNewResponseData] = useState([]);
  const [selectedType, setSelectedType] = useState("mechanic");
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "Vendors",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateDoughnutData();
  }, [newResponseData, selectedType]);

  const getData = async () => {
    const response = await axios ({
      method : "GET",
      url : `${backendUrl}/api/vendorResponse/${userId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response && response.message !== "No accident vehicle data found.") {
      setNewResponseData(response.data.data);
    }
  };

  const updateDoughnutData = () => {
    const vendorCounts = countVendors(newResponseData);
    const filteredVendors = vendorCounts
      .filter((item) => item.type === selectedType)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    setDoughnutData({
      labels: filteredVendors.map((vendor) => vendor.vendorId),
      datasets: [
        {
          label: "Vendors",
          data: filteredVendors.map((vendor) => vendor.count),
          backgroundColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const handleTypeChange = (e, type) => {
    e.preventDefault();
    setSelectedType(type);
    setShowDropdown(false);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
        <div className="dropdown" style={{display:'flex'}}>
          <p style={{ fontSize: "13px", padding: '4px',marginTop: '6px' }}>Select Your Vendor</p>
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
      <div className="chart-item" style={{ marginRight: "15px" }}>
        <h3 className="chart-title">Vendor Types</h3>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default AssignVendorsDoughnut;
