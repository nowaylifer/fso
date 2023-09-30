import ReactDOM from 'react-dom/client';
import App from './App';
import NotificationProvider from './feauture/notify';
import { UserProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </UserProvider>
);
