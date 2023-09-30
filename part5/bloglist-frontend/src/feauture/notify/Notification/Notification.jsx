import React from 'react';
import clsx from 'clsx';
import styles from './Notification.module.css';
import { NotificationType } from './Notification.enum';

const Notification = ({ onClose, message, type = NotificationType.Success }) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const [statusBarWidth, setStatusBarWidth] = React.useState(0);

  const intervalIDRef = React.useRef(null);
  const divRef = React.useRef();

  const startTimer = () => {
    intervalIDRef.current = setInterval(() => {
      setStatusBarWidth((prev) => (prev < 100 ? prev + 0.5 : prev));
    }, 20);
  };

  const pauseTimer = () => {
    clearInterval(intervalIDRef.current);
  };

  const close = () => {
    pauseTimer();
    setIsClosing(true);
    divRef.current.addEventListener('animationend', onClose, { once: true });
  };

  React.useEffect(startTimer, []);

  React.useEffect(() => {
    if (statusBarWidth === 100) {
      close();
    }
  }, [statusBarWidth]);

  return (
    <div
      ref={divRef}
      className={clsx(styles.notification, styles[type], isClosing && styles.closing)}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <p>{message}</p>
      <div className={styles.bar} style={{ translate: `${statusBarWidth - 100}% 0` }}></div>
    </div>
  );
};

export default Notification;
