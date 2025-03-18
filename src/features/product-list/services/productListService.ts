import axios from "axios";
import {
  ICompanyResponse,
  IProductsResponse,
} from "../../../core/interfaces/Response";

const cfRM = axios.create({
  baseURL: import.meta.env.VITE_CF_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRM = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setCompanyIdHeader = (companyId: string) => {
  apiRM.defaults.headers["rm-comp-id"] = companyId;
};

export const getProducts = async (
  companyId: string
): Promise<IProductsResponse> => {
  try {
    const response = await cfRM.get(`search-properties?companyId=${companyId}`);
    return {
      success: true,
      data: response.data.properties,
    };
  } catch (error) {
    return {
      success: false,
      error: "❌ No se pudieron cargar los productos.",
    };
  }
};

export const getCompanyInfo = async (
  companyId: string
): Promise<ICompanyResponse> => {
  try {
    const response = await apiRM.get(`companies/${companyId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "❌ No se pudo cargar la información de la compañía.",
    };
  }
};
