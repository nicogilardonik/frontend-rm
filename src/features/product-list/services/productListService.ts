import axios from "axios";
import { IProduct } from "../../../shared/interfaces/Product";
import {
  ICompanyResponse,
  IProductsResponse,
} from "../../../core/interfaces/Response";
import { ICompany } from "../interfaces/Company";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const _getProducts = async (
  companyId: string
): Promise<IProductsResponse> => {
  try {
    const response = await api.get(`search-properties?companyId=${companyId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "❌ No se pudieron cargar los productos.",
    };
  }
};

export const getProducts = async (
  companyId: string
): Promise<IProductsResponse> => {
  try {
    console.log(`📡 Simulando llamada a la API... companyId: ${companyId}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: products,
        });
      }, 1000);
    });
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
    console.log(`📡 Simulando llamada a la API... companyId: ${companyId}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: companyInfo,
        });
      }, 1000);
    });
  } catch (error) {
    return {
      success: false,
      error: "❌ No se pudo cargar la información de la Compañía.",
    };
  }
};

const companyInfo: ICompany = {
  id: "1",
  name: "Rentalomio",
  image:
    "https://ugc.production.linktr.ee/6d075299-210f-44c5-97c5-c49146314d1f_dJMlaretdZv1qakUtk37MqbHH6lX-SA6DVn6upjweuZwpYJD4N9HBIG5oYdA04ZTbtzuvF7u9g-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-hero-v1_0",
  color: "#1E40AF",
};

const products: IProduct[] = [
  {
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
    minNights: 1,
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
    id: "2EI9MBmX6abmNUGQHq92",
    isAvailableBetweenDates: true,
    discountAmount: 0,
  },
  {
    ratingSummary: 0,
    shopifyId: "8834088206633",
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
      _seconds: 1707409764,
      _nanoseconds: 0,
    },
    userRef: "Ezi9vrrNV2pPhvtP1qjH",
    isLive: true,
    minNights: 1,
    propertyName: "Kit Sacabollos",
    currency: "UYU",
    cleaningFee: 0,
    price: 250,
    additionalImages: [
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FS26l6vxMmQ.jpg?alt=media",
    ],
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fmains%2FS26l6vxMmQ_800x450.webp?alt=media",
    propertyType: "Objects",
    updatedAt: {
      _seconds: 1733865042,
      _nanoseconds: 427000000,
    },
    propertyDescription:
      "Ideal para arreglar golpes y pequeos choques de autos o camionetas",
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
    handle: "alquiler-de-kit-sacabollos-ideal-para-arreglar",
    id: "hVbN3fKswZKirkzMGeFi",
    isAvailableBetweenDates: true,
    discountAmount: 0,
  },
  {
    ratingSummary: 0,
    shopifyId: "8857476596009",
    notes: "",
    propertyAddress: "Arazatí, 11300 Montevideo, Departamento de Montevideo",
    minNightStay: 1,
    propertyState: "Montevideo",
    injurancType: "Reserva Protegida",
    propertyCity: "Montevideo",
    propertyLocation: {
      _latitude: -34.907608,
      _longitude: -56.1548658,
    },
    taxRate: 0,
    lastUpdated: {
      _seconds: 1707496164,
      _nanoseconds: 0,
    },
    userRef: "ady",
    minNights: 1,
    currency: "UYU",
    cleaningFee: 0,
    price: 650,
    additionalImages: [
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FvQF5e5nOj5.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FOKKoWUs84E.jpg?alt=media",
    ],
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fmains%2FvQF5e5nOj5_800x450.webp?alt=media",
    isLive: true,
    isDraft: false,
    propertyType: "Objects",
    propertyName: "Camilla Para Masajes",
    updatedAt: {
      _seconds: 1733865042,
      _nanoseconds: 479000000,
    },
    propertyDescription:
      "Precio por 10 das 4500Camilla para masajes con posabrazos, hueco yextensin para masajes cervicalesSoporta 130 kgCon madera de hayaDe camillas Maldonado, con forro para transportar.Tal cul la foto",
    categories: [
      {
        _firestore: {
          projectId: "notelocompres-1dd5e",
        },
        _path: {
          segments: ["categories", "5WGdpIbOE00kqSn5f8qA"],
        },
        _converter: {},
      },
      {
        _firestore: {
          projectId: "notelocompres-1dd5e",
        },
        _path: {
          segments: ["categories", "2Ouygk5kEOx0bX3Lij0U"],
        },
        _converter: {},
      },
    ],
    handle: "alquiler-de-camilla-para-masajes-precio-por",
    id: "ddwQfTTNtjqMas9CkOsA",
    isAvailableBetweenDates: true,
    discountAmount: 0,
  },
  {
    ratingSummary: 0,
    shopifyId: "8871063781673",
    notes: "",
    propertyAddress: "Julio A. Lapi",
    minNightStay: 1,
    propertyState: "Maldonado",
    isDraft: false,
    injurancType: "Reserva Protegida",
    propertyCity: "Sauce de Portezuelo",
    taxRate: 0,
    lastUpdated: {
      _seconds: 1707582564,
      _nanoseconds: 0,
    },
    userRef: "m6449e4xihc4JNwuiL5c",
    isLive: true,
    minNights: 1,
    currency: "UYU",
    cleaningFee: 0,
    price: 350,
    additionalImages: [
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FDgUExKDuDn.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FmdGKeuGIl9.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FBDf77NqTtC.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FXfSUGR7tsk.png?alt=media",
    ],
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fmains%2FDgUExKDuDn_800x450.webp?alt=media",
    propertyType: "Objects",
    propertyLocation: {
      _latitude: -34.8731242,
      _longitude: -55.1669996,
    },
    propertyName: "Vestido Corto De Fiesta",
    updatedAt: {
      _seconds: 1733865042,
      _nanoseconds: 497000000,
    },
    propertyDescription:
      "Talle SSe encuentra por Maldonado pero se peude entregar en Montevideo. Consulte antes.",
    categories: [
      {
        _firestore: {
          projectId: "notelocompres-1dd5e",
        },
        _path: {
          segments: ["categories", "PdXR9jKqBIVqIVSkOJbK"],
        },
        _converter: {},
      },
    ],
    handle: "alquiler-de-vestido-corto-de-fiesta-talle",
    id: "aPaaGYSYK4Aa4a4mN59D",
    isAvailableBetweenDates: true,
    discountAmount: 0,
  },
  {
    ratingSummary: 0,
    shopifyId: "8154294255913",
    notes: "",
    minNightStay: 1,
    isDraft: false,
    injurancType: "Reserva Protegida",
    lastUpdated: {
      _seconds: 1707668964,
      _nanoseconds: 0,
    },
    userRef: "m6449e4xihc4JNwuiL5c",
    isLive: true,
    minNights: 1,
    currency: "UYU",
    price: 250,
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fmains%2F5KRAoaD8gN_800x450.webp?alt=media",
    propertyCity: "Punta Ballena",
    propertyLocation: {
      _latitude: -34.8683704,
      _longitude: -55.08130629999999,
    },
    propertyAddress:
      "Ruta Interbalnearia 118, Punta Ballena, Departamento de Maldonado, Uruguay",
    propertyState: "Departamento de Maldonado",
    propertyType: "Objects",
    propertyName: "Valija De Viaje Rígida - Para 23 Y 32 Kilos",
    bestSeller: null,
    id: "vNOmalQz3HhfLHUjnvbB",
    updatedAt: {
      _seconds: 1733865042,
      _nanoseconds: 320000000,
    },
    taxRate: 0,
    additionalImages: [
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2F5KRAoaD8gN.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2Fn0cqESfGhI.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/notelocompres-1dd5e.appspot.com/o/assets%2Fproperties%2FXTMNB4a48H.jpg?alt=media",
    ],
    cleaningFee: 0,
    propertyDescription:
      "Marca Kenneth Cole REACTION.La us en 3 viajes sin problema, soporta hasta 32 kilos. Disponible tambin para retirar por Maldonado.",
    categories: [],
    handle: "alquiler-de-valija-de-viaje-rgida-para-23-y-32-kilos",
    discountAmount: 0,
    isAvailableBetweenDates: true,
  },
];
