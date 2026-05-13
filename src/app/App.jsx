import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '../shared/layouts/ProtectedRoute';
import { AuthProvider } from './providers/AuthContext';
import { ProductProvider } from './providers/ProductContext';
import './App.css';

// Lazy loaded components (Route-wise)
const Login = lazy(() => import('../features/auth/pages/Login'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const Dashboard = lazy(() => import('../features/crypto/pages/Dashboard'));
const ProductPage = lazy(() => import('../features/products/pages/ProductPage'));
const AboutPage = lazy(() => import('../shared/pages/AboutPage'));
const CoinDetailsPage = lazy(() => import('../features/crypto/pages/CoinDetailsPage'));
const TimerPage = lazy(() => import('../features/timer/pages/TimerPage'));
const NotFoundPage = lazy(() => import('../shared/pages/NotFoundPage'));

// A simple component for demonstration of child route
const ProductDetails = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Product Details View</h2>
    <p>This is a nested child route demonstration.</p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Route with Child Route */}
                <Route path="/products" element={<Outlet />}>
                  <Route index element={<ProductPage />} />
                  <Route path="details" element={<ProductDetails />} />
                </Route>

                <Route path="/timer" element={<TimerPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/coin/:id" element={<CoinDetailsPage />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Suspense>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
