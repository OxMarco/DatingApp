import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Providers } from './Providers.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import TabPage from './pages/TabPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import './style.css';
import Layout from './pages/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <TabPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Layout>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </Layout>
  </>,
);
