// src/schemas/itemSchema.ts -- the "Report an item" form.
// The same rules as itelect4-backend's Item schema, moved to where they are
// typed. The backend still checks them; this is a courtesy to the user.
import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  status: z.enum(["lost", "found"], { error: "Pick lost or found." }),
  // The dropdown's value: a Location code from GET /api/locations.
  locationCode: z.string().min(1, "Pick a location."),
  reward: z
    .number({ error: "Reward must be a number." })
    .min(0, "Reward must be at least 0.")
    .max(10000, "Reward cannot exceed 10000."),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
