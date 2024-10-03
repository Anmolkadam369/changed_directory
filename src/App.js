import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";



import Home from './Component/Home/Home';
import Registration from './Component/Registration/Registration';
import LoginPage from './Component/Login/LoginPage';
import Location from './Component/Location/Location';
import Location1 from './Component/Location1/Location1';
import UserIV from './Component/UserIV/UserIV';
import UserIV1 from './Component/UserIV1/UserIV1';
import CraneUser from './Component/CraneUser/CraneUser';
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
import Mechanic from './Component/Vendors/Mechanic';
import AssignedVehicleMechanic from './Component/Vendors/AssignedVehiclesMechanic';
import AddedDataByMechanic from './Component/Vendors/AddedDataByMechanic';
import CraneHydra from './Component/Vendors/CraneHydra';
import AssignedVehicleCrane from './Component/Vendors/AssignedVehiclesCrane';
import AddedDataByCrane from './Component/Vendors/AddedDataByCrane';
import AccidentVehicleRegUpdate from './Component/AccidentVehicle/AccidentVehicleRegUpdate';
import VendorResponse from './Component/Vendors/VendorsResponse';
import Workshop from './Component/Vendors/Workshop';
import AssignedVehicleWorkshop from './Component/Vendors/AssignedVehiclesWorkshop';
import AddedDataByWorkshop from './Component/Vendors/AddedDataByWorkshop';

import MechanicResponse from './Component/ViewVendorResponse/MechanicResponse';
import CraneResponse from './Component/ViewVendorResponse/CraneResponse';
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
import Payment from './Component/PaymentPage/Payment';

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
import MapComponent from './Component/AAAAAAAAAAAAAAAAAA/MapComponent';


import DummyDashboard from './Component/Dashboard/DummyDashboard';
import EmployeeChart from './Component/Charts/EmployeeChart';
import Table from './Component/AAAAAAAAAAAAAAAAAA/Table';

import { Provider } from 'react-redux';
import store from './Component/Login/store';
import ProtectedRoute from './Component/Login/ProtectedRoute';
import KanduTable from './Component/VendorApproved/KanduTable';
import SidebarWithSubmenus from './Component/AAAAAAAAAAAAAAAAAA/SidebarWithSubmenus';
import Registrations from './Component/Registrations/Registrations';
import ImageViewer from './Component/Scrap/ImageViewer';
import ImageDetails from './Component/Scrap/ImageDetails';
import Blogs from './Component/AAAAAAAAAAAAAAAAAA/Blogs';
import Sidebar from './Component/Home/Sidebar';
import ProductRegister from './Component/Scrap/ProductRegsiter';
import ProductDetailsSeller from './Component/Scrap/ProductDetailsSeller';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route path='/Dashboard' element={<Dashboard/>}/> */}
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Blogs' element={<Blogs/>}/>
          <Route path='/ProductDetailsSeller' element={<ProductDetailsSeller/>}/>


          <Route path='/SidebarWithSubmenus' element={<SidebarWithSubmenus/>}/>
          <Route path='/ProductRegister' element={<ProductRegister/>}/>

          <Route path='/Sidebar' element={<Sidebar/>}/>

          <Route exact path='/LoginPage' element={<LoginPage />} />
          {/* <Route path='/Register' element={<Registration />} /> */}
          <Route path= "/KanduTable" element={<ProtectedRoute element={<KanduTable/>}/>}/>
          
          {/* <Route paath='/Location' element={<ProtectedRoute element={<Location />} />} /> */}
          {/* <Route path='/Location1' element={<ProtectedRoute element={<Location1 />} />} /> */}
          {/* <Route path='/UserIV' element={<ProtectedRoute element={<UserIV />} />} /> */}
          {/* <Route path='/UserIV1' element={<ProtectedRoute element={<UserIV1 />} />} /> */}
          {/* <Route path='/CraneUser' element={<ProtectedRoute element={<CraneUser />} />} /> */}
          {/* <Route path='/AdvocateUser' element={<ProtectedRoute element={<AdvocateUser />} />} /> */}
          {/* <Route path='/AdvocateHistoryComponent' element={<ProtectedRoute element={<AdvocateHistoryComponent />} />} /> */}
          {/* <Route path='/AdminInfoPage' element={<ProtectedRoute element={<AdminInfoPage />} />} /> */}
          {/* <Route path='/Location2' element={<ProtectedRoute element={<Location2 />} />} /> */}
          {/* <Route path='/VendorMaster' element={<ProtectedRoute element={<VendorMasterForm />} />} /> */}
          {/* <Route path='/VendorApporoved' element={<ProtectedRoute element={<VendorApporoved />} />} /> */}
          {/* <Route path='/CustomerMaster' element={<ProtectedRoute element={<CustomerMasterForm />} />} /> */}
          {/* <Route path='/CustomerApproved' element={<ProtectedRoute element={<CustomerApproved />} />} /> */}
          <Route path='/Admin' element={<ProtectedRoute element={<Admin />} />} />
          {/* <Route path='/VehicleClaim' element={<ProtectedRoute element={<VehicleClaimRegistration />} />} /> */}
          {/* <Route path='/ViewVehicleInfo' element={<ProtectedRoute element={<ViewVehicleInfo />} />} /> */}
          {/* <Route path='/VendorMasterEdit' element={<ProtectedRoute element={<VendorMasterEdit />} />} /> */}
          {/* <Route path='/CustomerMasterEdit' element={<ProtectedRoute element={<CustomerMasterEdit />} />} /> */}
          {/* <Route path='/VehicleClaimEdit' element={<ProtectedRoute element={<VehicleClaimEdit />} />} /> */}
          {/* <Route path='/VendorMasterViewOnly' element={<ProtectedRoute element={<VendorMasterViewOnly />} />} /> */}
          {/* <Route path='/ImageUpload' element={<ProtectedRoute element={<ImageUpload />} />} /> */}
          <Route path='/UserDashboard' element={<ProtectedRoute element={<User />} />} />
          {/* <Route path='/AccidentVehicle' element={<ProtectedRoute element={<AccidentVehicle />} />} /> */}
          {/* <Route path='/AccidentVehicleUser' element={<ProtectedRoute element={<AccidentVehicleUser />} />} /> */}
          <Route path='/AdvocateDashboard' element={<ProtectedRoute element={<Advocate />} />} />
          {/* <Route path='/EditAccidentVehicle' element={<ProtectedRoute element={<EditAccidentVehicle />} />} /> */}
          {/* <Route path='/AssignedVehicleAdvocate' element={<ProtectedRoute element={<AssignedVehicleAdvocate />} />} /> */}
          {/* <Route path='/UploadDocAdvocate' element={<ProtectedRoute element={<UploadDocAdvocate />} />} /> */}

          <Route path='/MechanicDashboard' element={<ProtectedRoute element={<Mechanic />} />} />
          {/* <Route path='/AssignedVehicleMechanic' element={<ProtectedRoute element={<AssignedVehicleMechanic />} />} /> */}
          {/* <Route path='/AddedDataByMechanic' element={<ProtectedRoute element={<AddedDataByMechanic />} />} /> */}

          <Route path='/CraneDashboard' element={<ProtectedRoute element={<CraneHydra />} />} />
          {/* <Route path='/AssignedVehicleCrane' element={<ProtectedRoute element={<AssignedVehicleCrane />} />} /> */}
          {/* <Route path='/AddedDataByCrane' element={<ProtectedRoute element={<AddedDataByCrane />} />} /> */}

          {/* <Route path='/AccidentVehicleRegUpdate' element={<ProtectedRoute element={<AccidentVehicleRegUpdate />} />} /> */}

          {/* <Route path='/vendorResponse' element={<ProtectedRoute element={<VendorResponse />} />} /> */}

          <Route path='/WorkshopDashboard' element={<ProtectedRoute element={<Workshop />} />} />
          {/* <Route path='/AssignedVehicleWorkshop' element={<ProtectedRoute element={<AssignedVehicleWorkshop />} />} /> */}
          {/* <Route path='/AddedDataByWorkshop' element={<ProtectedRoute element={<AddedDataByWorkshop />} />} /> */}

          {/* <Route path='/MechanicResponse' element={<ProtectedRoute element={<MechanicResponse />} />} />
          <Route path='/CraneResponse' element={<ProtectedRoute element={<CraneResponse />} />} />
          <Route path='/AdvocateResponse' element={<ProtectedRoute element={<AdvocateResponse />} />} />
          <Route path='/WorkshopResponse' element={<ProtectedRoute element={<WorkshopResponse />} />} />
          <Route path='/ActualVendorResponse' element={<ProtectedRoute element={<ActualVendorResponse />} />} /> */}
 
          <Route path='/DailyWorkshop' element={<ProtectedRoute element={<DailyWorkshop />} />} />
  {/*        <Route path='/HandoverToWorkshop' element={<ProtectedRoute element={<HandoverToWorkshop />} />} />
          <Route path='/Notification' element={<ProtectedRoute element={<Notification />} />} /> */}

          {/* <Route path='/EmployeeForm' element={<ProtectedRoute element={<EmployeeForm />} />} />
          <Route path='/EmployeeApproved' element={<ProtectedRoute element={<EmployeeApproved />} />} />
          <Route path='/EmployeeFormEdit' element={<ProtectedRoute element={<EmployeeFormEdit />} />} /> */}

          {/* <Route path='/Visitors' element={<ProtectedRoute element={<Visitors />} />} /> */}

          <Route path='/Payment/:token' element={<Payment />} />

          {/* <Route path='/Chart' element={<ProtectedRoute element={<Chart />} />} /> */}
          {/* <Route path='/Featured' element={<ProtectedRoute element={<Featured />} />} /> */}

          {/* <Route path='/UserDashboard' element={<ProtectedRoute element={<UserDashboard />} />} /> */}

          {/* <Route path='/SeeUpdatedPics' element={<ProtectedRoute element={<SeeUpdatedPics />} />} /> */}
          {/* <Route path='/ActivationModel' element={<ProtectedRoute element={<ActivationModel />} />} /> */}

          <Route path="*" element={<NotFoundPage />} />
          
          <Route path='/MechanicDashboard' element={<ProtectedRoute element={<MechanicDashboard />} />} />
          {/* <Route path='/CustomerEnquiry' element={<ProtectedRoute element={<CustomerEnquiry />} />} /> */}
          {/* <Route path='/VendorPaymentDetail' element={<ProtectedRoute element={<VendorPaymentDetail />} />} /> */}
          <Route path='/CreatePassword/:userType' element={<CreatePassword />} />
          <Route path='/Administration' element={<ProtectedRoute element={<Administration />} />} />
          <Route path='/Salesteam' element={<ProtectedRoute element={<Salesteam />} />} />
          <Route path='/Registration' element={<Registrations/>}/>
          <Route path='/ImageViewer' element={<ImageViewer/>}/>
         
          <Route path='/ImageDetails' element={<ImageDetails/>}/>


          {/* <Route path='/MapComponent' element={<ProtectedRoute element={<MapComponent />} />} /> */}

          {/* <Route path='/DummyDashboard' element={<ProtectedRoute element={<DummyDashboard />} />} /> */}
          {/* <Route path='/EmployeeChart' element={<ProtectedRoute element={<EmployeeChart />} />} /> */}
          {/* <Route path='/Table' element={<ProtectedRoute element={<Table />} />} /> */}


        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
