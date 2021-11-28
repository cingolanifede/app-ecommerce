import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser, login } from '../../functions/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('cingolanifede@gmail.com');
  const [password, setPassword] = useState('fede');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push('/');
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result) {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            _id: result.data.user._id,
            email: result.data.user.email,
            name: result.data.user.name,
            role: result.data.user.role,
            token: result.data.token,
          },
        });
        localStorage.setItem('token', result.data.token);
        roleBasedRedirect(result);
      }
      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    // auth
    //   .signInWithPopup(googleAuthProvider)
    //   .then(async (result) => {
    //     const { user } = result;
    //     const idTokenResult = await user.getIdTokenResult();
    //     createOrUpdateUser(idTokenResult.token)
    //       .then((res) => {
    //         dispatch({
    //           type: 'LOGGED_IN_USER',
    //           payload: {
    //             name: res.data.name,
    //             email: res.data.email,
    //             token: idTokenResult.token,
    //             role: res.data.role,
    //             _id: res.data._id,
    //           },
    //         });
    //         roleBasedRedirect(res);
    //       })
    //       .catch((err) => console.log(err));
    //     // history.push("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(err.message);
    //   });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 3}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
