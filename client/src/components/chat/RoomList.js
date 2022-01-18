import React from 'react';
import { useDispatch } from 'react-redux';
import { List, Avatar, Empty } from 'antd';
import { getChatsByRoomId } from '../../functions/chat';

const RoomList = (props) => {
  const { rooms } = props;
  // console.log('rooms card :', rooms);
  const dispatch = useDispatch();

  const handleClick = async (item) => {
    console.log('click en room -->', item);
    dispatch(await getChatsByRoomId(item._id));
    localStorage.setItem('chatRoomId', item._id);
  };

  return (
    <>
      <List
        locale={{
          emptyText: (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>Bandeja de mensajes vacía </span>}
            ></Empty>
          ),
        }}
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={(item) => (
          <List.Item onClick={() => handleClick(item)}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item._id}
              description={`${item.userIds[0].firstName} ${item.userIds[0].lastName} - Yo`}
            // description={`${item.userIds[0].firstName} ${item.userIds[0].lastName} - ${item.userIds[1].firstName} ${item.userIds[1].lastName}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default RoomList;
