import { useEffect, useState } from 'react';
import type { category } from '../types/category';
import { fetchCategories } from '../services/categoryService';

export function useCategories() {
    const [categories, setCategories] = useState<category[]>([]);
    const [error, setError] = useState<string | null>(null);

    const reload = () => {
        fetchCategories()
            .then(setCategories)
            .catch(e => setError(e.message));
    };

    useEffect(reload, []);

    return { categories, error, reload };
}
