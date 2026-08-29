import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, { error: "Email is required." }).pipe(z.email({ error: "Enter a valid email address." })).refine(
    (email: string): boolean => email === "student@gmail.com",
    "Incorrect email. Please check your credentials and try again."
  ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
