// RegisterForm.tsx
import { Input, Layout, Tabs, notification } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import adminbanner from "../../../image/AdminBanner.png";
import { CarOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { handleRegisterAsync } from '../../../redux/slices/registrationSlice';
import { useAppDispatch } from '../../hook';
import './style.scss';

const { TabPane } = Tabs;

const PatientRegisterForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('admin');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const [formValue, setFormValue] = useState({
    phone: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    // Add additional fields if needed
  });

  const handleRegister = async () => {
    // Handle registration logic
    const res = await dispatch(handleRegisterAsync(formValue));
    if (res.payload.success) {
      notification.success({ message: 'Register successfully' });
      navigate('/');
    } else {
      notification.error({ message: 'Register failed' });
    }
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [selectedTab, setSelectedTab] = useState<string>('2');

  const handleMenuClick = (e: any) => {
    setSelectedTab(e.key);
  };

  return (
    <div>
      <Layout>
        <Header>
          <div className="logo">
            <h2>
              <CarOutlined /> Clinic Managements
            </h2>
          </div>
        </Header>
        <div className="mainRegisterPage">
          {/* <div className="leftside">
          <img src={adminbanner} alt="AdminBanner" />
        </div> */}
          <div className="register-container">
            <div className="register-header">
              <h1>Đăng ký</h1>
            </div>
            <div className="tabs-container">{renderRegisterForm()}</div>
          </div>
        </div>
      </Layout>
    </div>
  );

  function renderRegisterForm() {
    return (
      <div>
        <form onSubmit={handleSubmit} method="post">
          <h3>Số điện thoại</h3>
          <Input
            type="number"
            name="username"
            value={formValue.phone}
            onChange={(e) =>
              setFormValue({ ...formValue, phone: e.target.value })
            }
            required
          />
          <h3>Mật khẩu</h3>
          <Input
            type="password"
            name="password"
            value={formValue.password}
            onChange={(e) =>
              setFormValue({ ...formValue, password: e.target.value })
            }
            required
          />
          <h3>Nhập lại mật khẩu</h3>
          <Input
            type="password"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={(e) =>
              setFormValue({ ...formValue, confirmPassword: e.target.value })
            }
            required
          />
          <h3>Tên đầy đủ</h3>
          <Input
            type="text"
            name="text"
            value={formValue.fullname}
            onChange={(e) =>
              setFormValue({ ...formValue, fullname: e.target.value })
            }
            required
          />
          <button type="submit">Đăng ký</button>
          <p style={{ marginTop: '10px' }}>
            Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
          </p>
        </form>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleRegister();
  }
};

export default PatientRegisterForm;
