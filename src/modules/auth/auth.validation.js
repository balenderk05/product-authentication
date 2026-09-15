import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(100, "Brand name cannot exceed 100 characters"),

  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),

  phone: z.string().trim().optional(),

  website: z.string().trim().optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export { registerSchema, loginSchema };
