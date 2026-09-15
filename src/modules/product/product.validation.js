import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().trim().min(2, "Product name is required").max(200),

  description: z.string().trim().max(2000).optional(),

  category: z.string().trim().max(100).optional(),

  image: z.string().trim().optional(),

  manufacturer: z.string().trim().max(200).optional(),

  manufacturingCountry: z.string().trim().max(100).optional(),
});

const updateProductSchema = createProductSchema.partial();

export { createProductSchema, updateProductSchema };
