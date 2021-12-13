import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

import { currentUser } from './functions/auth';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

// using lazy
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const ChatCard = lazy(() => import('./components/chat/ChatCard'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryPpal'));
const SubHome = lazy(() => import('./pages/sub/SubPpal'));

const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Chat = lazy(() => import('./pages/Chat'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
);
const Payment = lazy(() => import('./pages/Payment'));

const socket = io('http://localhost:5678');

const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      console.log('-----> ', userToken);
      const result = await currentUser();
      if (result) {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            user: result.data.user,
            role: result.data.user.role,
            token: userToken,
          },
        });
      }
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          Tus Recomendados <br />
          <br />
          <LoadingOutlined />
        </div>
      }
    >
      <Header currentState={'init'} hide={false} />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/chat">
          <Chat socket={socket} />
        </Route>
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
