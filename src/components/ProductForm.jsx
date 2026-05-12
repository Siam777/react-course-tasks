import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductContext';
import InputField from './common/InputField';
import Button from './common/Button';
import GlassCard from './common/GlassCard';

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
        onSave();
      } else {
        await addProduct(data);
        reset();
        onSave();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <GlassCard>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            register={register}
            error={errors.name?.message}
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="0.00"
            register={register}
            error={errors.price?.message}
          />

          <InputField
            label="Category"
            name="category"
            placeholder="e.g. Electronics"
            register={register}
            error={errors.category?.message}
          />

          <div className="form-group">
            <label>Description</label>
            <div className="input-wrapper">
              <textarea
                style={{ 
                    width: '100%', 
                    padding: '0.9rem', 
                    borderRadius: '12px', 
                    background: 'rgba(15, 23, 42, 0.4)', 
                    color: 'white', 
                    border: '1px solid var(--glass-border)',
                    minHeight: '120px'
                }}
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe the product..."
              />
            </div>
            {errors.description && <span className="error-text">{errors.description.message}</span>}
          </div>

          <Button type="submit" className="auth-btn">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </Button>
          
          {editingProduct && (
            <Button 
              variant="logout"
              onClick={clearEditing} 
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Cancel Edit
            </Button>
          )}
        </form>
      </GlassCard>
    </div>
  );
};

export default ProductForm;
