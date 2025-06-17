// 📁 ui/Snackbar.tsx
import React, { useEffect } from "react";
import styled from "styled-components";

const SnackbarWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #323232;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  animation: fadein 0.3s, fadeout 0.3s 4.7s;

  @keyframes fadein {
    from { opacity: 0; transform: translateY(20px) translateX(-50%); }
    to   { opacity: 1; transform: translateY(0) translateX(-50%); }
  }

  @keyframes fadeout {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
`;

type Props = {
  message: string;
  onClose: () => void;
};

export const Snackbar: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <SnackbarWrapper>{message}</SnackbarWrapper>;
};
