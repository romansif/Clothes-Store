import type { ImageItem } from "@/shared/model";

export interface ReviewUser {
  name: string;
  surName: string;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  user: ReviewUser;
  rating: number;
  comment: string;
  images?: ImageItem[];
  created_at: string;
}
