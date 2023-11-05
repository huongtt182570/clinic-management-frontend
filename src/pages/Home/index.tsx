import React from 'react';
import { Header } from '../../components';
import './style.scss';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: 60 }}>Home Page</div>
    </div>
  );
};

export default Home;
