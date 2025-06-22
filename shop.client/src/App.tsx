import { useEffect, useState } from 'react';
import type { Product } from './types/product';
import type { category } from './types/category';
import * as React from 'react';


import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from './services/productService';

import { createCategory, fetchCategories } from './services/categoryService';

import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { CategoryForm } from './components/CategoryForm';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load products & categories
    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((e) => setError(e.message));

        fetchCategories()
            .then(setCategories)
            .catch((e) => setError(e.message));
    }, []);

    // Handle category creation
    const handleAddCategory = async (name: string) => {
        try {
            await createCategory(name);
            const updated = await fetchCategories();
            setCategories(updated);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleCreateProduct = async (product: Omit<Product, 'id'>) => {
        try {
            const newProduct = await createProduct(product);
            setProducts([...products, newProduct]);
            setIsAdding(false);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleUpdateProduct = async (product: Product) => {
        try {
            const updated = await updateProduct(product);
            setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
            setEditingProduct(null);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="app-container">
            <h1>Product Management</h1>
            {error && <div className="error">{error}</div>}

            {/* --- Category Form --- */}
            <h2>Categories</h2>
            <CategoryForm onAddCategory={handleAddCategory} />

            {/* --- Product Form --- */}
            {isAdding && (
                <ProductForm
                    categories={categories}
                    onSave={handleCreateProduct}
                    onCancel={() => setIsAdding(false)}
                />
            )}

            {editingProduct && (
                <ProductForm
                    categories={categories}
                    initialProduct={editingProduct}
                    onSave={handleUpdateProduct}
                    onCancel={() => setEditingProduct(null)}
                />
            )}

            {!isAdding && !editingProduct && (
                <>
                    <button onClick={() => setIsAdding(true)}>Add New Product</button>
                    <ProductList
                        products={products}
                        onEdit={setEditingProduct}
                        onDelete={handleDeleteProduct}
                    />
                </>
            )}
        </div>
    );
}

export default App;
