import { z } from "zod";

// Regular Expression for Decimal(10,2) validation
const decimalRegex = /^\d{1,10}(\.\d{1,2})?$/;

export const billingFormSchema = z.object({
  customer: z
    .number({ invalid_type_error: "Customer ID must be a number" })
    .int("Customer ID must be an integer")
    .positive("Customer ID must be greater than 0")
    .nonnegative()
    .min(1, "Customer ID is required"),

  product: z
    .number({ invalid_type_error: "Product ID must be a number" })
    .int("Product ID must be an integer")
    .positive("Product ID must be greater than 0")
    .nonnegative()
    .min(1, "Product ID is required"),

  premiumPaid: z
    .string({ required_error: "Premium Paid is required" })
    .regex(decimalRegex, {
      message: "Premium Paid must be a valid decimal (e.g., 10.00)",
    }),
});

export type BillingFormSchema = z.infer<typeof billingFormSchema>;
