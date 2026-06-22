import { z } from "zod";

export const userAssignmentFormSchema = z.object({
  userId: z.string().trim().uuid("Select a valid user"),
  roleId: z.string().trim().uuid("Select a valid role"),
  businessEntityId: z.string().trim().optional().or(z.literal("")),
  subEntityId: z.string().trim().optional().or(z.literal("")),
  isActive: z.boolean(),
});

export type UserAssignmentFormValues = z.infer<typeof userAssignmentFormSchema>;
