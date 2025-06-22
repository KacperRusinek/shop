import type { Product } from '../types/product';

type Props = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

export function ProductList({ products, onEdit, onDelete }: Props) {
    if (products.length === 0) return <p>No products found.</p>;

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
                        <td>{p.categoryId || '-'}</td>
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
