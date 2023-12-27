import { Outlet } from 'react-router-dom';
import { Header } from '../../components';
import Nav from '../navbar/Nav';
import './layout.scss';

function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <div className="body-container">
        <Nav />
        <div className="body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
