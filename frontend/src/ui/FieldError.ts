import styled from 'styled-components';

export const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem; // чуть меньше обычного текста
  margin-top: 0.25rem;
`;
