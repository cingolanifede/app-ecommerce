import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Empty } from 'antd';
import {
  EnterOutlined,
  MessageTwoTone,
  UploadOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import Dropzone from 'react-dropzone';
import ChatCard from '../components/chat/ChatCard';

import {
  // getChats,
  // afterPostMessage,
  uploadFile,
  getChatRooms,
  postChatMessage,
  getChatsByRoomId,
  // getChatsByRoomId,
} from '../functions/chat';
import { getUsers } from '../functions/user';
import UserList from '../components/chat/UserList';
import RoomList from '../components/chat/RoomList';

// export class ChatPage extends Component {
const ChatPage = (props) => {
  const { socket } = props;

  const dispatch = useDispatch();
  const [state, setState] = useState({ messageText: '' });

  // redux
  const { chats, rooms, user, users } = useSelector((state) => ({ ...state }));
  // console.log('Chats -- rooms: ', chats)
  const roomId = chats && chats.roomId; //selected roomId

  useEffect(async () => {
    dispatch(await getChatRooms());
    dispatch(await getUsers());

    // socket.on('outputMessage', (messageFromBackEnd) => {
    //   console.log('rx: ', messageFromBackEnd);
    //   dispatch({ type: 'AFTER_POST_MESSAGE', payload: messageFromBackEnd });
    // });
  }, [dispatch]);

  const hanleSearchChange = (e) => {
    setState({ messageText: e.target.value });
  };

  const renderCards = () =>
    chats.chats &&
    chats.chats.map((chat) => <ChatCard key={chat._id} {...chat} />);

  const renderUserList = () => <UserList {...users} />;

  const renderRoomList = () => <RoomList {...rooms} />;

  const onDrop = async (files) => {
    const formData = new FormData().append('file', files[0]);
    const result = await uploadFile(formData);

    if (result) {
      const chatMessage = result.data.url;
      const userId = user._id;
      const userName = user.name;
      const userImage = user.image;
      const nowTime = moment();
      const type = 'VideoOrImage';

      socket.emit('sendMessage', {
        chatMessage,
        userId,
        userName,
        userImage,
        nowTime,
        type,
      });
    }
  };

  const submitChatMessage = async (e) => {
    e.preventDefault();
    const { _id, firstName, lastName, role, email, image } = user.user;
    const message = state;
    const type = 'Text';
    /*
        if (!message || /^\s*$/.test(message)) return;
        const data = {
          message,
          postedByUser: {
            _id,
            firstName,
            lastName,
            email,
            image,
          },
          role,
          nowTime: moment(),
          type,
        };
        console.log('::::::::::::::', data);
        socket.emit('sendMessage', data);
    */
    // chatRoomId = localStorage.getItem('chatRoomId');
    console.log(roomId)
    postChatMessage(roomId, message)
    dispatch(await getChatsByRoomId(roomId));
    setState({ chatMessage: '' });
  };

  return (
    <>
      <div>
        <p style={{ fontSize: '2rem', textAlign: 'center' }}> Chat</p>
      </div>
      <div style={{ paddingLeft: '20px', width: '15%', paddingTop: '50px', position: 'absolute' }}>
        {/* {users && renderUserList()} */}
        <p>Chat Rooms</p>
        {rooms && renderRoomList()}
      </div>
      {
        roomId && rooms.rooms && rooms.rooms.length > 0 ? (
          <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '50px' }}>
            <div style={{ height: '600px', overflowY: 'scroll' }}>
              {chats && renderCards()}
              <div style={{ float: 'left', clear: 'both' }} />
            </div>

            <Row>
              <Form layout="inline" onSubmit={submitChatMessage}>
                <Col style={{ width: 400 }}>
                  <Input
                    size="large"
                    id="message"
                    prefix={<MessageTwoTone />}
                    placeholder="Escibe un mensaje aqui"
                    type="text"
                    value={state.chatMessage}
                    onChange={hanleSearchChange}
                  />
                </Col>
                <Col>
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Button size="large">
                            <UploadOutlined />
                          </Button>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>

                <Col>
                  <Button
                    size="large"
                    type="primary"
                    style={{ width: '100%' }}
                    onClick={submitChatMessage}
                    htmlType="submit"
                  >
                    <EnterOutlined />
                  </Button>
                </Col>
              </Form>
            </Row>
            <br></br>
          </div>
        ) : (
          <div style={{ paddingTop: '15%' }} >
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Selecciona un chat room para ver los mensajes" />
          </div>
        )
      }
    </>
  );
};

export default ChatPage;
