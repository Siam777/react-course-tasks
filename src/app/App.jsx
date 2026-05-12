import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/crypto/pages/Dashboard';
import ProductPage from '../features/products/pages/ProductPage';
import AboutPage from '../shared/pages/AboutPage';
import CoinDetailsPage from '../features/crypto/pages/CoinDetailsPage';
import TimerPage from '../features/timer/pages/TimerPage';
import NotFoundPage from '../shared/pages/NotFoundPage';
import ProtectedRoute from '../shared/layouts/ProtectedRoute';
import { AuthProvider } from './providers/AuthContext';
import { ProductProvider } from './providers/ProductContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/coin/:id" element={<CoinDetailsPage />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
