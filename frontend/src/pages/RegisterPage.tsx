import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { Link } from "../components/ui/Link";
import { Form } from "../components/ui/Form";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 28rem;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;



export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Имитация успешной регистрации
    localStorage.setItem("token", "example_token");
    navigate("/");
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Регистрация</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input type="text" id="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" required />
          </div>
          <div>
            <Label htmlFor="confirm">Подтверждение пароля</Label>
            <Input type="password" id="confirm" required />
          </div>
          <Button type="submit">Создать аккаунт</Button>
        </Form>
        <Text>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </Text>
      </Container>
    </PageWrapper>
  );
};
