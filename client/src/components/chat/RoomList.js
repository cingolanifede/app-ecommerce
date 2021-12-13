import React from 'react';
import { useDispatch } from 'react-redux';
import { List, Avatar, Empty } from 'antd';
import { getChatsByRoomId } from '../../functions/chat';

const RoomList = (props) => {
  console.log('rooms card :', props);
  const dispatch = useDispatch();

  const handleClick = async (item) => {
    console.log(item);
    dispatch(await getChatsByRoomId(item._id));
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
        dataSource={props.rooms}
        renderItem={(item) => (
          <List.Item onClick={() => handleClick(item)}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item._id}
              description={`${item.userIds[0].firstName} ${item.userIds[0].lastName} - ${item.userIds[1].firstName} ${item.userIds[0].lastName}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default RoomList;
