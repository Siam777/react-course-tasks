import { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCRUD = () => {
  const { products, fetchProducts, deleteProduct, loading } = useProducts();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="container">
        <ProductForm 
          editingProduct={editingProduct} 
          clearEditing={() => setEditingProduct(null)} 
        />

        <div style={{ marginTop: '4rem' }}>
          <h2>Your Products</h2>
          {loading && <p>Loading products...</p>}
          
          <div className="grid" style={{ marginTop: '2rem' }}>
            {products.length > 0 ? products.map((product) => (
              <div key={product._id} className="coin-card" style={{ cursor: 'default' }}>
                <div className="coin-header">
                  <div>
                    <h3>{product.name}</h3>
                    <p className="symbol">{product.category}</p>
                  </div>
                </div>
                <div className="coin-price">${product.price}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="auth-btn"
                    style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteProduct(product._id)}
                    className="logout-btn"
                    style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )) : (
              <p>No products found. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCRUD;
