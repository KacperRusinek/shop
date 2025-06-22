import * as React from 'react';
import type { Product } from '../types/product';
import type { category } from '../types/category';
import { useCategories } from '../hooks/useCategories';

type Props = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export function ProductList({ products, onEdit, onDelete }: Props) {
    const { categories } = useCategories();

    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price (PLN)</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>{p.price.toFixed(2)}</td>
                        <td>{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                        <td>
                            <button onClick={() => onEdit(p)}>Edit</button>{' '}
                            <button onClick={() => onDelete(p.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
