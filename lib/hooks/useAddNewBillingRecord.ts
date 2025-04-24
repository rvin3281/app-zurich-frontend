import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utility/helper/axiosInstance";

const submitNewBillingRecord = async (data: any) => {
  console.log(data);
  const response = await axiosInstance.post("/v1/billing", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  if (response.status !== 201) {
    throw new Error("Failed to submit form");
  }

  return response.data;
};

export const useAddNewBillingRecords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitNewBillingRecord,
    onSuccess: (data) => {
      console.log("Form Submitted", data);
      queryClient.invalidateQueries({ queryKey: ["billingrecords"] });
    },
    onError: (error) => {
      console.log("unable to submit", error);
    },
  });
};
