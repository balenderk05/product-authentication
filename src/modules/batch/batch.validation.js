import { z } from "zod";

const createBatchSchema = z.object({
  batchNumber: z
    .string()
    .trim()
    .min(1, "Batch number is required")
    .max(100, "Batch number cannot exceed 100 characters"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(100000, "Maximum 100000 units can be generated at once"),
});

export { createBatchSchema };
