import axios from "axios";
import {
  ICompanyResponse,
  IProductResponse,
} from "../../../core/interfaces/Response";
import { ReservationRM } from "../interfaces/ReservationRM";
import { ReservationMP } from "../interfaces/ReservationMP";

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

const apiMP = axios.create({
  baseURL: "https://api.mercadopago.com/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export const setCompanyIdHeader = (companyId: string) => {
  apiRM.defaults.headers["rm-comp-id"] = companyId;
};

export const getProduct = async (
  productId: string
): Promise<IProductResponse> => {
  try {
    const response = await cfRM.get(
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

export const createReservationRM = async (reservation: ReservationRM) => {
  try {
    const response = await apiRM.post("reservations", reservation);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creando la reserva:", error);
    return {
      success: false,
      error: "❌ No se pudo crear la reserva, intente mas tarde.",
    };
  }
};

export const createReservationMP = async (reservation: ReservationMP) => {
  try {
    const body = {
      items: [
        {
          id: reservation.tripRef,
          title: reservation.productTitle,
          picture_url: reservation.productImage,
          quantity: 1,
          currency_id: reservation.currency,
          unit_price: reservation.price,
        },
      ],
      payer: {
        name: reservation.userName,
        surname: reservation.userLastname,
        email: reservation.email,
      },
      payment_methods: {
        default_installments: 1,
      },
      back_urls: {
        success: `https://www.rentalomio.com/detalles-de-la-reserva?propertyRef=${reservation.productId}&tripRef=${reservation.tripRef}&paymentResult=success`,
        pending: `https://www.rentalomio.com/detalles-de-la-reserva?propertyRef=${reservation.productId}&tripRef=${reservation.tripRef}&paymentResult=pending`,
        failure: `https://www.rentalomio.com/detalles-de-la-reserva?propertyRef=${reservation.productId}&tripRef=${reservation.tripRef}&paymentResult=failure`,
      },
    };
    const response = await apiMP.post("checkout/preferences", body);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creando la reserva en MP:", error);
    return {
      success: false,
      error: "❌ No se pudo crear la reserva, intente mas tarde.",
    };
  }
};
