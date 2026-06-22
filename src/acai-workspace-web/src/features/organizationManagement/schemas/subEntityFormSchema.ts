import { z } from "zod";

export const subEntityFormSchema = z.object({
  businessEntityId: z.string().trim().min(1, "Business Entity is required"),
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(200, "Name must not exceed 200 characters"),
  code: z
    .string()
    .trim()
    .min(2, "Code must contain at least 2 characters")
    .max(50, "Code must not exceed 50 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type SubEntityFormValues = z.infer<typeof subEntityFormSchema>;
