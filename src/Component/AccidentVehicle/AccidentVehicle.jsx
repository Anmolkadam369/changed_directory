import React, { useState, useEffect } from 'react';
import './AccidentVehicle.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState, userIdState } from '../Auth/Atoms';
import backendUrl from '../../environment';
import { Helmet } from 'react-helmet-async';
import EditAccidentVehicle from "../EditAccidentVehicle/EditAccidentVehicle"

const AccidentVehicle = () => {
  const [data, setData] = useState([]);
  const [marginLeft, setMarginLeft] = useState('30px');
  const [paddingLeft, setPaddingLeft] = useState('30px');
  const [width, setWidth] = useState('100%');
  const navigate = useNavigate();
  const location = useLocation();
  const token = useRecoilValue(tokenState);
  const userId = useRecoilValue(userIdState);

  const [showEditAccidentVehicle, setShowEditAccidentVehicle] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if(!showEditAccidentVehicle) getData();
    if (token === "" || userId === "") {
      navigate("/");
    }
  }, [token, userId, navigate, showEditAccidentVehicle]);

  const getData = async () => {
    const response = await axios.get(`${backendUrl}/api/getVehicleToAssignVendor`);
    setData(response.data.data);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const view = (id) => {
    setSelectedId(id);
    setShowEditAccidentVehicle(true)
    // navigate("../EditAccidentVehicle", { state: { id } });
  };

  const handleUpdate = () => {
    setShowEditAccidentVehicle(false); // Hide VendorMasterEdit
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 630) {
        setMarginLeft('0px');
        setPaddingLeft('5px');
        setWidth('70%');
      } else {
        setMarginLeft('30px');
        setPaddingLeft('30px');
        setWidth('100%');
      }
    };
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
    {!showEditAccidentVehicle && (<div className="Customer-master-form" style={{ marginLeft, paddingLeft }}>
      <Helmet>
        <title>Accident Vehicle Service - Claimpro</title>
        <meta name="description" content="Accident Vehicle Service." />
        <meta name="keywords" content="Vehicle Accidents, accident trucks, Customer Service, Claimpro, Claim pro Assist, Bvc Claimpro Assist, Accidental repair, Motor Insurance claim, Advocate services, Crane service, On site repair, Accident Management" />
        <link rel='canonical' href={`https://claimpro.in/AccidentVehicle`} />
      </Helmet>
      <h3 className="bigtitle">Assign Vendor to Accident Vehicle</h3>
      <div className="responsive-table" style={{ width }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>User Name</th>
              <th>Accident File Number</th>
              <th>Selected Options</th>
              <th>Choosen Plan</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", fontWeight: "bold" }}>All Vehicles are assigned To Vendors...</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.CustomerName}</td>
                  <td>{item.accidentFileNo}</td>
                  <td>{item.selectedOptions}</td>
                  <td>{item.choosenPlan}</td>
                  <td>
                    <button onClick={() => view(item.AccidentVehicleCode)} className='view-button'>View here</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>)}
    {showEditAccidentVehicle && (
      <EditAccidentVehicle id={selectedId} onUpdate={handleUpdate}/>
    )}
    </div>
  );
};

export default AccidentVehicle;
