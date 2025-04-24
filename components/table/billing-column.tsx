"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdown } from "../billing/add-action-btn";

export interface BillingRecords {
  id: string;
  customerName: string;
  customerEmail: string;
  location: string;
  productCode: string;
  premiumPaid: string;
  edit: string;
}

export const columns: ColumnDef<BillingRecords>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
  },
  {
    accessorKey: "premiumPaid",
    header: "Premium Paid",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsDropdown billingRecord={row.original} />,
  },
];
