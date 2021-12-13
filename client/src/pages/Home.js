import React from 'react';
import CategoryList from '../components/category/CategoryList';
import BackToTop from '../components/home/BackToTop';
import SearchBar from '../components/home/SearchBar';
import FooterNav from '../components/nav/Footer';
import { Carousel } from 'antd';

// import SubList from '../components/sub/SubList';
// import Jumbotron from '../components/cards/Jumbotron';
// import NewArrivals from '../components/home/NewArrivals';

// import BestSellers from '../components/home/BestSellers';
// import Banner from '../components/home/Banner';

const Home = () => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <>
      <SearchBar />
      <h1
        style={{ fontFamily: 'Oswald', fontSize: '4rem' }}
        className="text-center p-3 mt-5 mb-5 display-4"
      >
        Categorías
      </h1>
      <CategoryList />
      <div className="p-3 mb-2 bg-primary text-center text-white h-50">
        <span>Cómo funciona?</span>
      </div>
      <div className="p-3 mb-2 bg-secondary text-center text-white h-50">
        <span>Beneficios</span>
      </div>
      {/* <SubList /> */}
      <FooterNav />
      <BackToTop />
    </>
  );
};

export default Home;
