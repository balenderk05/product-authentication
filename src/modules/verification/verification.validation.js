import { z } from "zod";

const verificationCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(5, "Verification code is required")
    .max(100, "Invalid verification code"),
});

export { verificationCodeSchema };
