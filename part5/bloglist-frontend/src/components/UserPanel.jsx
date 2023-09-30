import { useUser } from '../context/UserContext';
import { useNotification } from '../feauture/notify';

const UserPanel = () => {
  const [user, setUser] = useUser();
  const notify = useNotification();

  const handleLogOutClick = () => {
    setUser(null);
    notify({ message: 'Log out from the account' });
  };

  return (
    <div>
      logged in as {user.name} <button onClick={handleLogOutClick}>logout</button>
    </div>
  );
};

export default UserPanel;
