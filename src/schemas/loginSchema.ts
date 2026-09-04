import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: "Username is required." })
    .min(3, { error: "Username must be at least 3 characters." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
