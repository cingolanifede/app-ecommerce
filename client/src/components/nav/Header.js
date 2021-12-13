import React, { useState } from 'react';
import { Menu, Layout, Avatar } from 'antd';

import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header } = Layout;

const HeaderNav = ({ hide, currentState }) => {
  const [current, setCurrent] = useState(currentState);
  const [hideBar, setHideBar] = useState(hide);

  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (location.state) setHideBar(location.state.hide);
    if (location.state) setCurrent(location.state.currentState);
  }, [location]);

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  };

  const rightStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'right',
  };

  const DropdownMenu = () => (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={rightStyle}
    >
      {/* <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item> */}

      {/* <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item> */}

      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <Link
            to={{
              pathname: '/register',
              state: { hide: false, currentState: 'register' },
            }}
          >
            Registrarse
          </Link>
        </Menu.Item>
      )}

      {!user && (
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
          <Link
            to={{
              pathname: '/login',
              state: { hide: true, currentState: 'login' },
            }}
          >
            Iniciar Sesión
          </Link>
        </Menu.Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className="float-right"
        >
          {user && user.role === 'subscriber' && (
            <Menu.Item key="subscriber">
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          )}

          {user && user.role === 'admin' && (
            <Menu.Item key="admin">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}

          <Menu.Item key="chat" icon={<MessageOutlined />}>
            <Link to="/chat">Chat</Link>
          </Menu.Item>

          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );

  return (
    <>
      {hideBar ? null : (
        <Layout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              background: '#fff',
              marginBottom: 10,
            }}
          >
            <div className="logo">
              <Link
                to={{
                  pathname: '/',
                  state: { hide: false, currentState: 'home' },
                }}
              >
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
              </Link>
              <span className="ml-5">
                El Recomendado | Encontrá todo lo que necesites
              </span>
            </div>
            <DropdownMenu />
          </Header>
        </Layout>
      )}
    </>
  );
};

export default HeaderNav;
