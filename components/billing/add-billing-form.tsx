"use client";
import { useAddNewBillingRecords } from "@/lib/hooks/useAddNewBillingRecord";
import {
  BillingFormSchema,
  billingFormSchema,
} from "@/lib/schema/billingFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Fetch customers from API
const fetchCustomers = async () => {
  const response = await axios.get(
    "http://localhost:4000/v1/billing/get-customers"
  );
  return response.data.data;
};

// Fetch products from API
const fetchProducts = async () => {
  const response = await axios.get(
    "http://localhost:4000/v1/billing/get-products"
  );
  return response.data.data;
};
export default function AddBillingForm() {
  const form = useForm<BillingFormSchema>({
    resolver: zodResolver(billingFormSchema),
    mode: "onChange",
    defaultValues: {
      customer: 0,
      product: 0,
      premiumPaid: "",
    },
  });

  const router = useRouter();
  const { mutate, isPending } = useAddNewBillingRecords();

  const { data: customers, isLoading: loadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const onSubmit = (values: BillingFormSchema) => {
    const formData = {
      customerId: Number(values.customer),
      productId: Number(values.product),
      premiumPaid: Number(values.premiumPaid),
    };
    mutate(formData, {
      onSuccess: () => {
        router.push("/billing"); // Navigate to billing view
      },
      onError: () => {
        console.error("Unable to submit form");
      },
    });
  };

  return (
    <Card className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            {/* Customer Select */}
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingCustomers ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          customers?.map((customer: any) => (
                            <SelectItem
                              key={customer.id}
                              value={String(customer.id)}
                            >
                              {customer.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Select */}
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingProducts ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          products?.map((product: any) => (
                            <SelectItem
                              key={product.id}
                              value={String(product.id)}
                            >
                              {product.product}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="premiumPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium Paid</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter customer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              type="submit"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
