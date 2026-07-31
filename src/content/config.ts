import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readTime: z.number(),
    excerpt: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    // Plain public URL string (e.g. "/uploads/foo.png"), not astro:assets image() —
    // Decap CMS uploads land in public/uploads and must be referenceable by a stable
    // URL the CMS's own preview pane can show immediately, before any rebuild.
    thumbnail: z.string(),
    authorName: z.string(),
    authorInitials: z.string(),
    authorRole: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
