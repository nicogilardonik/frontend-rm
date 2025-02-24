import { ICompany } from "../../features/product-list/interfaces/Company";
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

export interface ICompanyResponse {
  success: boolean;
  data?: ICompany;
  error?: string;
}
