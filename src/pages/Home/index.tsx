// Home.tsx
import React from 'react';
import { Layout, Button } from 'antd';
import banner from "../../image/banner.png";
import { Link } from 'react-router-dom'; // Import thư viện Link từ react-router-dom
import "./style.scss";

const { Content } = Layout;

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="mainHomePage">
        <div className="homeleftside">
          <img src={banner} alt="banner" className="banner-image" />
        </div>
        <Content className="homerightside">
          <div className="home-content-wrapper">
            <h1>Welcome to Our Multi-Specialty Clinic</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Explore our services and meet our team of dedicated healthcare professionals.
            </p>
            <Button type="primary">
              <Link to="/login">Get Started</Link>
            </Button>
            {/* Add more content as needed */}
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default Home;
