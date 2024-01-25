import { Outlet } from 'react-router-dom';
import { Header } from '../../components';
import { Home } from '../../pages';
import Nav from '../navbar/Nav';
import './layout.scss';

function Layout() {
  const handleMenuClick = (info: any) => {
    // Xử lý sự kiện khi menu được click
    console.log(info);}
  return (
    <div className="layout-container">
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
