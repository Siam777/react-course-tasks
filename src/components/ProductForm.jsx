import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductContext';

const ProductForm = ({ editingProduct, clearEditing, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
    }
  });

  const { addProduct, updateProduct } = useProducts();

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.category,
      });
    } else {
      reset({ name: '', price: '', description: '', category: '' });
    }
  }, [editingProduct, reset]);

  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
        onSave(); // Switch back to list
      } else {
        await addProduct(data);
        reset();
        onSave(); // Switch back to list
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter product name"
          />
          {errors.name && <span className="error-msg" style={{ padding: '0.2rem', background: 'none', border: 'none' }}>{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', min: 0 })}
            placeholder="0.00"
          />
          {errors.price && <span className="error-msg" style={{ padding: '0.2rem', background: 'none', border: 'none' }}>{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            {...register('category', { required: 'Category is required' })}
            placeholder="e.g. Electronics"
          />
          {errors.category && <span className="error-msg" style={{ padding: '0.2rem', background: 'none', border: 'none' }}>{errors.category.message}</span>}
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
            {...register('description', { required: 'Description is required' })}
            placeholder="Describe the product..."
          />
          {errors.description && <span className="error-msg" style={{ padding: '0.2rem', background: 'none', border: 'none' }}>{errors.description.message}</span>}
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
