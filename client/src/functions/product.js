import axios from 'axios';
import axiosInstance from '../functions/jwtInterceptor';

export const createProduct = async (product, authtoken) =>
  await axiosInstance.post(`${process.env.REACT_APP_API}/product`, product, {});

export const getProductsByCount = async (count) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {});

export const getProduct = async (slug) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axiosInstance.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {}
  );

export const getProducts = async (sort, order, page) =>
  await axiosInstance.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axiosInstance.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {}
  );

export const getRelated = async (productId) =>
  await axiosInstance.get(
    `${process.env.REACT_APP_API}/product/related/${productId}`
  );

export const fetchProductsByFilter = async (arg) =>
  await axiosInstance.post(`${process.env.REACT_APP_API}/search/filters`, arg);
