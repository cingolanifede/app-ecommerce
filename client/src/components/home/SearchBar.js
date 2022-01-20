import React from 'react';
import { Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = () => {
  const onSearch = (value) => console.log(value);

  return (
    <>
      <Row
        style={{ marginTop: '5%' }}
        className="p-3"
        justify="space-around"
        align="middle"
      >
        <Col span={24}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <div className="p-5 w-90">
            <h1>
              Encontrá los profesionales y expertos de confianza que necesitás
            </h1>
            <p>Listos para ayudarte con tus proyectos. Buscalos ahora!</p>
            <Search
              placeholder="Buscá por profesión y mas ..."
              allowClear
              enterButton="Buscar"
              size="large"
              prefix={<SearchOutlined />}
              onSearch={onSearch}
            />
          </div>
        </Col>
        {/* <Col
          span={12}
          style={{ textAlignVertical: 'center', textAlign: 'center' }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <img
            className="img-fluid"
            src={require('../../images/home_hero.png')}
          />
        </Col> */}
      </Row>
    </>
  );
};

export default SearchBar;
