import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SnackbarWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #323232;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

type Props = {
  message: string;
  duration?: number;
  onClose?: () => void; 
};

export const Snackbar: React.FC<Props> = ({ message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <SnackbarWrapper $visible={visible}>{message}</SnackbarWrapper>;
};
