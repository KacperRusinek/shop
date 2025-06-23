
import type { Review } from '../types/review';

type Props = {
    reviews: Review[];
};

export function ReviewList({ reviews }: Props) {
    if (reviews.length === 0) return <p>Brak recenzji.</p>;

    return (
        <ul>
            {reviews.map((r) => (
                <li key={r.id}>
                    <strong>Ocena:</strong> {r.rating} / 5 <br />
                    <strong>Komentarz:</strong> {r.comment} <br />
                    <small>Dodano: {new Date(r.createdAt).toLocaleDateString()}</small>
                </li>
            ))}
        </ul>
    );
}
