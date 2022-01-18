import axiosInstance from '../functions/jwtInterceptor';

//get recent conversation
export const getChats = async () => {
  const request = await axiosInstance.get(
    `${process.env.REACT_APP_API}/room`,
    {},
    {}
  );
  return {
    type: 'GET_CHATS',
    payload: request.data.conversation,
  };
};

export const getChatsByRoomId = async (roomId) => {
  const request = await axiosInstance.get(
    `${process.env.REACT_APP_API}/room/${roomId}`,
    {},
    {}
  );
  return {
    type: 'GET_CHATS',
    payload: request.data.conversation,
  };
};
// {{API}}/room/61b118ee5775e7d9f40c1a29?limit=5&page=0

export const getChatRooms = async () => {
  const request = await axiosInstance.get(
    `${process.env.REACT_APP_API}/room/chatroom`,
    {},
    {}
  );
  return {
    type: 'GET_ROOMS',
    payload: request.data.rooms,
  };
};

export const postChatMessage = async (chatRoomId, messageText) => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API}/room/${chatRoomId}/message`,
    messageText,
    {}
  );
};
// {{API}}/room/61e71284450e5406ecc1931e/message

export const uploadFile = async (formData) => {
  return await axiosInstance.post(
    `${process.env.REACT_APP_API}/chat/uploadfiles`,
    formData,
    {
      header: { 'content-type': 'multipart/form-data' },
    }
  );
};
