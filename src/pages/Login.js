import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Ошибка при входе в систему');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <i className="fas fa-newspaper"></i>
          </div>
          <h1 className="auth-title">Вход в систему</h1>
          <p className="auth-subtitle">Войдите в свой аккаунт, чтобы получить доступ к персонализированным новостям</p>
        </div>

        {error && (
          <div className="auth-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Введите ваш email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Введите ваш пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Вход...</span>
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                <span>Войти</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>или</span>
        </div>

        <div className="social-auth">
          <button className="social-btn google">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="social-btn twitter">
            <i className="fab fa-twitter"></i>
          </button>
        </div>

        <div className="auth-footer">
          <p>Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 