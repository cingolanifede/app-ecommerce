import React, { useState } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MessageOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem('cart', JSON.stringify(unique));
      // show tooltip
      setTooltip('Added');

      // add to reeux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  // destructure
  console.log('producto : ', product);
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        hoverable
        style={{
          marginBottom: 16,
          width: 300,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        cover={
          <img
            alt="rubro"
            src={images && images.length ? images[0].url : laptop}
            style={{
              height: '150px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <StarOutlined className="text-warning " /> <br /> Comentarios
          </Link>,
          <Link to={`/product/${slug}`}>
            <MessageOutlined className="text-success" /> <br /> Contactar
          </Link>,
          // <Tooltip title={tooltip}>
          //   <a onClick={handleAddToCart} disabled={product.quantity < 1}>
          //     <ShoppingCartOutlined className="text-danger" /> <br />
          //     {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
          //   </a>
          // </Tooltip>,
        ]}
      >
        <Meta
          avatar={<Avatar size={40} src="https://joeschmoe.io/api/v1/random" />}
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
