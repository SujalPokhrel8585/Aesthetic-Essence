// Shared TypeScript interface definitions for gallery items.

export interface GalleryItem {
  id: string | number;
  src: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "tall";
  featured?: boolean;
}
