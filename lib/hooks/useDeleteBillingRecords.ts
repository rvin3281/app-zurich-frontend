import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utility/helper/axiosInstance";

const deleteBillingRecordById = async (id: number) => {
  const res = await axiosInstance.delete(
    `http://localhost:4000/v1/billing/${id}`
  );

  return res.data;
};

export function useDeleteBillingRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBillingRecordById(id),
    onSuccess: (data) => {
      if (data.status === "success") {
        console.log("Delete success:", data.message);
        queryClient.invalidateQueries({
          queryKey: ["billingrecords"],
        });
      }
    },
    onError: (error) => {
      console.error("Failed to delete billing record:", error);
    },
  });
}
