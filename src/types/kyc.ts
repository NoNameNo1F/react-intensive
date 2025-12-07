export type IdentityProfile = {
  type: number;
  expireDate: string;
  file: File;
};

export type Occupation = {
  role: number;
  fromDate: string;
  toDate: string;
};

export type IncomeSource = {
  type: number;
  amount: number;
};

export type AssetSource = {
  type: number;
  amount: number;
};

export type LiabilitySource = {
  type: number;
  amount: number;
};

export type WealthSource = {
  type: number;
  amount: number;
};

export type Email = {
  email: string;
  type: number;
  preferred: boolean;
};

export type Phone = {
  phone: string;
  type: number;
  preferred: boolean;
};

export enum AddressType {
  Mailing,
  Work,
}

export enum ContactType {
  Personal,
  Work,
}
export enum ContactPreferred {
  Yes = 1,
  No = 0,
}

export enum IdentificationType {
  Passport = 1,
  NationalIdCard = 2,
  DriverLicense = 3,
}

export enum OccupationRole {
  Unemployed = 1,
  Engineer = 2,
  Marketing = 3,
}

export enum IncomeType {
  Salary = 1,
  Investment = 2,
  Others = 3,
}

export enum AssetType {
  RealEstate = 1,
  Liquidity = 2,
  Bond = 3,
  Others = 4,
}

export enum LiabilityType {
  PersonalLoan = 1,
  RealEstateLoan = 2,
  Others = 3,
}

export enum WealthType {
    Inheritance = 1,
    Donation = 2,
};

export enum ExpInFinancialMarket {
    LessThanFive,
    FromFiveToTen,
    AboveTen
}

export enum RiskTolerance {
    TenPercent,
    ThirtyPercent,
    FiftyPercent,
    AllIn
}