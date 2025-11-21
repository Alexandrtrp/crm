import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, message, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useCreateUserMutation, useRegisterMutation } from '../../store/userApi';
import { setCredentials } from '../../store/authSlice';

const { Title, Text } = Typography;

export const CreateUser = () => {
  //  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [createUser] = useCreateUserMutation()

  //   useEffect(() => {
  //     if (localStorage.getItem('token')) navigate('/');
  //   }, [navigate]);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    role: Role;
    confirm: string;
  }) => {
    if (values.password !== values.confirm) {
      message.error('Пароли не совпадают');
      return;
    }

    try {
      const data = await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      }).unwrap();

      dispatch(
        setCredentials({
          token: data.access_token,
          user: data.user,
        }),
      );
      message.success('Регистрация успешна!');
    } catch (err: any) {
      message.error(err?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div
      style={{
        // minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        background: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Card style={{ maxWidth: 420, width: '100%' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Создание аккаунта
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
            label="Роль"
            name="role"
            rules={[{ required: true, message: 'Выберите роль' }]}
          >
            <Select options={[{value: 'ADMIN', label: 'Администратор'}, {value: 'USER', label: 'Менеджер'}]} placeholder="Роль пользователя"></Select>
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
      </Card>
    </div>
  );
};
