import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSub } from '../../functions/sub';
import { List, Avatar, Space, Button } from 'antd';
import { StarOutlined, EnvironmentOutlined } from '@ant-design/icons';

import fede from '../../images/fede.jpg';
import { currentUser } from '../../functions/auth';

const SubPpal = ({ match, history }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  const sendMessage = async (data) => {
    console.log('user clicked ', data);
    const userToken = localStorage.getItem('token');
    if (userToken) {
      console.log('-----> ', userToken);
      const result = await currentUser();
      if (result) {
        dispatch({
          type: 'WRITE_MESSAGE',
          payload: {
            user: result.data.user,
            role: result.data.user.role,
            token: userToken,
          },
        });
      }
    } else {
      console.log('Hay que loguearse');
      history.push({
        pathname: '/login',
        state: { hide: true },
      });
    }
  };

  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `Rodolfo Perez ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const showProfessional = () => (
    <>
      <span>Sub-categoría : {slug}</span>
      <br></br>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={EnvironmentOutlined}
                text="Mar del Plata"
                key="list-vertical-like-o"
              />,
              <Button
                type="primary"
                style={{ textAlignVertical: 'right', textAlign: 'right' }}
                shape="round"
                size="large"
                onClick={() => sendMessage(item)}
              >
                Enviar mensaje
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
                  src={fede}
                />
              }
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <br />
    </>
  );

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        showProfessional()
      )}
    </div>
  );
};

export default SubPpal;

/*
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{sub.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
  */
