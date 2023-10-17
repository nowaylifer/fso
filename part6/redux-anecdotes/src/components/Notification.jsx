import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

const Notification = () => {
  const dispatch = useDispatch();
  const { isShown, message, time } = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (isShown) {
      setTimeout(() => dispatch(hideNotification()), time * 1000);
    }
  }, [isShown]);

  return isShown && <div style={style}>{message}</div>;
};

export default Notification;
