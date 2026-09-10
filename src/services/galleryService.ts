// Thin async data-access wrapper for gallery items.

import { GALLERY_ITEMS } from "@/features/gallery/data/galleryData";
import type { GalleryItem } from "@/types";

export { GALLERY_ITEMS };

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return GALLERY_ITEMS;
}
