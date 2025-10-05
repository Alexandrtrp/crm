import styled from 'styled-components';

export const Button = styled.button`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.375rem; /* rounded-md */
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryActive || theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled || '#ccc'};
    color: ${({ theme }) => theme.colors.disabledText || '#666'};
    cursor: not-allowed;
    transform: none;
    opacity: 0.7;
  }
`;
