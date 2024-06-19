import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Component/Home/Home';
import Registration from './Component/Registration/Registration';
import LoginPage from './Component/Login/LoginPage';
import Location from './Component/Location/Location'; 
import Location1 from './Component/Location1/Location1';
import UserIV from './Component/UserIV/UserIV';
import UserIV1 from './Component/UserIV1/UserIV1';
import CrainUser from './Component/CrainUser/CrainUser';
import AdvocateUser from './Component/AdvocateUser/AdvocateUser';
import AdvocateHistoryComponent from './Component/AdvocateHistoryComponent/AdvocateHistoryComponent';
import AdminInfoPage from './Component/AdminInfoPage/AdminInfoPage';
import Location2 from './Component/Location2/Location2';
import VendorMasterForm from './Component/VenderMaster/VendorMasterForm';
import VendorApporoved from './Component/VendorApproved/VendorApporoved';
import Admin from './Component/Admin/Admin';
import CustomerMasterForm from './Component/CustomerMaster/CustomerMaster';
import CustomerApproved from './Component/CustomerApporoved/CustomerApproved';
import VehicleClaimRegistration from './Component/VehicleClaimRegistration/VehicleClaimRegistration';
import ViewVehicleInfo from './Component/ViewVehicleInfo/ViewVehicleInfo';
import VendorMasterEdit from './Component/VenderMaster/VendorMasterEdit';
import CustomerMasterEdit from './Component/CustomerMaster/CustomerMasterEdit';
import VehicleClaimEdit from './Component/VehicleClaimRegistration/VehicleClaimEdit';
import VendorMasterViewOnly from './Component/VenderMaster/VendorMasterViewOnly';
import ImageUpload from './Component/ImageUpload/ImageUpload';
import User from './Component/User/User';
import AccidentVehicle from './Component/AccidentVehicle/AccidentVehicle';
import AccidentVehicleUser from './Component/AccidentVehicle/AccidentVehicleUser';
import Advocate from './Component/Vendors/Advocate';
import EditAccidentVehicle from './Component/EditAccidentVehicle/EditAccidentVehicle';
import AssignedVehicleAdvocate from './Component/Vendors/AssignedVehiclesAdvocate';
import UploadDocAdvocate from './Component/Vendors/UploadDocAdvocate';
import Machanic from './Component/Vendors/Machanic';
import AssignedVehicleMachanic from './Component/Vendors/AssignedVehiclesMachanic';
import AddedDataByMachanic from './Component/Vendors/AddedDataByMachanic';
import CrainHydra from './Component/Vendors/CrainHydra';
import AssignedVehicleCrain from './Component/Vendors/AssignedVehiclesCrain';
import AddedDataByCrain from './Component/Vendors/AddedDataByCrain';
import AccidentVehicleRegUpdate from './Component/AccidentVehicle/AccidentVehicleRegUpdate';
import VendorResponse from './Component/Vendors/VendorsResponse';
import Workshop from './Component/Vendors/Workshop';
import AssignedVehicleWorkshop from './Component/Vendors/AssignedVehiclesWorkshop';
import AddedDataByWorkshop from './Component/Vendors/AddedDataByWorkshop';

import MachanicResponse from './Component/ViewVendorResponse/MachanicResponse';
import CraineResponse from './Component/ViewVendorResponse/CraineResponse';
import AdvocateResponse from './Component/ViewVendorResponse/AdvocateResponse';
import WorkshopResponse from './Component/ViewVendorResponse/WorkshopResponse';
import ActualVendorResponse from './Component/Vendors/ActualVendorResponse';

import DailyWorkshop from './Component/Vendors/DailyWorkshop';
import HandoverToWorkshop from './Component/Vendors/HandoverToWorkshop';

import Dashboard from './Component/Dashboard/Dashboard';
import ContactUs from './Component/ContactUs/ContactUs';
import Notification from './Component/Firebase/Notification';


import EmployeeForm from './Component/EmployeeForm/EmployeeForm';
import EmployeeApproved from './Component/EmployeeForm/EmployeeApproved';
import EmployeeFormEdit from './Component/EmployeeForm/EmployeeFormEdit';

import Visitors from './Component/Visitors/Visitors';
import Payment  from './Component/PaymentPage/Payment';

import Chart from './Component/Charts/Chart'
import Featured from './Component/Charts/Featured';

import UserDashboard from './Component/Dashboard/UserDashboard';
import SeeUpdatedPics from './Component/SeeUpdatedPics/SeeUpdatedPics';
//Chart
import ActivationModel from './Component/Visitors/ActivationModel';
import MechanicDashboard from './Component/Vendors/MechanicDashboard';

import NotFoundPage from './Component/NotFound';
import CustomerEnquiry from './Component/CustomerEnquiry/CustomerEnquiry';
import VendorPaymentDetail from './Component/PaymentPage/VendorPaymentDetail';

import CreatePassword from './Component/CreatePassword/CreatePassword';
import Administration from './Component/EmployeeDashboard/Administration';
import Salesteam from './Component/EmployeeDashboard/Salesteam';
function App() {                              
  return (
<Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          
          <Route exact path='/LoginPage' element={<LoginPage />} />
          <Route path='/Register' element={<Registration />}/>
          <Route path='/Location' element={<Location />} />
          <Route path='/Location1' element={<Location1 />} />
          <Route path='/UserIV' element={<UserIV />} />
          <Route path='/UserIV1' element={<UserIV1 />} />
          <Route path='/CrainUser' element={<CrainUser />} />
          <Route path='/AdvocateUser' element={<AdvocateUser />} />
          <Route path='/AdvocateHistoryComponent' element={<AdvocateHistoryComponent />} />
          <Route path='/AdminInfoPage' element={<AdminInfoPage />} />
          <Route path='/Location2' element={<Location2 />} />
          <Route path='/VendorMaster' element={<VendorMasterForm />} />
          <Route path='/VendorApporoved' element={<VendorApporoved />} />
          <Route path='/CustomerMaster' element={<CustomerMasterForm />} />
          <Route path='/CustomerApproved' element={<CustomerApproved />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/VehicleClaim' element={<VehicleClaimRegistration />} />
          <Route path='/ViewVehicleInfo' element={<ViewVehicleInfo />} />
          <Route path='/VendorMasterEdit' element={<VendorMasterEdit />} />
          <Route path='/CustomerMasterEdit' element={<CustomerMasterEdit />} />
          <Route path='/VehicleClaimEdit' element={<VehicleClaimEdit />} />
          <Route path='/VendorMasterViewOnly' element={<VendorMasterViewOnly />} />
          <Route path='/ImageUpload' element={<ImageUpload />} />
          <Route path='/UserDashboard' element={<User />} />
          <Route path='/AccidentVehicle' element={<AccidentVehicle />} />
          <Route path='/AccidentVehicleUser' element={<AccidentVehicleUser />} />
          <Route path='/AdvocateDashboard' element={<Advocate />} />
          <Route path='/EditAccidentVehicle' element={<EditAccidentVehicle />} />
          <Route path='/AssignedVehicleAdvocate' element={<AssignedVehicleAdvocate />} />
          <Route path='/UploadDocAdvocate' element={<UploadDocAdvocate />} />

          <Route path='/MachanicDashboard' element={<Machanic />} />
          <Route path='/AssignedVehicleMachanic' element={<AssignedVehicleMachanic />} />
          <Route path='/AddedDataByMachanic' element={< AddedDataByMachanic/>} />

          <Route path='/CrainDashboard' element={<CrainHydra />} />
          <Route path='/AssignedVehicleCrain' element={<AssignedVehicleCrain />} />
          <Route path='/AddedDataByCrain' element={< AddedDataByCrain/>} />

          <Route path='/AccidentVehicleRegUpdate' element={< AccidentVehicleRegUpdate/>} />

          <Route path='/vendorResponse' element={< VendorResponse/>} />
          
          <Route path='/WorkshopDashboard' element={< Workshop/>} />
          <Route path='/AssignedVehicleWorkshop' element={< AssignedVehicleWorkshop/>} />
          <Route path="/AddedDataByWorkshop" element={<AddedDataByWorkshop/>}/>

          <Route path='/MachanicResponse' element={<MachanicResponse/>}/>
          <Route path='/CraineResponse' element={<CraineResponse/>}/>
          <Route path='/AdvocateResponse' element={<AdvocateResponse/>}/>
          <Route path='/WorkshopResponse' element={<WorkshopResponse/>}/>
          <Route path='/ActualVendorResponse' element={<ActualVendorResponse/>}/>

          <Route path='/DailyWorkshop' element={<DailyWorkshop/>}/>
          <Route path='/HandoverToWorkshop' element={<HandoverToWorkshop/>}/>
          <Route path='/Notification' element={<Notification/>}/>

          <Route path='/EmployeeForm' element={<EmployeeForm/>}/>
          <Route path='/EmployeeApproved' element={<EmployeeApproved/>}/>
          <Route path='/EmployeeFormEdit' element={<EmployeeFormEdit/>}/>

          <Route path='/Visitors' element={<Visitors/>}/>

          <Route path='/Payment/:token' element={<Payment/>}/>

          <Route path='/Chart' element={<Chart/>}/>
          <Route path='/Featured' element={<Featured/>}/>

          <Route path='/UserDashboard' element={<UserDashboard/>}/>
          
          <Route path='/SeeUpdatedPics' element={<SeeUpdatedPics/>}/>
          <Route path='/ActivationModel' element={<ActivationModel/>}/>

          <Route path="*"  element={<NotFoundPage/>}/>
          <Route path='/MechanicDashboard' element={<MechanicDashboard/>}/>
          <Route path='/CustomerEnquiry' element={<CustomerEnquiry/>}/>
          <Route path='/VendorPaymentDetail' element={<VendorPaymentDetail/>}/>
          <Route path='/CreatePassword' element={<CreatePassword/>}/>
          <Route path='/Administration' element={<Administration/>}/>
          <Route path='/Salesteam' element={<Salesteam/>}/>

        </Routes>
      </div>
    </Router>

  );
}

export default App;
