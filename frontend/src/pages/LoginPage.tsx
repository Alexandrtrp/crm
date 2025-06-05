import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { Link } from "../components/ui/Link";
import { Title } from "../components/ui/Title";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:${({theme})=> theme.colors.background};
`;

const Container = styled.div`
  max-width: 28rem; /* max-w-md */
  width: 100%;
  background: white;
  padding: 2rem; /* p-8 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
`;


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Имитация успешного входа (сюда можно добавить логику отправки на сервер)
    localStorage.setItem("token", "example_token");
    navigate("/");
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Вход в CRM</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" id="password" required />
          </div>
          <Button type="submit">Войти</Button>
        </Form>
        <Text>
          Нет аккаунта?{" "}
          <Link href="/register">
            Регистрация
          </Link>
        </Text>
      </Container>
    </PageWrapper>
  );
};
