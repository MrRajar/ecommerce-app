import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const db = firestore();

export type FsProduct = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  ratingCount?: number;
  category?: string;
  categoryId?: string;
  categoryTitle?: string;
  images?: string[];
  image?: string;
  imageUrl?: string;
  description?: string;
  subtitle?: string;
  sizes?: string[];
  tags?: string[];
  isTrending?: boolean;
  isDeal?: boolean;
  isWishlist?: boolean;
  stock?: number;
  createdAt?: any;
  [key: string]: any;
};

type DocSnap =
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

const cleanString = (value: any) =>
  typeof value === 'string' ? value.trim() : '';

const toNumber = (value: any, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const normalizeUrl = (value: any) => {
  const clean = typeof value === 'string' ? value.trim() : '';

  if (!clean) return '';

  if (clean.startsWith('//')) return encodeURI(`https:${clean}`);
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return encodeURI(clean);
  }

  return encodeURI(clean);
};

const pickImages = (data: any): string[] => {
  if (!Array.isArray(data.images)) return [];

  return data.images
    .map((img: any) => {
      if (typeof img === 'string') return normalizeUrl(img);

      if (img && typeof img === 'object') {
        return normalizeUrl(
          img.secure_url || img.url || img.image || img.imageUrl
        );
      }

      return '';
    })
    .filter(Boolean);
};

const pickImage = (data: any, images: string[]): string => {
  const direct = [
    data.image,
    data.imageUrl,
    data.thumbnail,
    data.photoUrl,
    data.secure_url,
    data.url,
  ]
    .map(normalizeUrl)
    .filter(Boolean);

  if (direct.length > 0) return direct[0];
  if (images.length > 0) return images[0];

  return '';
};

const mapProductDoc = (doc: DocSnap): FsProduct => {
  const data = (doc.data() || {}) as any;

  const images = pickImages(data);
  const image = pickImage(data, images);

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag: any) => String(tag).toLowerCase().trim())
    : [];

  const price = toNumber(data.price, 0);
  const oldPrice =
    data.oldPrice !== undefined
      ? toNumber(data.oldPrice)
      : data.oldprice !== undefined
      ? toNumber(data.oldprice)
      : undefined;

  const rating =
    data.rating !== undefined ? toNumber(data.rating, 4) : 4;

  const ratingCount =
    data.ratingCount !== undefined
      ? toNumber(data.ratingCount, 0)
      : data.ratingcount !== undefined
      ? toNumber(data.ratingcount, 0)
      : 0;

  const normalizedCategory =
    cleanString(data.category) ||
    cleanString(data.categoryTitle) ||
    cleanString(data.categoryId);

  const sizes = Array.isArray(data.sizes)
    ? data.sizes.map((size: any) => String(size))
    : ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'];

  return {
    ...data,
    id: String(data.id ?? doc.id),
    title: String(data.title || data.name || ''),
    price,
    oldPrice,
    rating,
    ratingCount,
    category: normalizedCategory.toLowerCase(),
    categoryId: cleanString(data.categoryId).toLowerCase(),
    categoryTitle: cleanString(data.categoryTitle),
    description: String(data.description || ''),
    subtitle: String(data.subtitle || ''),
    image,
    imageUrl: normalizeUrl(data.imageUrl),
    images,
    sizes,
    tags,
    isTrending:
      Boolean(data.isTrending) ||
      tags.includes('trending') ||
      tags.includes('trend'),
    isDeal:
      Boolean(data.isDeal) ||
      tags.includes('deal') ||
      tags.includes('deals') ||
      (oldPrice !== undefined && oldPrice > price),
    isWishlist: Boolean(data.isWishlist) || tags.includes('wishlist'),
    stock: data.stock !== undefined ? toNumber(data.stock) : undefined,
    createdAt: data.createdAt,
  };
};

// Firebase path from your screenshots:
// products / products / products / {doc}
export const getAllProducts = async (limit = 200): Promise<FsProduct[]> => {
  const snap = await db
    .collection('products')
    .doc('products')
    .collection('products')
    .limit(limit)
    .get();

  const items = snap.docs.map(mapProductDoc);

  console.log(
    'FIREBASE PRODUCTS =>',
    items.map((item) => ({
      title: item.title,
      images: item.images,
      imageUrl: item.imageUrl,
      firstImage: item.images?.[0],
    }))
  );

  return items.filter((item) => item.title);
};