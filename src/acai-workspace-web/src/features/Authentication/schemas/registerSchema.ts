import { z } from "zod";

export const registerSchema = z
  .object({
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
    email: z.string().email("Enter a valid work email address"),
    password: z
      .string()
      .min(10, "Password must contain at least 10 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
