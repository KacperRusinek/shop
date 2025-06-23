import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import type { Product } from '../types/product';

export function Home() {
    const { products, loading, error } = useProducts();

    const handleEdit = (product: Product) => {
        alert(`Edit product ${product.id}`);
        // tutaj mo¿esz otworzyæ formularz edycji
    };

    // w Home.tsx
    const handleDelete = async (productId: number): Promise<void> => {
        alert(`Delete product ${productId}`);
        // np. await deleteProduct(productId);
    };




    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Products</h1>
            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete} onSelectProduct={function(id: number): void {
                    throw new Error('Function not implemented.');
                } }            />

        </div>
    );
}
