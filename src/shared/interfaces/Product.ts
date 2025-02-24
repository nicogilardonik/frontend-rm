export interface IProduct {
  id: string;
  ratingSummary: number;
  shopifyId: string;
  notes: string;
  propertyAddress: string;
  minNightStay: number;
  propertyState: string;
  isDraft: boolean;
  injurancType: string;
  propertyCity: string;
  propertyLocation: {
    _latitude: number;
    _longitude: number;
  };
  taxRate: number;
  lastUpdated: Timestamp;
  userRef: string;
  isLive: boolean;
  minNights: number;
  currency: string;
  cleaningFee: number;
  price: number;
  additionalImages: string[];
  mainImage: string;
  propertyType: string;
  propertyName: string;
  updatedAt: Timestamp;
  propertyDescription: string;
  categories: Category[];
  handle: string;
  isAvailableBetweenDates: boolean;
  discountAmount: number;
}

export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}
export interface Category {
  _firestore: {
    projectId: string;
  };
  _path: {
    segments: string[];
  };
  _converter: object;
}
