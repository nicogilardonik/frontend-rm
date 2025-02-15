import axios from "axios";

const API_BASE_URL =
  "https://us-central1-notelocompres-1dd5e.cloudfunctions.net/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProduct = async (checkoutId: string) => {
  try {
    const response = await api.get(`/${checkoutId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el producto ${checkoutId}:`, error);
    throw error;
  }
};

export const createCheckout = async (checkoutData: any) => {
  try {
    const response = await api.post("/", checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error creando el checkout:", error);
    throw error;
  }
};
