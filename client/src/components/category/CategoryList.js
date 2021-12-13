import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
// import plumb from '../../images/plumbing.png';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const style = { background: '#0092ff', padding: '8px 0' };

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => (
    <Row
      justify="space-around"
      align="middle"
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
    >
      {categories.map((c) => (
        <Col key={c._id} style={{ paddingBottom: 15 }}>
          <Link key={c._id} to={`/category/${c.slug}`}>
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
                title={`${c.name}`}
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="container">
      {loading ? <h4 className="text-center">Loading...</h4> : showCategories()}
    </div>
  );
};

export default CategoryList;
/**
 *     <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            defaultCurrent={1}
            total={Math.ceil((productsCount / 3) * 10)}
            onChange={selectPage}
          />
        </nav>
      </div>
    </>
 */
