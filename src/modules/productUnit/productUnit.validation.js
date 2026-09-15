import { z } from "zod";

const generateCodesSchema = z.object({
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .max(
            10000,
            "Maximum 10000 codes can be generated at once"
        )
});

export {
    generateCodesSchema
};