import { useState } from 'react';
import * as React from 'react';
import type { Product } from '../types/product';
import type { category } from '../types/category';
import './components.css';

type Props = {
    onSave: (product: Product | Omit<Product, 'id'>) => void;
    onCancel: () => void;
    initialProduct?: Product;
    categories: category[]; 
};

export function ProductForm({ initialProduct, onSave, onCancel, categories }: Props) { 
    const [name, setName] = useState(initialProduct?.name || '');
    const [description, setDescription] = useState(initialProduct?.description || '');
    const [price, setPrice] = useState(initialProduct?.price.toString() || '');
    const [categoryId, setCategoryId] = useState(initialProduct?.categoryId?.toString() || '');
    const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl || '');
    const [stockQuantity, setStockQuantity] = useState(initialProduct?.stockQuantity?.toString() || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const priceNum = parseFloat(price);
        const categoryIdNum = parseInt(categoryId, 10);
        const stockQtyNum = parseInt(stockQuantity, 10);

        if (!name || !description || isNaN(priceNum) || isNaN(categoryIdNum) || isNaN(stockQtyNum)) {
            alert('Please fill all required fields correctly.');
            return;
        }

        const product = {
            ...(initialProduct ? { id: initialProduct.id } : {}),
            name,
            description,
            price: priceNum,
            categoryId: categoryIdNum,
            imageUrl,
            stockQuantity: stockQtyNum,
        };

        onSave(product as any);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{initialProduct ? 'Edit Product' : 'Add Product'}</h2>
            <label>
                Name:
                <input value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
                Description:
                <input value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" />
            </label>
            <label>
                Category:
                <select
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Image URL:
                <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </label>
            <label>
                Stock Quantity:
                <input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} required />
            </label>
            <div className="buttons">
                <button type="submit">{initialProduct ? 'Update' : 'Create'}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}
