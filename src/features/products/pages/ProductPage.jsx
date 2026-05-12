import { useEffect, useState } from 'react';
import { useProducts } from '../../../app/providers/ProductContext';
import ProductForm from '../components/ProductForm';
import Header from '../../../shared/layouts/Header';
import { useAuth } from '../../../app/providers/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCRUD = () => {
  const { products, fetchProducts, deleteProduct, loading } = useProducts();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="container" style={{ paddingBottom: '5rem' }}>
        {showForm ? (
          <div className="form-view">
             <button 
                onClick={() => { setShowForm(false); setEditingProduct(null); }} 
                className="back-link" 
                style={{ marginBottom: '2rem' }}
              >
                ← Back to List
              </button>
              <ProductForm 
                editingProduct={editingProduct} 
                onSave={handleSave}
                clearEditing={() => { setEditingProduct(null); setShowForm(false); }} 
              />
          </div>
        ) : (
          <div className="list-view">
            <div className="add-product-banner">
              <div>
                <h2>Product Inventory</h2>
                <p>Manage your professional catalog with ease</p>
              </div>
              <button className="btn-add" onClick={() => setShowForm(true)}>
                + Create Product
              </button>
            </div>

            {loading && <p>Loading your products...</p>}
            
            <div className="product-grid">
              {products.length > 0 ? products.map((product) => (
                <div key={product._id} className="product-card">
                  <div>
                    <div className="product-category">{product.category}</div>
                    <h3>{product.name}</h3>
                    <div className="product-price">${product.price.toLocaleString()}</div>
                    <p className="product-desc">{product.description}</p>
                  </div>
                  
                  <div className="product-actions">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="btn-icon btn-edit"
                    >
                      <span>✎</span> Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product._id)}
                      className="btn-icon btn-delete"
                    >
                      <span>🗑</span> Delete
                    </button>
                  </div>
                </div>
              )) : !loading && (
                <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '4rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No products found. Start by creating one!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCRUD;
