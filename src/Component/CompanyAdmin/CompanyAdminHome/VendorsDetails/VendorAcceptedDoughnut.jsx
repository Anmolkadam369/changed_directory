import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const VendorAccpetedDoughnut = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: "Vendors",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",   // Accepted
          "rgba(255, 99, 132, 1)",  // Rejected
          "rgba(54, 162, 235, 1)",  // Other
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [newResponseData, setNewResponseData] = useState([]);
  const [selectedType, setSelectedType] = useState("advocate");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateDoughnutData();
  }, [newResponseData, selectedType]);

  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allVendorDataWithCustomerName/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    if (response && response.data.message !== "No accident vehicle data found.") {
      setNewResponseData(response.data.data);
    }
  };

  const isvendoraccepted = (data, selectedType) => {
    const vendorCounts = {
      accepted: 0,
      rejected: 0,
      other: 0,
    };

    data.forEach((item) => {
      const vendorDataArray = item[`${selectedType}Data`] || [];
      vendorDataArray.forEach((vendorData) => {
        if (vendorData.acceptedByAdmin === "accept") {
          vendorCounts.accepted++;
        } else if (vendorData.acceptedByAdmin === "reject") {
          vendorCounts.rejected++;
        } else {
          vendorCounts.other++;
        }
      });
    });

    return vendorCounts;
  };

  const updateDoughnutData = () => {
    const vendorCounts = isvendoraccepted(newResponseData, selectedType);

    setDoughnutData({
      labels: ["Accepted", "Rejected", "Other"],
      datasets: [
        {
          label: "Vendors",
          data: [vendorCounts.accepted, vendorCounts.rejected, vendorCounts.other],
          backgroundColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
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
      <div className="dropdown" style={{ display: 'flex' }}>
        <p style={{ fontSize: "13px", padding: '4px', marginTop: '6px' }}>Select Your Vendor</p>
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded={showDropdown}
          onClick={toggleDropdown}
          style={{ background: "lightblue", padding: "4px", borderRadius: "10px", width: "100px", fontSize: "12px" }}
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
        <h3 className="chart-title">Get Accepted Vendors By Types</h3>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  );
};

export default VendorAccpetedDoughnut;