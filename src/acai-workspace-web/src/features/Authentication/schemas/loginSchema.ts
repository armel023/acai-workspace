import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid work email address"),
  password: z.string().min(10, "Password must contain at least 10 characters"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
