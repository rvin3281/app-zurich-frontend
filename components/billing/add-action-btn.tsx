"use client";

import { useDeleteBillingRecord } from "@/lib/hooks/useDeleteBillingRecords";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ActionsDropdownProps {
  billingRecord: {
    id: string;
  };
  page?: number;
  size?: number;
}

export function ActionsDropdown({
  billingRecord,
  page,
  size,
}: ActionsDropdownProps) {
  const router = useRouter();
  const { mutate, isPending } = useDeleteBillingRecord();

  const handleView = () => {
    router.push(`/billing/view-billing/${billingRecord.id}`);
  };

  const { data: session } = useSession();

  const handleDelete = () => {
    mutate(Number(billingRecord.id), {
      onSuccess: (data) => {
        console.log("successfully deteled");
      },
      onError: () => {
        console.log("unable to delete");
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
        {session?.user.role === "admin" && (
          <DropdownMenuItem onClick={handleDelete}>
            {isPending ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
