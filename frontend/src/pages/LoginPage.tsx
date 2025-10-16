import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useLoginMutation } from '../store/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, [navigate]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const data = await login(values).unwrap();
      dispatch(
        setCredentials({
          token: data.access_token,
          user: data.user,
        }),
      );
      message.success('Успешный вход!');
      navigate('/');
    } catch (err: any) {
      message.error(err?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Card style={{ maxWidth: 420, width: '100%' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Вход в CRM
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите Email' }]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Войти
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Text>
            Нет аккаунта? <Link to="/register">Регистрация</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};
