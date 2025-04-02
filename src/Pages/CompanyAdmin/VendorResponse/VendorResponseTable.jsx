import React, { useState, useEffect } from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import axios from 'axios';
import  '../../../Component/CompanyAdmin/CompanyAdminHome/CustomerAdminDashboard/Table.css';

const VendorResponseTable = () => {
  const [newResponseData, setData] = useState([]);
  console.log("newResponseData", newResponseData)
  const [selectedType, setSelectedType] = useState("mechanic");
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandTable, setExpandTable] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allVendorDataWithCustomerName/${userId}`, { headers: { Authorization: `Bearer ${token}` }});
    if (response && response.message !== "No accident vehicle data found.") {
      setData(response.data.data);
    }
  };

  const toggleExpandTable = () => {
    setExpandTable(!expandTable);
  };

  const handleTypeChange = (e, type) => {
    e.preventDefault();
    setSelectedType(type);
    setShowDropdown(false);
  };
  const toggleDropdown = () => {
    console.log("showdorp", showDropdown)
    setShowDropdown(!showDropdown);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const weekday = date.toLocaleString('default', { weekday: 'long' });

    // Determine the ordinal suffix for the day
    const getOrdinalSuffix = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${weekday}`;
  };


  return (
    <div className={`some-table-container ${expandTable ? 'expanded' : ''}`}>


      <div style={{ display: 'flex', marginTop: "30px" }}>
        <p style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
          <CheckCircleOutlineOutlinedIcon /> Response
        </p>
        <p style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
          <CancelOutlinedIcon /> Not_Responded
        </p>
        <p style={{ fontSize: "10px", padding: '5px', color: "blue", marginTop: '6px' }}>
          ___ Not_Assigned
        </p>
        <div className="dropdown">
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
        <p
          style={{
            fontSize: "10px",
            padding: '5px',
            color: "blue",
            marginTop: '6px',
            marginLeft: "auto",
            cursor: "pointer"
          }}
          onClick={toggleExpandTable}
        >

          {expandTable ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        </p>
      </div>

      <table className="some-table" style={{ marginTop: "0px" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Added Date</th>
            <th>Customer</th>
            <th>Active</th>
            <th>Type Of Customer</th>
            <th>Vehicle No</th>

            {selectedType === "mechanic" && (
              <>
                <th>Mechanic</th>
                <th style={{ color: 'rgba(255, 99, 132, 1)' }}>Accepted</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Vendor Comm</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Paid On</th>
              </>)}

            {selectedType === "crane" && (
              <>
                <th>Crane</th>
                <th style={{ color: 'rgba(255, 99, 132, 1)' }}>Accepted</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Vendor Comm</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Paid On</th>
              </>)}

            {selectedType === "advocate" && (
              <>
                <th>Advocate</th>
                <th style={{ color: 'rgba(255, 99, 132, 1)' }}>Accepted</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Vendor Comm</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Paid On</th>
              </>
            )}
            {selectedType === "workshop" && (
              <>
                <th>Workshop</th>
                <th style={{ color: 'rgba(255, 99, 132, 1)' }}>Accepted</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Vendor Comm</th>
                <th style={{ color: 'rgba(54, 162, 235, 1)' }}>Paid On</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {(expandTable ? newResponseData : newResponseData.slice(0, 4)).map((item, index) => (
            <tr key={index}>
              <td style={{ fontSize: "10px", padding: '5px' }}>{index + 1}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{formatDate(item.systemDate)}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{item.CustomerName}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px', color: "teal" }}>{item.isActive ? <CheckCircleOutlineOutlinedIcon /> : <CancelOutlinedIcon />}</td>
              <td data-label="Fullname" style={{ fontSize: "10px", padding: '5px' }}>{item.CustomerType}</td>
              <td data-label="ChoosenPlan" style={{ fontSize: "10px", padding: '5px' }}>
                <span className="badge">{item.vehicleNumber}</span>
              </td>
              {selectedType === "mechanic" && (
                <>
                  <td>
                    {item.mechanic === "" || item.mechanic === null ? (
                      item.mechanicData.length === 0 ? (
                        "__"
                      ) : (
                        <CancelOutlinedIcon />
                      )
                    ) : item.mechanicData.length !== 0 ? (
                      <div>
                        <CheckCircleOutlineOutlinedIcon />
                      </div>
                    ) : (
                      <CancelOutlinedIcon />
                    )}
                  </td>

                  <td>
                    {item.mechanicData.length === 0 ? (
                      "__"
                    ) : (
                      item.mechanicData[0].acceptedByAdmin === "reject" ? (
                        <div>
                          <CancelOutlinedIcon />
                        </div>
                      ) : (
                        item.mechanicData[0].acceptedByAdmin === null || item.mechanicData[0].acceptedByAdmin === undefined ? (
                          "__"
                        ) : (
                          <CheckCircleOutlineOutlinedIcon />
                        )))}
                  </td>

                  <td style={{ fontSize: "10px", padding: '5px', color: "orange" }}>
                    {item.mechanicData.length === 0 ? (
                      "__"
                    ) : (
                      item.mechanicData[0].onlinePaymentImg !== null &&
                        item.mechanicData[0].paidByCash !== null &&
                        item.mechanicData[0].transactionId !== null &&
                        item.mechanicData[0].cheque !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.mechanicData[0].onlinePaymentImg === null &&
                          item.mechanicData[0].paidByCash === null &&
                          item.mechanicData[0].transactionId === null &&
                          item.mechanicData[0].cheque === null ? (
                          <CancelOutlinedIcon />
                        )
                          : (
                            <div>
                              <CheckCircleOutlineOutlinedIcon />
                            </div>
                          )
                      ))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
                    {item.mechanicData.length === 0 ? (
                      "__"
                    ) : (
                      item.mechanicData[0].paidOn !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.mechanicData[0].paidOn === null && (
                          <CancelOutlinedIcon />
                        )
                      )
                    )}
                  </td>
                </>
              )}

              {selectedType === "crane" && (
                <>
                  <td>
                    {item.crane === "" || item.crane === null ? (
                      item.craneData.length === 0 ? (
                        "__"
                      ) : (
                        <CancelOutlinedIcon />
                      )
                    ) : item.craneData.length !== 0 ? (
                      <div>
                        <CheckCircleOutlineOutlinedIcon />
                      </div>
                    ) : (
                      <CancelOutlinedIcon />
                    )}
                  </td>
                  <td>
                    {item.craneData.length === 0 ? (
                      "__"
                    ) : (
                      item.craneData[0].acceptedByAdmin === "reject" ? (
                        <div>
                          <CancelOutlinedIcon />
                        </div>
                      ) : (
                        item.craneData[0].acceptedByAdmin === null || item.craneData[0].acceptedByAdmin === undefined ? (
                          "__"
                        ) : (
                          <CheckCircleOutlineOutlinedIcon />
                        )))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "orange" }}>
                    {item.craneData.length === 0 ? (
                      "__"
                    ) : (
                      item.craneData[0].onlinePaymentImg !== null &&
                        item.craneData[0].paidByCash !== null &&
                        item.craneData[0].transactionId !== null &&
                        item.craneData[0].cheque !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.craneData[0].onlinePaymentImg === null &&
                          item.craneData[0].paidByCash === null &&
                          item.craneData[0].transactionId === null &&
                          item.craneData[0].cheque === null ? (
                          <CancelOutlinedIcon />
                        )
                          : (
                            <div>
                              <CheckCircleOutlineOutlinedIcon />
                            </div>
                          )
                      ))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
                    {item.craneData.length === 0 ? (
                      "__"
                    ) : (
                      item.craneData[0].paidOn !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.craneData[0].paidOn === null && (
                          <CancelOutlinedIcon />
                        )
                      )
                    )}
                  </td>
                </>
              )}

              {selectedType === "advocate" && (
                <>
                  <td>
                    {item.advocate === "" || item.advocate === null ? (
                      item.advocateData.length === 0 ? (
                        "__"
                      ) : (
                        <CancelOutlinedIcon />
                      )
                    ) : item.advocateData.length !== 0 ? (
                      <div>
                        <CheckCircleOutlineOutlinedIcon />
                      </div>
                    ) : (
                      <CancelOutlinedIcon />
                    )}
                  </td>
                  <td>
                    {item.advocateData.length === 0 ? (
                      "__"
                    ) : (
                      item.advocateData[0].acceptedByAdmin === "reject" ? (
                        <div>
                          <CancelOutlinedIcon />
                        </div>
                      ) : (
                        item.advocateData[0].acceptedByAdmin === null || item.advocateData[0].acceptedByAdmin === undefined ? (
                          "__"
                        ) : (
                          <CheckCircleOutlineOutlinedIcon />
                        )))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "orange" }}>
                    {item.advocateData.length === 0 ? (
                      "__"
                    ) : (
                      item.advocateData[0].onlinePaymentImg !== null &&
                        item.advocateData[0].paidByCash !== null &&
                        item.advocateData[0].transactionId !== null &&
                        item.advocateData[0].cheque !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.advocateData[0].onlinePaymentImg === null &&
                          item.advocateData[0].paidByCash === null &&
                          item.advocateData[0].transactionId === null &&
                          item.advocateData[0].cheque === null ? (
                          <CancelOutlinedIcon />
                        )
                          : (
                            <div>
                              <CheckCircleOutlineOutlinedIcon />
                            </div>
                          )
                      ))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
                    {item.advocateData.length === 0 ? (
                      "__"
                    ) : (
                      item.advocateData[0].paidOn !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.advocateData[0].paidOn === null && (
                          <CancelOutlinedIcon />
                        )
                      )
                    )}
                  </td>
                </>
              )}

              {selectedType === "workshop" && (
                <>
                  <td>
                    {item.workshop === "" || item.workshop === null ? (
                      item.workshopData.length === 0 ? (
                        "__"
                      ) : (
                        <CancelOutlinedIcon />
                      )
                    ) : item.workshopData.length !== 0 ? (
                      <div>
                        <CheckCircleOutlineOutlinedIcon />
                      </div>
                    ) : (
                      <CancelOutlinedIcon />
                    )}
                  </td>
                  <td>
                    {item.workshopData.length === 0 ? (
                      "__"
                    ) : (
                      item.workshopData[0].acceptedByAdmin === "reject" ? (
                        <div>
                          <CancelOutlinedIcon />
                        </div>
                      ) : (
                        item.workshopData[0].acceptedByAdmin === null || item.workshopData[0].acceptedByAdmin === undefined ? (
                          "__"
                        ) : (
                          <CheckCircleOutlineOutlinedIcon />
                        )))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "orange" }}>
                    {item.workshopData.length === 0 ? (
                      "__"
                    ) : (
                      item.workshopData[0].onlinePaymentImg !== null &&
                        item.workshopData[0].paidByCash !== null &&
                        item.workshopData[0].transactionId !== null &&
                        item.workshopData[0].cheque !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.workshopData[0].onlinePaymentImg === null &&
                          item.workshopData[0].paidByCash === null &&
                          item.workshopData[0].transactionId === null &&
                          item.workshopData[0].cheque === null ? (
                          <CancelOutlinedIcon />
                        )
                          : (
                            <div>
                              <CheckCircleOutlineOutlinedIcon />
                            </div>
                          )
                      ))}
                  </td>
                  <td style={{ fontSize: "10px", padding: '5px', color: "blue" }}>
                    {item.workshopData.length === 0 ? (
                      "__"
                    ) : (
                      item.workshopData[0].paidOn !== null ? (
                        <div>
                          <CheckCircleOutlineOutlinedIcon />
                        </div>
                      ) : (
                        item.workshopData[0].paidOn === null && (
                          <CancelOutlinedIcon />
                        )
                      )
                    )}
                  </td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorResponseTable;
