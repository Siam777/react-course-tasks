import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductCRUD from './pages/ProductCRUD';
import AboutPage from './pages/about';
import CoinDetailsPage from './pages/coin-details';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import './App.css';

import NotFoundPage from './pages/not-found';

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
              <Route path="/products" element={<ProductCRUD />} />
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
