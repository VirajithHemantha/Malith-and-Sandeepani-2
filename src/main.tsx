import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import './index.css';

// Guests never need the admin page, so keep it out of the main download
const AdminPage = lazy(() => import('./components/AdminPage').then((m) => ({ default: m.AdminPage })));

const isAdmin = window.location.pathname.replace(/\/+$/, '').toLowerCase() === '/admin';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      {isAdmin ? (
        <Suspense fallback={null}>
          <AdminPage />
        </Suspense>
      ) : (
        <App />
      )}
    </MotionConfig>
  </StrictMode>,
);
