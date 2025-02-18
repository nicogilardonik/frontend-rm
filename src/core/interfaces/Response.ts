import { Product } from "../../shared/interfaces/Product";

export interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

export interface ProductsResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}
