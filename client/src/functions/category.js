import axios from 'axios';
import axiosInstance from '../functions/jwtInterceptor';

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axiosInstance.delete(
    `${process.env.REACT_APP_API}/category/${slug}`,
    {}
  );

export const updateCategory = async (slug, category, authtoken) =>
  await axiosInstance.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {}
  );

export const createCategory = async (category, authtoken) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/category`,
    category,
    {}
  );

export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
