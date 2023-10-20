import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import AnecdoteList from './pages/AnecdoteList';
import AnecdotesProvider from './components/AnecdotesProvider';
import CreateNew from './pages/CreateNew';
import About from './pages/About';
import AnecdoteDetails from './pages/AnecdoteDetails';
import NotificationProvider from './components/notify/NotificationProvider/NotificationProvider';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AnecdoteList />,
      },
      {
        path: 'anecdotes/:id',
        element: <AnecdoteDetails />,
      },
      {
        path: 'create',
        element: <CreateNew />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <AnecdotesProvider>
      <RouterProvider router={router} />
    </AnecdotesProvider>
  </NotificationProvider>
);
