import { useMutation } from "@tanstack/react-query";
import { login, signup, type LoginParams, type SignupParams } from "../apis/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (params: LoginParams) => await login(params),
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (params: SignupParams) => await signup(params),
  });
};