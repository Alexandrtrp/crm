import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  background-color: ${({theme})=>theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.375rem; /* rounded-md */
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color:${({theme})=>theme.colors.primaryHover};
  }
`;