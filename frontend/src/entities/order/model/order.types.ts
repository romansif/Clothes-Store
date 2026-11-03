import type { ColorItem } from "@/shared";

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  size: string;
  color: ColorItem;
  images?: string[];
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  orderItems: OrderItem[];
  orderTotal: number;
  delivery: string;
  status: string;
  date_created_at: string;
  time_created_at: string;
  cause_replace: string;
  cancelled_at: string;
  date_cancelled_at: string;
  time_cancelled_at: string;
  created_at: string;
  addressId: string;
  contactId: string;
  paymentId: string;
  idempotencyKey: string;
  deliveryInfo: string;
}
