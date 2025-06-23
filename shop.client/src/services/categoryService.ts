import type { category } from '../types/category';

const API_URL = 'https://localhost:58292/api/categories';

export async function fetchCategories(): Promise<category[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function createCategory(name: string): Promise<category> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
}
