import type { ImageMetadata } from 'astro';

/**
 * All migrated flyer/poster images, keyed by path relative to
 * src/assets/media/images (e.g. "flyers/program-sz-1.png").
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const byKey = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const key = path.replace('../assets/media/images/', '');
  byKey.set(key, mod.default);
}

export function image(key: string): ImageMetadata {
  const found = byKey.get(key);
  if (!found) {
    throw new Error(
      `media: no image for key "${key}". Known keys: ${[...byKey.keys()].join(', ')}`,
    );
  }
  return found;
}
