import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  // Defaults below aren't just style preference: a CMS-authored post with a field
  // left blank must never fail Zod parsing, because one bad post fails the whole
  // site build and Netlify silently keeps serving the previous deploy.
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().default(() => new Date()),
    readTime: z.number().default(5),
    excerpt: z.string().default(""),
    category: z.string().default("Uncategorized"),
    tags: z.array(z.string()).default([]),
    // Plain public URL string (e.g. "/uploads/foo.png"), not astro:assets image() —
    // Decap CMS uploads land in public/uploads and must be referenceable by a stable
    // URL the CMS's own preview pane can show immediately, before any rebuild.
    thumbnail: z.string().default(""),
    authorName: z.string().default("작성자 미입력"),
    authorInitials: z.string().default("??"),
    authorRole: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
