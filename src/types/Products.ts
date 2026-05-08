// src/types/Products.ts
import { ImageSourcePropType } from "react-native";

/**
 * ImageInput covers:
 * - remote URLs (string)
 * - local require(...) numbers (number via ImageSourcePropType)
 * - { uri: string } objects
 */
export type ImageInput = string | ImageSourcePropType;

export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  image?: ImageInput;
  images?: ImageInput[];
  category?: string;
  isTrending?: boolean;
  isDeal?: boolean;
  isWishlist?: boolean;
  description?: string;
  inStock?: boolean;
  deliveryETA?: string;
  sizes?: string[];
  colors?: string[];
  similar?: Product[];
  meta?: string;
  [k: string]: any;
}
