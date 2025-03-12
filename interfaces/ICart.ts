export interface ICart {
  id: 1;
  order_id: 1;
  product_id: 1;
  quantity: 1;
  created_at: null;
  updated_at: null;
}

export interface ICartRequest {
    product_id: number;
    quantity: number;
    price: number;
    name: string;
}
