import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBillingRecordsById = async (id: number) => {
  const res = await axios.get(`http://localhost:4000/v1/billing/${id}`);

  return res.data;
};

export function useViewBillingRecordById(id: number) {
  return useQuery({
    queryKey: ["fetchbillingrecord", id],
    queryFn: () => fetchBillingRecordsById(id),

    staleTime: 1000 * 60 - 5,
  });
}
