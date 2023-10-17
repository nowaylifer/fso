import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

const Notification = () => {
  const dispatch = useDispatch();
  const { isShown, message } = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    setTimeout(() => dispatch(hideNotification()), 5000);
  }, [dispatch]);

  return isShown && <div style={style}>{message}</div>;
};

export default Notification;
