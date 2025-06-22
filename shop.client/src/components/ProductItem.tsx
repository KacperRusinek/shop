import type { Product } from '../types/product';

interface Props {
    product: Product;
}

export function ProductItem({ product }: Props) {
    return (
        <li>
            {product.name} - {product.price} PLN
        </li>
    );
}
