import { Drawer, Layout, Tabs, notification } from 'antd';
import React, { useState } from 'react';
// import banner from "../../image/banner.png";
import { Link, useNavigate } from 'react-router-dom';
import { COMMON } from '../../constants/common';
import fetchHandler from '../../redux/services/axios';
import { handleLoginAsync } from '../../redux/slices/authSlice';
import { useAppDispatch } from '../hook';
import './Login.scss';

const { TabPane } = Tabs;

const LoginForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('patient');

  const onTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const [formValue, setFormValue] = useState({
    ID: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setLoading(true);
    // Simulate asynchronous login logic
    const res = await dispatch(
      handleLoginAsync({
        phone: formValue.ID,
        password: formValue.password,
      })
    );
    setLoading(false);
    if (res?.payload?.success) {
      const role = res.payload.data.user.role;
      if (role && role?.toLocaleLowerCase() === currentTab) {
        localStorage.setItem(
          COMMON.ACCESS_TOKEN,
          res?.payload?.data?.accessToken
        );
        localStorage.setItem(
          COMMON.REFRESH_TOKEN,
          res?.payload?.data?.refreshToken
        );
        fetchHandler.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res?.payload?.data?.accessToken}`;
        navigate(`/${currentTab}/dashboard`);
        notification.success({
          message: 'Đăng nhập thành công',
          description: `Chào mừng ${currentTab} ${formValue.ID}!`,
        });
      } else {
        notification.error({
          message: 'Đăng nhập không thành công',
        });
      }
    } else {
      notification.error({
        message: 'Đăng nhập không thành công',
      });
    }
  };

  const formPatientRegister = () => { };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const [forgetPassword, setForgetPassword] = useState({
    type: '',
    email: '',
  });

  const handleForgetPassword = (e: any) => {
    setForgetPassword({ ...forgetPassword, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    // Handle change password logic
  };

  const [registrationForm, setRegistrationForm] = useState({
    username: '',
    email: '',
    // Add additional fields if needed
  });

  const handleRegistration = () => {
    // Handle registration logic
  };

  return (
    <Layout>
      <div className="mainLoginPage">
        <div className="login-container">
          <div className="rightside">
            <div className="login-header">
              <h1>Đăng nhập</h1>
            </div>
            <div className="tabs-container">
              <Tabs activeKey={currentTab} onChange={onTabChange}>
                <TabPane tab="Bệnh nhân" key="patient">
                  {renderLoginForm()}
                  {renderPatientRegistrationForm()}
                </TabPane>
                <TabPane tab="Bác sĩ" key="doctor">
                  {renderLoginForm()}
                </TabPane>
                <TabPane tab="Quản trị viên" key="admin">
                  {renderLoginForm()}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  function renderLoginForm() {
    return (
      <div>
        <form onSubmit={handleSubmit} method="post">
          <h3>
            {currentTab === 'doctor'
              ? 'Số điện thoại bác sĩ'
              : currentTab === 'admin'
                ? 'Mã quản trị viên'
                : 'Số điện thoại bệnh nhân'}
          </h3>

          <input
            type="text"
            name="ID"
            value={formValue.ID}
            onChange={(e) => setFormValue({ ...formValue, ID: e.target.value })}
            required
          />
          <h3>Mật khẩu</h3>
          <input
            type="password"
            name="password"
            value={formValue.password}
            onChange={(e) =>
              setFormValue({ ...formValue, password: e.target.value })
            }
            required
          />
          <button type="submit">{loading ? 'Loading...' : 'Đăng nhập'}</button>
        </form>
      </div>
    );
  }

  function renderPatientRegistrationForm() {
    if (currentTab === 'patient') {
      return (
        <div>
          <p style={{ marginTop: '10px' }}>
            Bạn chưa có tài khoản?{' '}
            <Link to="/patient/register">Đăng ký</Link>
          </p>
        </div>
      );
    }
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form (chẳng hạn như refresh trang)

    // Thực hiện xử lý đăng nhập
    handleLogin();
  }
};

export default LoginForm;
