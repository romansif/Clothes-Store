import type { ColorItem } from "@/shared";

export interface OrderPosition {
  id: string;
  orderId: string;
  productId: string;
  title: string;
  images?: string;
  sku: string;
  price: number;
  quantity: number;
  total_price: number;
  status: string;
  processed_at: string;
  date_created_at: string;
  time_created_at: string;
  created_at: string;
  date_processed_at: string;
  time_processed_at: string;
  cancelled_at: string;
  date_cancelled_at: string;
  time_cancelled_at: string;
  cause_replace: string;
  size: string;
  color: ColorItem;
  category: string;
  material: string;
  gender: string;
  description: string;
}

export interface OrderProps {
  id: string;
  userId: string;
  orderTotal: number;
  delivery: string;
  status: string;
  processed_at: string;
  date_created_at: string;
  time_created_at: string;
  cause_replace: string;
  cancelled_at: string;
  date_cancelled_at: string;
  time_cancelled_at: string;
  created_at: string;
  date_processed_at: string;
  time_processed_at: string;
  addressId: string;
  contactId: string;
  paymentId: string;
  idempotencyKey: string;
  deliveryInfo: string;
}

export interface SellerOrderProps {
  id: string;
  orderId: string;
  productId: string;
  status: string;
  quantity: number;
  price: number;
  total_price: number;
  title: string;
  description: string;
  category: string;
  gender: string;
  material: string;
  sku: string;
  size: string;
  color: ColorItem;
  images: string[];
  created_at: string;
  date_created_at: string;
  time_created_at: string;
  processed_at: string | null;
  date_processed_at: string | null;
  time_processed_at: string | null;
  cancelled_at: string | null;
  date_cancelled_at: string | null;
  time_cancelled_at: string | null;
  cause_replace: string | null;
  order: SellerOrderInfo;
}

export interface SellerOrderInfo {
  id: string;
  status: string;
  delivery: string;
  created_at: string;
  date_created_at: string;
  time_created_at: string;
}
