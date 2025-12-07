import { useMutation, useQuery } from "@tanstack/react-query";
import { editUser, getUserDetailById, type UserParams } from "../apis/user";
import { getUserSessionFromToken } from "../utils/token-utils";

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["userId"],
    queryFn: async () => {
      const userData = getUserSessionFromToken();
      if (userData?.id) {
        const response = await getUserDetailById(userData.id);

        return response.data;
      }
    },
  });
};

export const useEditUserMutation = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      params,
    }: {
      userId: number;
      params: UserParams;
    }) => {
      const response = await editUser(userId, params);
      console.log(response.data);
      return response;
    },
  });
};
