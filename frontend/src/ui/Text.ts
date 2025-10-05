import styled from "styled-components";

export const Text = styled.p`
  margin-top: 1rem; /* mt-4 */
  font-size: 0.875rem; /* text-sm */
  color: ${({ theme }) => theme.colors.text};
`;