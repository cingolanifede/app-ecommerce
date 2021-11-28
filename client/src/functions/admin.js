import axiosInstance from './jwtInterceptor';

export const getOrders = async (authtoken) =>
  await axiosInstance.get(`${process.env.REACT_APP_API}/admin/orders`, {});

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axiosInstance.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {}
  );
