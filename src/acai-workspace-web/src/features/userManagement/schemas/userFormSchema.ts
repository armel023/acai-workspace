import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .max(100, "First name must not exceed 100 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters")
    .max(100, "Last name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  username: z
    .string()
    .trim()
    .min(2, "Username must contain at least 2 characters")
    .max(100, "Username must not exceed 100 characters"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
