import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveSubmission,
  getKYCSubmissions,
  rejectSubmission,
} from "../apis/kyc-submissions";
import { createKYC, type KYCParams } from "../apis/user";

export const useGetSubmissions = () => {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const response = await getKYCSubmissions();
      return response.data;
    },
  });
};

export const useCreateKYCMutation = () => {
  return useMutation({
    mutationFn: async (params: KYCParams) => {
      await createKYC(params);
    },
  });
};

export const useApproveSubmissionMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await approveSubmission();
    },
  });
};

export const useRejectSubmissionMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await rejectSubmission();
    },
  });
};
