import styled from "styled-components";

export const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: ${({theme})=>theme.colors.textSecondary};
`;