import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message } from 'antd';
import { useRegisterMutation } from '../store/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, [navigate]);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirm: string;
  }) => {
    if (values.password !== values.confirm) {
      message.error('Пароли не совпадают');
      return;
    }

    try {
      const data = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'ADMIN'
      }).unwrap();

      dispatch(
        setCredentials({
          token: data.access_token,
          user: data.user,
        }),
      );
      message.success('Регистрация успешна!');
      navigate('/');
    } catch (err: any) {
      message.error(err?.data?.message || 'Ошибка регистрации');
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
          Регистрация
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input placeholder="Ваше имя" />
          </Form.Item>

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

          <Form.Item
            label="Подтверждение пароля"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Создать аккаунт
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Text>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};
