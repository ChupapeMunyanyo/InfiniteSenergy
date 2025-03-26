import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../processes/authSlice';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../app/AuthForm';
import { AppDispatch, RootState } from '../app/store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (credentials: { login: string; password: string }) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate('/account');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-page">
      <h1>Авторизация</h1>
      <AuthForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div className="error-message">
          Введены неверные данные авторизации. Попробуйте ещё раз
        </div>
      )}
    </div>
  );
};

export default LoginPage;