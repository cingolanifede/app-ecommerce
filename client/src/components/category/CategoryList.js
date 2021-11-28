import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import plumb from '../../images/plumbing.png';
import { List, Card, Col, Row } from 'antd';

const { Meta } = Card;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={categories}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/category/${item.slug}`}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="categoria" src={plumb} />}
            >
              <Meta title={`${item.name}`} />
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
  // categories.map((c) => (
  //   <div key={c._id} className="col-md-3">
  //     <Link key={c._id} to={`/category/${c.slug}`}>
  //       <Card
  //         hoverable
  //         style={{ width: 240 }}
  //         cover={<img alt="categoria" src={plumb} />}
  //       >
  //         <Meta title={`${c.name}`} />
  //       </Card>
  //     </Link>
  //   </div>
  // ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
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
