import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function BillingTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: "26px" }}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
