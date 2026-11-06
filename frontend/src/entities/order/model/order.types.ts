import type { ColorItem } from "@/shared";

export interface OrderPosition {
  id: string;
  orderId: string;
  productId: string;
  title: string;
  images?: string[];
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
