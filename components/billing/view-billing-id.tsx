"use client";

import { useViewBillingRecordById } from "@/lib/hooks/useViewBillingRecordById";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

export default function ViewBillingById({ id }: { id: number }) {
  const { data, isLoading, isError } = useViewBillingRecordById(id);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">Failed to load billing record.</div>
    );
  }

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>Billing Record Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Name */}
        <div className="space-y-1">
          <Label>Customer Name</Label>
          <Input
            value={`${data.data.customer?.firstName} ${data.data.customer?.lastName}`}
            disabled
          />
        </div>

        {/* Customer Email */}
        <div className="space-y-1">
          <Label>Customer Email</Label>
          <Input value={data.data.customer?.email} disabled />
        </div>

        {/* Product Code */}
        <div className="space-y-1">
          <Label>Product Code</Label>
          <Input value={data.data.product?.productCode} disabled />
        </div>

        {/* Product Location */}
        <div className="space-y-1">
          <Label>Product Location</Label>
          <Input value={data.data.product?.location} disabled />
        </div>

        {/* Premium Paid */}
        <div className="space-y-1">
          <Label>Premium Paid</Label>
          <Input value={data.data.premiumPaid} disabled />
        </div>
      </CardContent>
    </Card>
  );
}
