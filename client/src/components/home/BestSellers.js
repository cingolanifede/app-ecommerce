import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts('sold', 'desc', page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const selectPage = (page) => {
    setPage(page);
    loadAllProducts();
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  return (
    <>
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
  );
};

export default BestSellers;
