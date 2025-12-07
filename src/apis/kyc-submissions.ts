import HttpInstance from "../http";
import type { ResponseModel } from "../types/response-model";
import type { Submission } from "../types/submission";

export const getKYCSubmissions = async () => {
  return await HttpInstance.get<ResponseModel<Submission[]>>(
    "/c/2aa4-40dc-4142-8621"
  );
};

export const approveSubmission = async () => {
  return await HttpInstance.post(`/http/204/NoContent`);
};

export const rejectSubmission = async () => {
  return await HttpInstance.post(`/http/204/NoContent`);
};
