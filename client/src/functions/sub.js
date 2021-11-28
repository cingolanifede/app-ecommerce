import axios from 'axios';
import axiosInstance from './jwtInterceptor';

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axiosInstance.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {});

export const updateSub = async (slug, sub, authtoken) =>
  await axiosInstance.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {});

export const createSub = async (sub, authtoken) =>
  await axiosInstance.post(`${process.env.REACT_APP_API}/sub`, sub, {});
