import HttpInstance from "../http";
import type {
  AddressType,
  AssetSource,
  Email,
  IdentityProfile,
  IncomeSource,
  LiabilitySource,
  Occupation,
  Phone,
  WealthSource,
} from "../types/kyc";

export type Company = {
  department: string;
  name: string;
  title: string;
};
export type Address = {
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  country: string;
  type?: AddressType;
};

export type UserParams = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  birthDate: string;
  image?: string;
  company: Company;
  address: Address;
  role?: string;
};

export type KYCParams = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  addresses: Address[];
  emails: Email[];
  phones: Phone[];
  identityProfiles: IdentityProfile[];
  occupations: Occupation[];
  incomeSources: IncomeSource[];
  assetSources: AssetSource[];
  liabilitySources: LiabilitySource[];
  wealthSources: WealthSource[];
  expInFinancialMarkets: number;
  riskTolerance: number;
};

export const editUser = async (userId: number, params: UserParams) => {
  return await HttpInstance.patch<UserParams>(`/users/${userId}`, params);
};

export const getUserDetailById = async (userId: number) => {
  return await HttpInstance.get<UserParams>(`/users/${userId}`);
};

export const createKYC = async (params: KYCParams) => {
  return await HttpInstance.post(`/http/201/Created`);
};
