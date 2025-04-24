import BillingTitle from "@/components/billing/billing-title";
import { DataTable } from "@/components/table/billing-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyZurich-view billing",
  description: "Technical Assessment Zurich",
};
export default function UserListPage() {
  return (
    <div className="container mx-auto py-10 max-w-[1280px] min-h-[200px]">
      <BillingTitle
        title="View Billing Records"
        description="Customers Billing Records"
      />
      <DataTable />
    </div>
  );
}
