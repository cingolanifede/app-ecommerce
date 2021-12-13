import React from 'react';
import { List, Avatar } from 'antd';

const UserList = (props) => {
  console.log('chat del card :', props);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={props.users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item.firstName}
              description="Ant Design"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UserList;
