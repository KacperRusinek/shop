import React, { useEffect, useState } from 'react';
import type { Product } from './types/product';
import type { category } from './types/category';
import type { Review, ReviewCreateDto } from './types/review';
import './App.css';  




import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from './services/productService';

import { createCategory, fetchCategories } from './services/categoryService';

import { fetchReviews, addReview } from './services/reviewService';

import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import { CategoryForm } from './components/CategoryForm';
import { ReviewForm } from './components/ReviewForm';
import { ReviewList } from './components/ReviewList';

type ProductWithoutId = Omit<Product, 'id'>;

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Recenzje
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [currentCustomerId] = useState<number>(1); 

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((e) => setError(e.message));

        fetchCategories()
            .then(setCategories)
            .catch((e) => setError(e.message));
    }, []);

    useEffect(() => {
        if (!selectedProductId) {
            setReviews([]);
            return;
        }
        fetchReviews(selectedProductId)
            .then(setReviews)
            .catch((e) => setError(e.message));
    }, [selectedProductId]);

    // Category handlers
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

    // Product handlers
    const handleCreateProduct = async (product: ProductWithoutId) => {
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
            if (selectedProductId === id) setSelectedProductId(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    // Unifikowana funkcja do zapisu (create/update)
    const handleSaveProduct = async (product: Product | ProductWithoutId) => {
        if ('id' in product) {
            return handleUpdateProduct(product);
        } else {
            return handleCreateProduct(product);
        }
    };

    // Review handlers
    const handleAddReview = async (review: ReviewCreateDto) => {
        try {
            await addReview(review);
            if (selectedProductId) {
                const updatedReviews = await fetchReviews(selectedProductId);
                setReviews(updatedReviews);
            }
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="app-container">
            <h1>Product Management</h1>
            {error && <div className="error">{error}</div>}

            {/* Categories */}
            <h2>Categories</h2>
            <CategoryForm onAddCategory={handleAddCategory} />

            {/* Product Form */}
            {(isAdding || editingProduct) && (
                <ProductForm
                    categories={categories}
                    initialProduct={editingProduct ?? undefined}
                    onSave={handleSaveProduct}
                    onCancel={() => {
                        setIsAdding(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            {/* Product List */}
            {!isAdding && !editingProduct && (
                <>
                    <button onClick={() => setIsAdding(true)}>Add New Product</button>
                    <ProductList
                        products={products}
                        onEdit={setEditingProduct}
                        onDelete={handleDeleteProduct}
                        onSelectProduct={setSelectedProductId}
                    />
                </>
            )}

            {/* Reviews section */}
            {selectedProductId && (
                <section className="reviews-section">
                    <h2>Reviews for product ID: {selectedProductId}</h2>
                    <div className="review-list">
                        <ReviewList reviews={reviews} />
                    </div>
                    <div className="review-form">
                        <ReviewForm
                            productId={selectedProductId}
                            customerId={currentCustomerId}
                            onAddReview={handleAddReview}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

export default App;
