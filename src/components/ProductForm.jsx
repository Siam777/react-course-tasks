import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';

const ProductForm = ({ editingProduct, clearEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const { addProduct, updateProduct } = useProducts();

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.category,
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        clearEditing();
      } else {
        await addProduct(formData);
      }
      setFormData({ name: '', price: '', description: '', category: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            style={{ 
                width: '100%', 
                padding: '0.9rem', 
                borderRadius: '12px', 
                background: 'rgba(15, 23, 42, 0.4)', 
                color: 'white', 
                border: '1px solid var(--glass-border)' 
            }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="auth-btn">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button 
            type="button" 
            onClick={clearEditing} 
            className="logout-btn" 
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
