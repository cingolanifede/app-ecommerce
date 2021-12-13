import React, { useEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Carousel, Image } from 'antd';
import uno from '../../images/uno.jpeg';

const Banner = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(false);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const contentStyle = {
    height: '260px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <>
      <div className="w-100 p-3">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            <div className="col-md-11">
              <Carousel autoplay>
                <div>
                  <Image
                    preview={{ visible: false }}
                    height={270}
                    width={1850}
                    src={uno}
                  />
                </div>
                <div>
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;
