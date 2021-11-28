import axiosInstance from './jwtInterceptor';

export const userCart = async (cart, authtoken) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {}
  );

export const getUserCart = async (authtoken) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/user/cart`, {});

export const emptyUserCart = async (authtoken) =>
  await axiosInstance.delete(`${process.env.REACT_APP_API}/user/cart`, {});

export const saveUserAddress = async (authtoken, address) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {}
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {}
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {}
  );

export const getUserOrders = async (authtoken) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/user/orders`, {});

export const getWishlist = async (authtoken) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/user/wishlist`, {});

export const removeWishlist = async (productId, authtoken) =>
  await axiosInstance.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {}
  );

export const addToWishlist = async (productId, authtoken) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {}
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {}
  );
