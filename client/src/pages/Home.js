import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';

import BestSellers from '../components/home/BestSellers';
import Banner from '../components/home/Banner';

import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
          text={['Recomendados', 'Todos los profesionales', 'Calidad']}
        />
      </div> */}

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals /> */}
      <Banner />
      <h4 className="text-center p-3 mt-5 mb-5 display-4">
        Mejores ranqueados
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categorías
      </h4>
      <CategoryList />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList /> */}

      <br />
      <br />
    </>
  );
};

export default Home;
