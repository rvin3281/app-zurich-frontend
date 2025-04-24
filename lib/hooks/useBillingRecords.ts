import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBillingRecords = async (page: number, size: number) => {
  const res = await axios.get(
    `http://localhost:4000/v1/billing?page=${page}&size=${size}`
  );

  return res.data;
};

export function useBillingRecords(page: number, size: number) {
  return useQuery({
    queryKey: ["billingrecords", page, size],
    queryFn: () => fetchBillingRecords(page, size),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 - 5,
  });
}
