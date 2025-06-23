import * as React from 'react';
import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import './components.css';


type Props = {
    onAddCategory: (name: string) => Promise<void>;
};

export function CategoryForm({ onAddCategory }: Props) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { reload } = useCategories();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await onAddCategory(name.trim());
            reload();
            setName('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New category name"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
        </form>

  );
}
