export interface ReviewUser {
    name: string;
    surName: string;
    avatar?: string;
}

export interface ImageItem {
    url: string,
}

export interface Review {
    id: string;
    userId: string;
    productId: string;
    user: ReviewUser;
    images?: ImageItem[];
    rating: number;
    comment: string;
    created_at: string;
}

