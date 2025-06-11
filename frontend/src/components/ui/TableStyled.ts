import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

export const Thead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fafafa;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transition: background-color 0.2s ease;
  }
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;

  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
`;
