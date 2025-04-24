import AddBillingForm from "@/components/billing/add-billing-form";
import BillingTitle from "@/components/billing/billing-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyZurich-view add new billing",
  description: "Technical Assessment Zurich",
};
export default function AddNewBilling() {
  return (
    <div className="container mx-auto py-10 max-w-[1280px] min-h-[200px]">
      <BillingTitle
        title="Add New Billing Record"
        description="Provide customer, product and premium paid details"
      />
      <AddBillingForm />
    </div>
  );
}
