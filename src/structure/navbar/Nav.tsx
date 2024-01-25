import { LinkOutlined, UserAddOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const Navigation = () => {
  const items: MenuItem[] = [
    // getItem(<Link to={'/'}>Home</Link>, '1', <UserAddOutlined />),
    getItem(<Link to={`/admin`}>Admin</Link>, 'link3', <LinkOutlined />),
    // getItem(<Link to={`/login`}>Login</Link>, 'link4', <LinkOutlined />),
    getItem(
      <Link to={`/doctor`}> Doctor</Link>,
      'link1',
      <LinkOutlined />
    ),
    getItem(<Link to={`/patient`}>Patient</Link>, 'link2', <LinkOutlined />),
  ];
  return (
    <div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
        style={{ width: '200px', height: '100vh' }}
      />
    </div>
  );
};
export default Navigation;
