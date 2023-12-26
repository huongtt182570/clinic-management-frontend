import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import LoginForm from './pages/Login';
import PatientRegisterForm from './pages/Patient/PatientRegister';

const App: React.FC = () => {

  const handleLogin = (values: { username: string; password: string; remember: boolean }) => {
    // Xử lý đăng nhập
    console.log('Login values:', values);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patientRegister" element={<PatientRegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
