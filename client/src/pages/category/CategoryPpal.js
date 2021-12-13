import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import plumb from '../../images/plumbing.png';
import { Card, Col, Row } from 'antd';
import { getSubs } from '../../functions/sub';
const { Meta } = Card;

const CategoryPpal = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => (
    <Row
      justify="space-around"
      align="middle"
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
    >
      {subs.map((s) => (
        <Col key={s._id} style={{ paddingBottom: 15 }}>
          <Link to={`/sub/${s.slug}`}>
            <Card
              hoverable
              style={{ width: 240, borderRadius: 10 }}
              cover={
                <img
                  alt="categoria"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                style={{ textAlignVertical: 'center', textAlign: 'center' }}
                title={`${s.name}`}
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      {loading ? <h4 className="text-center">Loading...</h4> : showCategories()}
    </div>
  );
};

export default CategoryPpal;
