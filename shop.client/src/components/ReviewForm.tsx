import { useState } from 'react';

type ReviewCreateDto = {
    customerId: number;
    productId: number;
    rating: number;
    comment: string;
};

type Props = {
    productId: number;
    customerId: number;
    onAddReview: (review: ReviewCreateDto) => Promise<void>;
};

export function ReviewForm({ productId, customerId, onAddReview }: Props) {
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (rating < 1 || rating > 5) {
            setError('Ocena musi byæ od 1 do 5.');
            return;
        }

        setLoading(true);
        try {
            await onAddReview({
                customerId,
                productId,
                rating,
                comment,
            });
            setComment('');
            setRating(5);
        } catch (err) {
            setError('Wyst¹pi³ b³¹d podczas dodawania recenzji.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <h3>Dodaj recenzjê</h3>
            <div>
                <label>Ocena (1-5): </label>
                <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                />
            </div>

            <div>
                <label>Komentarz:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Wysy³anie...' : 'Dodaj recenzjê'}
            </button>
        </form>
    );
}
