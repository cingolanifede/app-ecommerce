import axios from 'axios';
import axiosInstance from '../functions/jwtInterceptor';

export const createOrUpdateUser = async (authtoken) => {
  return await axiosInstance.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {}
  );
};

export const currentUser = async (authtoken) => {
  return await axiosInstance.get(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {}
  );
};

export const currentAdmin = async (authtoken) => {
  return await axiosInstance.get(`${process.env.REACT_APP_API}/current-admin`, {}, {});
};

export const login = async (email, password) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login`,
    { email, password },
    {}
  );
};

export const signUp = async (email, password, repeatPassword, name) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/sign-up`,
    { email, password, repeatPassword, name },
    {}
  );
};
