import BillingTitle from "@/components/billing/billing-title";
import ViewBillingById from "@/components/billing/view-billing-id";

export default function ViewBilling({ params }: { params: { id: number } }) {
  console.log(params);
  return (
    <div className="container mx-auto py-10 max-w-[1280px] min-h-[200px]">
      <BillingTitle
        title={`View Billing Record ID ${params.id}`}
        description="View in details"
      />
      <ViewBillingById id={params.id} />
    </div>
  );
}
