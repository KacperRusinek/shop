import type { Product } from '../types/product';

const API_URL = 'https://localhost:58292/api/products';

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
}

export async function updateProduct(product: Product): Promise<Product> {
    const res = await fetch(`${API_URL}/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
}
