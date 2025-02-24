import { IProduct } from "../../shared/interfaces/Product";

export interface IProductResponse {
  success: boolean;
  data?: IProduct;
  error?: string;
}

export interface IProductsResponse {
  success: boolean;
  data?: IProduct[];
  error?: string;
}
