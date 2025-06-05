import styled from "styled-components";

export const Input = styled.input`
  margin: 0.25rem 0 0.25rem; /* mt-1 */
  display: block;
  width: 100%;
  padding: 0.5rem 0.5rem; /* p-2 */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #d1d5db; /* border-gray-300 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6; /* focus:border-blue-500 */
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-blue-500 */
  }
`;