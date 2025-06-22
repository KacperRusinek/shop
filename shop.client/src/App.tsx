//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import type { Product } from './types/product';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './services/productService';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';


function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(data => setProducts(data))
            .catch(e => setError(e.message));
    }, []);

    const handleCreate = async (product: Omit<Product, 'id'>) => {
        try {
            const newProduct = await createProduct(product);
            setProducts([...products, newProduct]);
            setIsAdding(false);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleUpdate = async (product: Product) => {
        try {
            const updated = await updateProduct(product);
            setProducts(products.map(p => (p.id === updated.id ? updated : p)));
            setEditingProduct(null);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="app-container">
            <h1>Product Management</h1>
            {error && <div className="error">{error}</div>}

            {isAdding && (
                <ProductForm
                    onSave={handleCreate} // <- async funkcja jest OK
                    onCancel={() => setIsAdding(false)}
                />
            )}

            {editingProduct && (
                <ProductForm
                    onSave={async (product) => {
                        if ('id' in product) {
                            // Typ Product (ma id)
                            await handleUpdate(product as Product);
                        } else {
                            // Typ bez id
                            await handleCreate(product as Omit<Product, 'id'>);
                        }
                    }}
                    onCancel={() => setIsAdding(false)} // lub setEditingProduct(null)
                    initialProduct={editingProduct}
                />

            )}

            {!isAdding && !editingProduct && (
                <>
                    <button onClick={() => setIsAdding(true)}>Add New Product</button>
                    <ProductList
                        products={products}
                        onEdit={setEditingProduct}   // <- przekazujemy obie wymagane funkcje
                        onDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
}

export default App;


