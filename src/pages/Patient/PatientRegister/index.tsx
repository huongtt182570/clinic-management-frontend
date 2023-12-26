// RegisterForm.tsx
import React, { useState } from 'react';
import { Layout, Drawer, Tabs, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import adminbanner from "../../../image/AdminBanner.png";
import './style.scss';

const { TabPane } = Tabs;

const PatientRegisterForm: React.FC = () => {
    const [currentTab, setCurrentTab] = useState('admin');

    const onTabChange = (key: string) => {
        setCurrentTab(key);
    };

    const [formValue, setFormValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Add additional fields if needed
    });

    const handleRegister = () => {
        // Handle registration logic
        console.log('Registration details:', formValue);
    };

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <div className="mainRegisterPage">
                <div className="leftside">
                    <img src={adminbanner} alt="AdminBanner" />
                </div>
                <div className="register-container">
                    <div className="register-header">
                        <h1>Patient Register</h1>
                    </div>
                    <div className="tabs-container">
                        {
                            renderRegisterForm()
                        }

                    </div>
                </div>
            </div>
        </Layout>
    );

    function renderRegisterForm() {
        return (
            <div>
                <form onSubmit={handleSubmit} method="post">
                    <h3>Username</h3>
                    <Input
                        type="text"
                        name="username"
                        value={formValue.username}
                        onChange={(e) => setFormValue({ ...formValue, username: e.target.value })}
                        required
                    />
                    <h3>Email</h3>
                    <Input
                        type="email"
                        name="email"
                        value={formValue.email}
                        onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
                        required
                    />
                    <h3>Password</h3>
                    <Input
                        type="password"
                        name="password"
                        value={formValue.password}
                        onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                        required
                    />
                    <h3>Confirm Password</h3>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formValue.confirmPassword}
                        onChange={(e) => setFormValue({ ...formValue, confirmPassword: e.target.value })}
                        required
                    />
                    <button type="submit">Register</button>
                    <p style={{ marginTop: '10px' }}>
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
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
