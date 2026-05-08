import { db } from '../config/firebase';

type FirestoreProduct = {
  id?: string | number;
  title?: string;
  description?: string;
  imageUrl?: string;
  images?: string[];
  price?: string | number;
  oldprice?: string | number;
  rating?: string | number;
  ratingcount?: string | number;
  stock?: string | number;
  isTrending?: boolean;
  isDeal?: boolean;
  categoryId?: string;
  categoryTitle?: string;
  sizes?: string[];
};

type FirestoreCategory = {
  name?: string;
  image?: string;
  isActive?: boolean;
  order?: number | string;
};

type FirestoreBanner = {
  title?: string;
  subtitle?: string;
  image?: string;
  isActive?: boolean;
  sortOrder?: number | string;
};

type FirestoreOffer = {
  key?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type AppProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  oldprice?: number;
  rating: number;
  ratingcount?: number;
  stock: number;
  image: string;
  imageUrl?: string;
  images: string[];
  category: string;
  categoryId?: string;
  sizes: string[];
  isTrending?: boolean;
  isDeal?: boolean;
};

export type AppCategory = {
  id: string;
  title: string;
  image: string;
  isActive: boolean;
  order: number;
};

export type AppBanner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
};

export type AppOffer = {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
};

export type HomeDataResponse = {
  products: AppProduct[];
  categories: AppCategory[];
  banners: AppBanner[];
  offers: AppOffer[];
};

const toNumber = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toStringValue = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
};

const mapProduct = (
  docId: string,
  raw: FirestoreProduct | undefined
): AppProduct => {
  const imageFromArray =
    Array.isArray(raw?.images) && raw?.images.length > 0
      ? raw.images[0]
      : '';

  const image = toStringValue(raw?.imageUrl, imageFromArray);

  return {
    id: toStringValue(raw?.id, docId || ''),
    title: toStringValue(raw?.title, 'Untitled Product'),
    description: toStringValue(raw?.description, ''),
    price: toNumber(raw?.price, 0),
    oldprice: toNumber(raw?.oldprice, 0),
    rating: toNumber(raw?.rating, 0),
    ratingcount: toNumber(raw?.ratingcount, 0),
    stock: toNumber(raw?.stock, 0),
    image,
    imageUrl: toStringValue(raw?.imageUrl, image),
    images: Array.isArray(raw?.images)
      ? raw!.images.filter((item) => typeof item === 'string' && item.trim())
      : image
      ? [image]
      : [],
    category: toStringValue(raw?.categoryTitle, 'Uncategorized'),
    categoryId: toStringValue(raw?.categoryId, ''),
    sizes: Array.isArray(raw?.sizes)
      ? raw!.sizes.filter((item) => typeof item === 'string')
      : [],
    isTrending: Boolean(raw?.isTrending),
    isDeal: Boolean(raw?.isDeal),
  };
};

const mapCategory = (
  docId: string,
  raw: FirestoreCategory | undefined
): AppCategory => ({
  id: docId,
  title: toStringValue(raw?.name, 'Category'),
  image: toStringValue(raw?.image, ''),
  isActive: Boolean(raw?.isActive),
  order: toNumber(raw?.order, 0),
});

const mapBanner = (
  docId: string,
  raw: FirestoreBanner | undefined
): AppBanner => ({
  id: docId,
  title: toStringValue(raw?.title, ''),
  subtitle: toStringValue(raw?.subtitle, ''),
  image: toStringValue(raw?.image, ''),
  isActive: Boolean(raw?.isActive),
  sortOrder: toNumber(raw?.sortOrder, 0),
});

const mapOffer = (
  docId: string,
  raw: FirestoreOffer | undefined
): AppOffer => ({
  id: docId,
  key: toStringValue(raw?.key, docId),
  title: toStringValue(raw?.title, ''),
  subtitle: toStringValue(raw?.subtitle, ''),
  image: toStringValue(raw?.imageUrl ?? raw?.image, ''),
  isActive: Boolean(raw?.isActive),
});

export const getAllProducts = async (): Promise<AppProduct[]> => {
  const snapshot = await db.collection('products').get();

  return snapshot.docs
    .map((doc) => mapProduct(doc.id, doc.data() as FirestoreProduct))
    .filter((item) => item.title.trim().length > 0);
};

export const getAllCategories = async (): Promise<AppCategory[]> => {
  const snapshot = await db.collection('categories').get();

  return snapshot.docs
    .map((doc) => mapCategory(doc.id, doc.data() as FirestoreCategory))
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);
};

export const getAllBanners = async (): Promise<AppBanner[]> => {
  const snapshot = await db.collection('banners').get();

  return snapshot.docs
    .map((doc) => mapBanner(doc.id, doc.data() as FirestoreBanner))
    .filter((item) => item.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getAllOffers = async (): Promise<AppOffer[]> => {
  const snapshot = await db.collection('offers').get();

  return snapshot.docs
    .map((doc) => mapOffer(doc.id, doc.data() as FirestoreOffer))
    .filter((item) => item.isActive);
};

export const getHomeData = async (): Promise<HomeDataResponse> => {
  const [products, categories, banners, offers] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllBanners(),
    getAllOffers(),
  ]);

  return {
    products,
    categories,
    banners,
    offers,
  };
};