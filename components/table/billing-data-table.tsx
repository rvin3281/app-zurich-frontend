"use client";

import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBillingRecords } from "@/lib/hooks/useBillingRecords";
import axios from "axios";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { BillingRecords, columns } from "./billing-column";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data?: TData[];
// }

export function DataTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [processedAllData, setProcessedAllData] = useState<any>([]);

  const page = pagination.pageIndex + 1;
  const size = pagination.pageSize;

  // GET ALL DATA
  const { data, isPending, isError, error, isPlaceholderData } =
    useBillingRecords(page, size);

  const billingData = useMemo(() => data?.data || [], [data]);
  const totalPages = data?.meta?.totalPages || 0;

  const processedData: BillingRecords[] = useMemo(
    () =>
      billingData.map((item: any) => ({
        id: item.id,
        customerName: `${item["customer.firstName"]} ${item["customer.lastName"]}`,
        customerEmail: item["customer.email"],
        location: item["product.location"],
        productCode: item["product.productCode"],
        premiumPaid: item.premiumPaid,
      })),
    [billingData]
  );

  const tableData = viewAll ? processedAllData : processedData;
  const table = useReactTable<BillingRecords>({
    data: tableData,
    columns,
    pageCount: totalPages,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchAllBilling = async () => {
    const size = 5;
    const totalPage = totalPages;
    const combinedUrl = [];

    for (let i = 1; i <= totalPage; i++) {
      const url = `http://localhost:4000/v1/billing?page=${i}&size=${size}`;
      combinedUrl.push(url);
    }

    const response = await Promise.all(
      combinedUrl.map((url) => axios.get(url))
    );

    const allBillingRecord = response.flatMap((response) => response.data.data);

    const allProcessedData = allBillingRecord.map((item) => ({
      id: item.id,
      customerName: `${item["customer.firstName"]} ${item["customer.lastName"]}`,
      customerEmail: item["customer.email"],
      location: item["product.location"],
      productCode: item["product.productCode"],
      premiumPaid: item.premiumPaid,
    }));

    console.log(allProcessedData);
    setProcessedAllData(allProcessedData);

    setViewAll(true);
  };

  const resetViewAll = () => {
    setProcessedAllData([]);
    setViewAll(false);
  };

  return (
    <div>
      {!viewAll ? (
        <Button onClick={() => fetchAllBilling()} className="mt-5">
          View All Records
        </Button>
      ) : (
        <Button onClick={() => resetViewAll()} className="mt-5">
          Reset
        </Button>
      )}

      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            {!isPending && billingData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!viewAll && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isPending}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isPending || isPlaceholderData}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
