import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 6 characters"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
