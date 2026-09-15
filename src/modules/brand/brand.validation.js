import { z } from "zod";

const updateBrandSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),

  phone: z.string().trim().optional(),

  website: z.string().trim().optional(),

  logo: z.string().trim().optional(),
});

export default updateBrandSchema;
