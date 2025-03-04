import axios from "axios";
import { IProductResponse } from "../../../core/interfaces/Response";

const cfNTLC = axios.create({
  baseURL: import.meta.env.VITE_CF_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProduct = async (
  productId: string
): Promise<IProductResponse> => {
  try {
    const response = await cfNTLC.get(
      `search-properties?propertyId=${productId}`
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(`Error obteniendo el producto ${productId}:`, error);
    return {
      success: false,
      error:
        "❌ No se pudo cargar el producto. Será rederigido a la pagina principal.",
    };
  }
};

export const createCheckout = async (checkoutData: any) => {
  try {
    const response = await cfNTLC.post("/", checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error creando el checkout:", error);
    throw error;
  }
};
