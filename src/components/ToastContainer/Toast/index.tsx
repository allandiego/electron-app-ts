import React, { useEffect } from 'react';
import {
  MdErrorOutline,
  MdCheckCircle,
  MdInfoOutline,
  MdClose,
} from 'react-icons/md';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <MdInfoOutline size={24} />,
  error: <MdErrorOutline size={24} />,
  success: <MdCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, message.delay ?? 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id, message.delay]);

  return (
    <Container
      type={message.type}
      hasdescription={message.description ? 1 : 0}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <MdClose size={18} />
      </button>
    </Container>
  );
};

export default Toast;
