import axios from "axios";
import { IProductResponse } from "../../../core/interfaces/Response";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProduct = async (
  productId: string
): Promise<IProductResponse> => {
  try {
    const response = await api.get(`search-properties?propertyId=${productId}`);
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

export const _getProduct = async (
  checkoutId: string
): Promise<IProductResponse> => {
  try {
    console.log("📡 Simulando llamada a la API...");

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Producto cargado exitosamente");
        resolve({
          success: true,
          data: product,
        });
      }, 2000);
    });
  } catch (error) {
    console.error(`Error obteniendo el producto ${checkoutId}:`, error);
    return {
      success: false,
      error:
        "❌ No se pudo cargar el producto. Será rederigido a la pagina principal.",
    };
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

const product = {
  id: "SFrn2mNXt6",
  ratingSummary: 0,
  shopifyId: "8834088173865",
  notes: "",
  propertyAddress:
    "Irigoitia 1194, 11700 Montevideo, Departamento de Montevideo",
  minNightStay: 1,
  propertyState: "Montevideo",
  isDraft: false,
  injurancType: "Reserva Protegida",
  propertyCity: "Montevideo",
  propertyLocation: {
    _latitude: -34.86625759999999,
    _longitude: -56.1992214,
  },
  taxRate: 0,
  lastUpdated: {
    _seconds: 1707323364,
    _nanoseconds: 0,
  },
  userRef: "Ezi9vrrNV2pPhvtP1qjH",
  isLive: true,
  minNights: 2,
  currency: "UYU",
  cleaningFee: 0,
  price: 250,
  additionalImages: [
    "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FSFrn2mNXt6.jpg?alt=media",
  ],
  mainImage:
    "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fmains%2FSFrn2mNXt6_800x450.webp?alt=media",
  propertyType: "Objects",
  propertyName: "Trozador De Leña O Madera",
  updatedAt: {
    _seconds: 1733865041,
    _nanoseconds: 891000000,
  },
  propertyDescription:
    "Trovador, ideal para cortar lea o madera.En excelente estado.",
  categories: [
    {
      _firestore: {
        projectId: "notelocompres-1dd5e",
      },
      _path: {
        segments: ["categories", "xwETLIdbm0ueCEcGi174"],
      },
      _converter: {},
    },
  ],
  handle: "alquiler-de-trozador-de-lea-o-madera",
  isAvailableBetweenDates: true,
  discountAmount: 25,
};
