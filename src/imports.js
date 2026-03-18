import { lazy } from 'react';

// admin routes
export const AdminRoutes = lazy(() => import('./routes/AdminRoutes'))
export const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))

