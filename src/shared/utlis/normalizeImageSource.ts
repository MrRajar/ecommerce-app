import { ImageSourcePropType } from 'react-native';

export const normalizeImageSource = (
  image?: string | null
): ImageSourcePropType | undefined => {
  if (!image || !image.trim()) return undefined;

  const finalUrl = image.trim().startsWith('//')
    ? `https:${image.trim()}`
    : image.trim();

  return { uri: encodeURI(finalUrl) };
};