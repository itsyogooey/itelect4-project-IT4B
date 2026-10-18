// src/schemas/authSchema.ts -- replaces loginSchema.ts
// GT3's login form had one "username" field and no password. Logging in now
// goes to the real API, which wants an email and a password.
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("That is not an email address."),

  // 8 matches the backend's User schema (minlength: 8). This only moves the
  // message to where it is typed; the database rule is the one that is true.
  password: z.string().min(8, "At least 8 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// .extend() adds to a schema instead of repeating it: register wants the
// same email and password, plus a name.
export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(1, "Your name is required."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
