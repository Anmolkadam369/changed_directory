import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Pages/Home/Home.jsx';
import Registration from './Pages/Customers/Registration/Registration';
import LoginPage from './Pages/Authentication/Login/LoginPage.jsx';
import VendorMasterForm from './Pages/CompanyAdmin/VendorsDetails/VenderMaster/VendorMasterForm.jsx';
import VendorApporoved from './Pages/CompanyAdmin/VendorsDetails/VendorApproved/VendorApporoved.jsx';
import Admin from './Pages/CompanyAdmin/AdminHome/SideBar/Admin.jsx';
import CustomerMasterForm from './Pages/CompanyAdmin/CustomersDetails/CustomerMaster/CustomerMaster.jsx';
import CustomerApproved from './Pages/CompanyAdmin/CustomersDetails/CustomerApporoved/CustomerApproved.jsx';
import VehicleClaimRegistration from './Pages/CompanyAdmin/VehicleClaimRegistration/VehicleClaimRegistration.jsx';
import ViewVehicleInfo from './Pages/CompanyAdmin/ViewVehicleInfo/ViewVehicleInfo.jsx';
import VendorMasterEdit from './Pages/CompanyAdmin/VendorsDetails/VenderMaster/VendorMasterEdit.jsx';
import CustomerMasterEdit from './Pages/CompanyAdmin/CustomersDetails/CustomerMaster/CustomerMasterEdit.jsx';
import VehicleClaimEdit from './Pages/CompanyAdmin/VehicleClaimRegistration/VehicleClaimEdit.jsx';
import VendorMasterViewOnly from './Pages/CompanyAdmin/VendorsDetails/VenderMaster/VendorMasterViewOnly.jsx';
import ImageUpload from './Component/CompanyAdmin/ImageUpload/ImageUpload.jsx';
import User from './Pages/CompanyAdmin/AdminHome/User.jsx';
import AccidentVehicle from './Pages/CompanyAdmin/AccidentVehicle/AccidentVehicle.jsx';
import Advocate from './Pages/CompanyAdmin/VendorResponse/Advocate.jsx';
import Mechanic from './Pages/CompanyAdmin/VendorResponse/Mechanic.jsx';
import CraneHydra from './Pages/CompanyAdmin/VendorResponse/CraneHydra.jsx';
import AddedDataByCrane from './Pages/CompanyAdmin/VendorResponse/AddedDataByCrane.jsx';
import AccidentVehicleRegUpdate from './Pages/CompanyAdmin/AccidentVehicle/AccidentVehicleRegUpdate.jsx';
import VendorResponse from './Pages/CompanyAdmin/VendorResponse/VendorsResponse.jsx';
import Workshop from './Pages/CompanyAdmin/VendorResponse/Workshop.jsx';
import DailyWorkshop from './Pages/CompanyAdmin/VendorResponse/DailyWorkshop.jsx';
import EmployeeForm from './Pages/CompanyAdmin/Employees/EmployeeForm.jsx';
import EmployeeApproved from './Pages/CompanyAdmin/Employees/EmployeeApproved.jsx';
import EmployeeFormEdit from './Pages/CompanyAdmin/Employees/EmployeeFormEdit.jsx';
import Visitors from './Pages/CompanyAdmin/Visitors/Visitors.jsx';
import Payment from './Pages/Customers/PaymentPage/Payment.jsx';
import VendorPayment from './Pages/Customers/PaymentPage/VendorPayment.jsx';
import MechanicDashboard from './Pages/CompanyAdmin/VendorResponse/MechanicDashboard.jsx';
import NotFoundPage from './Component/CompanyAdmin/CompanyAdminHome/NotFound.jsx';
import CustomerEnquiry from './Pages/CompanyAdmin/Enquiry/CustomerEnquiry.jsx';
import CreatePassword from './Pages/Home/CreatePassword/CreatePassword.jsx';
// import Administration from './Component/EmployeeDashboard/Administration';
import Administration from './Pages/CompanyAdmin/Administration.jsx';
import Salesteam from './Pages/CompanyAdmin/Administration.jsx';
import DummyDashboard from './Pages/CompanyAdmin/AdminHome/Dashboard/DummyDashboard.jsx';
import { Provider } from 'react-redux';
// import store from './Pages/Authentication/Login/store.js/Component/Login/store';
import store from './Pages/Authentication/Login/store.js';
import ProtectedRoute from './Pages/Authentication/Login/ProtectedRoute.js';
import SidebarWithSubmenus from './Component/CompanyAdmin/CompanyAdminHome/CustomerAdminDashboard/SidebarWithSubmenus.jsx';
import Registrations from './Pages/Authentication/Registrations/Registrations.jsx';
import ImageViewer from './Pages/Home/Scrap/ImageViewer.jsx';
import ImageDetails from './Pages/Home/Scrap/ImageDetails.jsx';
import Blogs from './Pages/Home/Blogs/Blogs.jsx';
import Sidebar from './Pages/Home/Sidebar.jsx';
// import ProductRegister from './Pages/Scrap/ProductRegsiter';
import ProductRegister from './Pages/Home/Scrap/ProductRegsiter.jsx';
import ProductDetailsSeller from './Pages/Home/Scrap/ProductDetailsSeller.jsx';
import CaseFirstCard from './Component/Vendors/FirstAppearComponent/CaseFirstCard/CaseFirstCard.jsx';
import SuccessIcon from './Component/Vendors/FirstAppearComponent/CaseFirstCard/SuccessIcon.jsx';
import ErrorIcon from './Component/Vendors/FirstAppearComponent/CaseFirstCard/ErrorIcon.jsx';
import CompletePayment from './Component/CompanyAdmin/Charts/CompletePayment.jsx';
import FirstPage from './Pages/Customers/FirstPageDesigns/FirstPage.jsx';
import CraneFirstPage from './Pages/Customers/VendorResponsesCustomer/CraneFirstPage.jsx';
import UserSideBar from './Component/CompanyAdmin/UserSideBar.jsx'
import SelectLocationOnMap from './Pages/Customers/Map/SelectLocationOnMap.jsx';
import CraneUserLanding from './Pages/Vendors/CraneUserLanding.jsx';
import MapForVendorDistance from './Pages/Customers/Map/MapForVendorDistance.jsx';
import AllVehicles from './Pages/Customers/AllVehicles/AllVehicles.jsx';
import AllAccidentVehiclesUser from './Pages/Customers/VendorResponsesCustomer/AllAccidentVehiclesUser.jsx';
import HistoryPageUser from './Pages/Customers/VendorResponsesCustomer/HistoryPageUser.jsx';
import UserProfileFirst from './Pages/Customers/UserProfile/UserProfileFIrst.jsx';
import UserProfileDetails from './Pages/Customers/UserProfile/UserProfileDetails.jsx';
import CraneUserDashboard from './Pages/Vendors/VendorAdmin/CraneUserDashboard.jsx';
import CraneOrders from './Pages/Vendors/VendorAdmin/CraneOrders/CraneOrders.jsx';
import CraneVehicleData from './Pages/Vendors/VendorAdmin/CraneVehicleData.jsx';
import NewAccidentVehicle from './Component/Customers/NewAccidentVehicle/NewAccidentVehicle.jsx';
import AddNewVehicle from './Pages/Customers/Registration/AddNewVehicle.jsx';
import VendorSignUp from './Pages/CompanyAdmin/VendorsDetails/VendorApproved/VendorSignUp.jsx';
// import InitialRegistration from './Pages/CompanyAdmin/AdminHome/InitialRegistrion.jsx';
import InitialRegistration from './Pages/CompanyAdmin/AdminHome/InitialRegistration.jsx';
import SurveyorMaster from './Pages/CompanyAdmin/Surveyor/SurveyorMaster.jsx';
import SurveyorApproved from './Pages/CompanyAdmin/Surveyor/SurveyorApproved.jsx';
import MovingVehicles from './Component/CompanyAdmin/Location1/MovingVehicles.jsx';
import CraneDriverHome from './Pages/Vendors/VendorDriver/CraneDriverHome.jsx';
import RidePopUp from './Pages/Vendors/VendorDriver/RidePopUp.jsx';
import CraneUserProfile from './Pages/Vendors/Crane-user-profile/CraneUserProfile.jsx';
import CraneAllVehicles from './Pages/Vendors/VendorAdmin/CraneAllVehicles.jsx';
import VehicleImagePanel from './Pages/Customers/Registration/VehicleImagePanel.jsx';
import NewFirstPage from './Pages/Customers/FirstPageDesigns/NewFirstPage.jsx';
import VendorByMap from './Pages/CompanyAdmin/VendorsDetails/VendorApproved/VendorByMap.js';
import VendorPerformance from './Pages/CompanyAdmin/VendorsDetails/VendorPerformnce.jsx';
import CustomerPerformance from './Pages/CompanyAdmin/CustomersDetails/CustomerApporoved/CustomerPerformance.jsx';
import WorkshopVendorRegistrationForm from './Pages/Vendors/WorkshopVendorRegisterationForm/WorkshopVendorRegisterationForm.jsx';
import { WebSocketProvider } from "./context/WebSocketContext.jsx";
import { LocationProvider } from "./context/LocationContext";


function App() {

  const userId = localStorage.getItem("userId");
  console.log(userId);

  return (
    <Provider store={store}>

      <WebSocketProvider>
        <LocationProvider >

          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              {/* <Route path='/ContactUs' element={<ContactUs />} /> */}
              <Route path='/ContactUs' element={<WorkshopVendorRegistrationForm />} />
              <Route path='/Blogs' element={<Blogs />} />
              <Route path='/CaseFirstCard' element={<CaseFirstCard />} />
              <Route path='/SuccessIcon' element={<SuccessIcon />} />
              <Route path='/ErrorIcon' element={<ErrorIcon />} />
              <Route path='/FirstPage' element={<FirstPage />} />

              <Route path='/Admin' element={<ProtectedRoute element={<Admin />} />} />

              <Route path='/moving-vehicle' element={<ProtectedRoute element={<MovingVehicles />} />} />
              <Route path='/crane-driver-home' element={<ProtectedRoute element={<CraneDriverHome />} />} />
              <Route path='/ride-popup' element={<ProtectedRoute element={<RidePopUp />} />} />

              <Route path='/CompletePayment' element={<CompletePayment />} requiredRole="customer" />
              <Route path='/User-landing-page' element={<ProtectedRoute element={<NewFirstPage />} requiredRole="customer" />} />
              <Route path='/all-vehicles-registered' element={<ProtectedRoute element={<AllVehicles />} requiredRole="customer" />} />
              <Route path='/all-accident-vehicles' element={<ProtectedRoute element={<AllAccidentVehiclesUser />} requiredRole="customer" />} />
              <Route path='/user-profile' element={<ProtectedRoute element={<UserProfileFirst />} requiredRole="customer" />} />
              <Route path='/user-profile-details' element={<ProtectedRoute element={<UserProfileDetails />} requiredRole="customer" />} />
              <Route path='/add-new-vehicle-driver' element={<ProtectedRoute element={< AddNewVehicle />} requiredRole="customer" />} />

              <Route path='/Crane-dashboard' element={<ProtectedRoute element={<CraneFirstPage />} requiredRole="customer" />} />

              <Route path='/vehicleimagepanel' element={<VehicleImagePanel />} />

              {/* Crane Dashboard */}
              <Route path='/crane-user-landing-page' element={<ProtectedRoute element={<CraneUserLanding />} requiredRole="crane" />} />
              <Route path='/map-vendor-distance' element={<ProtectedRoute element={<MapForVendorDistance />} />} />

              <Route path='/all-accident-vehicles-history' element={<ProtectedRoute element={<HistoryPageUser />} />} />

              <Route path='/crane-user-dashboard' element={<ProtectedRoute element={<CraneUserDashboard />} requiredRole="crane" />} />
              <Route path='/crane-user-all-cases' element={<ProtectedRoute element={<CraneOrders />} />} />
              <Route path="/crane-vehicle-information" element={<ProtectedRoute element={<CraneVehicleData />} />} />
              <Route path='/crane-user-profile' element={<ProtectedRoute element={<CraneUserProfile />} />} requiredRole='crane' />
              <Route path='/crane-all-vehicles' element={<ProtectedRoute element={<CraneAllVehicles />} />} requiredRole='crane' />

              <Route path='/UserSideBar' element={<UserSideBar />} />
              <Route path='/SelectLocationOnMap' element={<SelectLocationOnMap />} />

              <Route path='/new-vehicle-registration' element={<NewAccidentVehicle />} />
              <Route path='/ProductDetailsSeller' element={<ProductDetailsSeller />} />
              <Route path='/SidebarWithSubmenus' element={<SidebarWithSubmenus />} />
              <Route path='/ProductRegister' element={<ProductRegister />} />
              <Route path='/Sidebar' element={<Sidebar />} />
              <Route exact path='/LoginPage' element={<LoginPage />} />
              <Route path='/register-new-accidentvehicle' element={<Registration />} />

              <Route path='/vendor-form' element={<ProtectedRoute element={<VendorMasterForm />} />} />
              <Route path='/vendor-view-form' element={<ProtectedRoute element={<VendorApporoved />} />} />
              <Route path='/vendor-edit' element={<VendorMasterEdit />} />
              <Route path='/vendor-map-details' element={<VendorByMap />} />
              <Route path='/vendor-performance-details' element={<VendorPerformance />} />

              <Route path='/customer-form' element={<ProtectedRoute element={<CustomerMasterForm />} />} />
              <Route path='/customer-form-edit' element={<ProtectedRoute element={<CustomerMasterEdit />} />} />
              <Route path='/customer-form-activity' element={<ProtectedRoute element={< CustomerPerformance />} />} />

              <Route path='/employee-form' element={<ProtectedRoute element={<EmployeeForm />} />} />
              <Route path='/view-employee' element={<ProtectedRoute element={<EmployeeApproved />} />} />
              <Route path='/edit-employee' element={<ProtectedRoute element={<EmployeeFormEdit />} />} />

              <Route path='/vehicle-claim-registration' element={<ProtectedRoute element={<VehicleClaimRegistration />} />} />
              <Route path='/vehicle-claim-edit' element={<ProtectedRoute element={<VehicleClaimEdit />} />} />

              <Route path='/Visitors-form' element={<ProtectedRoute element={<Visitors />} />} />
              <Route path='/customer-enquiry-form' element={<ProtectedRoute element={<CustomerEnquiry />} />} />
              <Route path='/signup-form-submissions' element={<ProtectedRoute element={<VendorSignUp />} />} />
              <Route path='/signup-form-view' element={<ProtectedRoute element={<InitialRegistration />} />} />
              <Route path='/customer-view-form' element={<ProtectedRoute element={<CustomerApproved />} />} />
              <Route path='/accident-vehicle-register-update' element={<ProtectedRoute element={<AccidentVehicleRegUpdate />} />} />
              <Route path='/view-accident-vehicle-register-details' element={<ProtectedRoute element={<ViewVehicleInfo />} />} />
              <Route path='/accident-vehicle' element={<ProtectedRoute element={<AccidentVehicle />} />} />
              <Route path='/daily-image-upload' element={<ProtectedRoute element={<ImageUpload />} />} />
              <Route path='/vendor-response' element={<ProtectedRoute element={<VendorResponse />} />} />
              <Route path='/add-surveyor' element={<ProtectedRoute element={<SurveyorMaster />} />} />
              <Route path='/view-surveyor' element={<ProtectedRoute element={<SurveyorApproved />} />} />
              <Route path='/VendorMasterViewOnly' element={<ProtectedRoute element={<VendorMasterViewOnly />} />} />
              <Route path='/UserDashboard' element={<ProtectedRoute element={<User />} />} />
              <Route path='/AdvocateDashboard' element={<ProtectedRoute element={<Advocate />} />} />

              <Route path='/MechanicDashboard' element={<ProtectedRoute element={<Mechanic />} />} />
              <Route path='/CraneDashboard' element={<ProtectedRoute element={<CraneHydra />} />} />
              <Route path='/AddedDataByCrane' element={<ProtectedRoute element={<AddedDataByCrane />} />} />

              <Route path='/WorkshopDashboard' element={<ProtectedRoute element={<Workshop />} />} />

              <Route path='/DailyWorkshop' element={<ProtectedRoute element={<DailyWorkshop />} />} />

              <Route path='/Payment/:token' element={<Payment />} />
              <Route path='/vendor-comission/:token' element={<VendorPayment />} />

              <Route path='/MechanicDashboard' element={<ProtectedRoute element={<MechanicDashboard />} />} />
              <Route path='/CreatePassword/:userType' element={<CreatePassword />} />
              <Route path='/Administration' element={<ProtectedRoute element={<Administration />} />} />
              <Route path='/Salesteam' element={<ProtectedRoute element={<Salesteam />} />} />
              <Route path='/Registration' element={<Registrations />} />

              <Route path='/ImageViewer' element={<ImageViewer />} />
              <Route path='/ImageDetails' element={<ImageDetails />} />

              <Route path='/admin-dashboard-vendor-customer' element={<ProtectedRoute element={<DummyDashboard />} requiredRole={['Management', "IT"]} />} />

              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </Router>

        </LocationProvider>
      </WebSocketProvider>
    </Provider>

  );
}

export default App;
