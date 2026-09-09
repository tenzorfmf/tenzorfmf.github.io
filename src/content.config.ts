import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------ *
 * Shared field fragments
 * ------------------------------------------------------------------ */

const LOCALES = ['sl', 'en'] as const;

/** A slug segment: lowercase ascii, digits, hyphens. No slashes, no dots. */
const slugSegment = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase ascii words separated by single hyphens')
  .or(z.literal('/')); // home page uses "/"

const translationKey = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'translationKey must be kebab-case ascii');

const navSchema = z.object({
  include: z.boolean().default(false),
  label: z.string().min(1),
  section: z.enum(['main', 'utility']).default('main'),
  parent: translationKey.nullable().default(null),
  order: z.number().int().default(999),
});

const seoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    noindex: z.boolean().default(false),
  })
  .default({});

const imageRef = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, 'alt text is required and must not be empty'),
  caption: z.string().optional(),
});

const attachmentItem = z.object({
  label: z.string().min(1),
  path: z.string().startsWith('/', 'attachment path must be site-absolute (start with /)'),
  mediaType: z.string().min(1),
  language: z.enum(LOCALES).optional(),
});

const sourceItem = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  archivedUrl: z.string().url().nullable().default(null),
  accessedAt: z.coerce.date().nullable().default(null),
});

/* ------------------------------------------------------------------ *
 * pages collection
 * ------------------------------------------------------------------ */

/** Force the entry id to the file path so a frontmatter `slug` stays a plain data field. */
const idFromPath = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages', generateId: idFromPath }),
  schema: ({ image: _image }) =>
    z
      .object({
        translationKey,
        lang: z.enum(LOCALES),
        title: z.string().min(1),
        slug: slugSegment,
        summary: z.string().min(1).nullable().default(null),
        draft: z.boolean().default(false),
        updatedAt: z.coerce.date().nullable().default(null),
        nav: navSchema,
        search: z
          .object({
            include: z.boolean().default(true),
            type: z.enum(['page', 'person', 'document', 'archive']).default('page'),
          })
          .default({}),
        seo: seoSchema,
        aliases: z.array(z.string().startsWith('/')).default([]),
        attachments: z.array(attachmentItem).default([]),
        hero: imageRef.nullable().default(null),
      }),
});

/* ------------------------------------------------------------------ *
 * posts collection
 * ------------------------------------------------------------------ */

const KINDS = ['news', 'statement', 'event', 'document', 'archive'] as const;

const eventSchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date().nullable().default(null),
  timezone: z.string().min(1),
  venue: z.string().optional(),
  address: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts', generateId: idFromPath }),
  schema: () =>
    z
      .object({
        translationKey,
        lang: z.enum(LOCALES),
        title: z.string().min(1),
        slug: slugSegment,
        summary: z.string().min(1),
        kind: z.enum(KINDS),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().nullable().default(null),
        category: z.string().min(1),
        tags: z.array(z.string().min(1)).default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        hero: imageRef.nullable().default(null),
        attachments: z.array(attachmentItem).default([]),
        sources: z.array(sourceItem).default([]),
        event: eventSchema.nullable().default(null),
        search: z
          .object({
            include: z.boolean().default(true),
            type: z.enum(['page', 'news', 'event', 'document', 'person', 'archive']).default('news'),
          })
          .default({}),
        aliases: z.array(z.string().startsWith('/')).default([]),
      })
      .superRefine((data, ctx) => {
        if (data.kind === 'event' && (!data.event || !data.event.start || !data.event.timezone)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'kind "event" requires event.start and event.timezone', path: ['event'] });
        }
        if (data.kind === 'document') {
          const hasAttachment = data.attachments.length > 0;
          const hasSourceUrl = data.sources.some((s) => !!s.url);
          if (!hasAttachment && !hasSourceUrl) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'kind "document" requires at least one attachment or one authoritative source URL',
              path: ['attachments'],
            });
          }
        }
      }),
});

export const collections = { pages, posts };
