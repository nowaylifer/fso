import './Notification.css';
import cx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Notification = ({ setIsShown, message, variant = 'success', showTime = 2000 }) => {
  useEffect(() => {
    setTimeout(() => setIsShown(false), showTime);
  });

  return createPortal(
    <div className={cx('notification', `notification--${variant}`)}>{message}</div>,
    document.body,
  );
};
