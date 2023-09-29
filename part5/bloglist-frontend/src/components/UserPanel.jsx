import { useUserContext } from '../context/UserContext';

const UserPanel = () => {
  const [user, setUser] = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <div>
      logged in as {user.name} <button onClick={() => setUser(null)}>logout</button>
    </div>
  );
};

export default UserPanel;
