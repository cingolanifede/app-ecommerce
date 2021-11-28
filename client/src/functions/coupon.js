import axios from 'axios';
import axiosInstance from '../functions/jwtInterceptor';

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axiosInstance.delete(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,
    {}
  );

export const createCoupon = async (coupon, authtoken) =>
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {}
  );
