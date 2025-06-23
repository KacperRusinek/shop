import type { Review, ReviewCreateDto } from '../types/review';

const API_URL = 'https://localhost:58292/api/reviews';


export async function fetchReviews(productId: number): Promise<Review[]> {
    const res = await fetch(`${API_URL}?productId=${productId}`);
    if (!res.ok) throw new Error('Nie uda³o siê pobraæ recenzji');
    return res.json();
}

export async function addReview(review: ReviewCreateDto): Promise<void> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error('Nie uda³o siê dodaæ recenzji');
}

