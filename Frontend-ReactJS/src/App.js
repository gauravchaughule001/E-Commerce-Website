import './App.css';
import { Route, Routes, BrowserRouter, Router, useLocation, useNavigate } from 'react-router-dom';
import UserRegistration from '../src/pages/UserRegistration';
import NoPage from './pages/NoPage';
import UnauthorizedAction from './pages/UnauthorizedAction';
import UserUpdate from './pages/UserUpdate';
import DeleteUser from './pages/DeleteUser';
import Loader from './components/Loader';
import CreateProduct from './pages/CreateProduct';
import AddCategory from './pages/AddCategory';
import Home from './pages/Home';
import UpdateProduct from './pages/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import LayoutHomepage from './components/LayoutHomepage';
import GetUser from './pages/GetUser';
import LayoutUser from './components/LayoutUser';
import LayoutAdmin from './components/LayoutAdmin';
import Sample from './print/Sample';
import OrderHistoryAdmin from './pages/Admin/OrderHistory-Admin';
import Settings from './pages/Settings';
import UserRegistrationAdmin from './pages/Admin/UserRegistrationAdmin';
import Profile from './pages/Profile';

function App() {

  let { loginData } = useSelector(state => state.auth)
  console.log("Login Data Authenticated is", loginData)
  let rollType;
  if (loginData) {
    console.log("Roll Type In loginInfo in App.js is :::", loginData.rollType)
    rollType = loginData.user.roles[0].id;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!rollType ?
            <Route path="/" element={<LayoutHomepage />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userregistration" element={<UserRegistration />} />
            </Route>
            :
            <>
              {rollType == 500 ?
                <>
                  <Route path="/" element={<LayoutAdmin />}>
                    <Route index element={<Home />} />
                    <Route path="/productdetails" element={<ProductDetails />} />
                    <Route path="/admin/updateuser" element={<UserUpdate />} />
                    <Route path="/admin/getuserbyid" element={<GetUser />} />
                    <Route path="/admin/deleteuser" element={<DeleteUser />} />
                    <Route path="/admin/addproduct" element={<CreateProduct />} />
                    <Route path="/admin/addcategory" element={<AddCategory />} />
                    <Route path="/admin/loader" element={<Loader />} />
                    <Route path="/admin/updateproduct" element={<UpdateProduct />} />
                    <Route path="/orderhistory" element={<OrderHistoryAdmin />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/updateuser" element={<UserUpdate />} />
                    <Route path="/addnewuser" element={<UserRegistrationAdmin />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </>
                :
                <>
                  <Route path="/" element={<LayoutUser />}>
                    <Route index element={<Home />} />
                    <Route path="/userregistration" element={<UserRegistration />} />
                    <Route path="/productdetails" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orderhistory" element={<OrderHistory />} />
                    <Route path="/loader" element={<Loader />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/updateuser" element={<UserUpdate />} />
                    <Route path="/*" element={<NoPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin/*" element={<UnauthorizedAction />} />
                    <Route path="/sample" element={<Sample />} />
                  </Route>
                </>
              }
            </>
          }
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
