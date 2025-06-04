import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  padding-bottom: 2px;

  &.active {
    border-bottom: 2px solid white;
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const Navbar: React.FC = () => {
  return (
    <Nav>
      <Logo>CRM</Logo>
      <Menu>
        <StyledLink to="/" end>
          Главная
        </StyledLink>
        <StyledLink to="/warehouse">
          Складской учёт
        </StyledLink>
        <StyledLink to="/tasks">
          Задачи
        </StyledLink>
        <StyledLink to="/profile">
          Профиль
        </StyledLink>
      </Menu>
    </Nav>
  );
};
