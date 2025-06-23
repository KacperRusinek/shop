export type Review = {
    id: number;
    customerId: number;
    productId: number;
    rating: number;
    comment: string;
    createdAt: string; 
};

export type ReviewCreateDto = {
    customerId: number;
    productId: number;
    rating: number;
    comment: string;
};
