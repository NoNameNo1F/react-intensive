import { useMutation } from "@tanstack/react-query";
import { signup, type SignupParams } from "../apis/auth";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (params: SignupParams) => await signup(params),
  });
};
