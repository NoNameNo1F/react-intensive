import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { type Address } from "../../../apis/user";
import Button from "../../../components/button";
import FileInput from "../../../components/file-input";
import Input from "../../../components/input";
import { useCreateKYCMutation } from "../../../hooks/use-submission";
import { useGetUserQuery } from "../../../hooks/use-user";
import {
  AddressType,
  AssetType,
  ContactType,
  ExpInFinancialMarket,
  IdentificationType,
  IncomeType,
  LiabilityType,
  OccupationRole,
  RiskTolerance,
  WealthType,
  type AssetSource,
  type Email,
  type IdentityProfile,
  type IncomeSource,
  type LiabilitySource,
  type Occupation,
  type Phone,
  type WealthSource,
} from "../../../types/kyc";
import { formatDateForInput } from "../../../utils/datetime-helper";

type CreateKYCForm = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  age: number;
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

const CreateKYCSubmissionPage = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<CreateKYCForm>();

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
  });

  const {
    fields: identificationDocumentFields,
    append: appendIdentificationDocument,
    remove: removeIdentificationDocument,
  } = useFieldArray({
    control,
    name: "identityProfiles",
  });

  const {
    fields: occupationFields,
    append: appendOccupation,
    remove: removeOccupation,
  } = useFieldArray({
    control,
    name: "occupations",
  });

  const {
    fields: incomeSourcesFields,
    append: appendIncomeSource,
    remove: removeIncomeSource,
  } = useFieldArray({
    control,
    name: "incomeSources",
  });

  const {
    fields: assetSourcesFields,
    append: appendAssetSource,
    remove: removeAssetSource,
  } = useFieldArray({
    control,
    name: "assetSources",
  });

  const {
    fields: liabilitySourcesFields,
    append: appendLiabilitySource,
    remove: removeLiabilitySource,
  } = useFieldArray({
    control,
    name: "liabilitySources",
  });

  const {
    fields: wealthSourcesFields,
    append: appendWealthSource,
    remove: removeWealthSource,
  } = useFieldArray({
    control,
    name: "wealthSources",
  });

  useEffect(() => {
    if (userData) {
      reset({
        id: userData?.id,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        middleName: userData?.middleName,
        birthDate: formatDateForInput(userData?.birthDate),
        age: userData?.birthDate
          ? Math.floor(
              (Date.now() -
                new Date(formatDateForInput(userData.birthDate)).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            )
          : 0,
        addresses: userData?.address
          ? [{ ...userData.address, type: AddressType.Work }]
          : [],
        emails: userData?.email
          ? [
              {
                email: userData.email,
                type: ContactType.Work,
                preferred: true,
              },
            ]
          : [],
        phones: userData?.phone
          ? [
              {
                phone: userData.phone,
                type: ContactType.Work,
                preferred: true,
              },
            ]
          : [],
        identityProfiles: [
          {
            type: IdentificationType.NationalIdCard,
            expireDate: Date.now().toString(),
            file: new File([], ""),
          },
        ],
        occupations: [],
        incomeSources: [],
        assetSources: [],
        liabilitySources: [],
        wealthSources: [],
        expInFinancialMarkets: ExpInFinancialMarket.LessThanFive,
        riskTolerance: RiskTolerance.TenPercent,
      });
    }
  }, [userData, reset]);

  const { mutateAsync: createKYC, isPending, error } = useCreateKYCMutation();

  const onSubmit = async (data: CreateKYCForm) => {
    try {
      await createKYC({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        addresses: data.addresses,
        emails: data.emails,
        phones: data.phones,
        identityProfiles: data.identityProfiles,
        occupations: data.occupations,
        incomeSources: data.incomeSources,
        assetSources: data.assetSources,
        liabilitySources: data.liabilitySources,
        wealthSources: data.wealthSources,
        expInFinancialMarkets: data.expInFinancialMarkets,
        riskTolerance: data.riskTolerance,
      });
      navigate("/profile");
    } catch (err) {
      console.error("submit KYC failed: ", err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  const _incomeValues = watch("incomeSources") || [];
  const totalIncome = (_incomeValues || []).reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const _assetValues = watch("assetSources") || [];
  const totalAssets = (_assetValues || []).reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const _liabilityValues = watch("liabilitySources") || [];
  const totalLiabilities = (_liabilityValues || []).reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const _wealthValues = watch("wealthSources") || [];
  const totalWealths = (_wealthValues || []).reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const totalNet = totalIncome + totalAssets + totalWealths + totalLiabilities;

  return (
    <div
      className="
        flex flex-col justify-start gap-4
        text-gray-950 dark:text-gray-200"
    >
      <form
        className="flex flex-col
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        mr-4 p-4 gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="flex justify-center p-3 font-bold text-2xl text-blue-900 dark:text-blue-200">
          Financial Status
        </h1>
        <div
          className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4"
        >
          <h2 className="py-2 font-semibold text-xl text-blue-900 dark:text-blue-200">
            Basic Information
          </h2>
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="md:col-span-1 my-2">
                <Input
                  label="First Name *"
                  placeholder="Enter your first name"
                  error={errors.firstName?.message}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
              </div>
              <div className="md:col-span-1 my-2">
                <Input
                  label="Last Name *"
                  error={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="md:col-span-1 my-2">
                <Input
                  label="Middle Name"
                  error={errors.middleName?.message}
                  {...register("middleName")}
                  placeholder={"Enter your middle name"}
                />
              </div>
              <div className="md:col-span-1 my-2">
                <Input
                  label="Date of Birth *"
                  type="date"
                  error={errors.birthDate?.message}
                  {...register("birthDate", {
                    required: "Date of birth is required",
                  })}
                  placeholder={"Enter your date of birth"}
                />
              </div>
              <div className="md:col-span-1 my-2">
                <Input
                  label="Age"
                  type="number"
                  {...register("age")}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4"
        >
          <h2 className="py-2 font-semibold text-xl text-blue-900 dark:text-blue-200">
            Contact Information
          </h2>
          {/* Address Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Addresses
            </h3>
            {addressFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Address #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Country *"
                      placeholder="Enter your country"
                      error={errors.addresses?.[index]?.country?.message}
                      {...register(`addresses.${index}.country`, {
                        required: "Country is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="City *"
                      placeholder="Enter your city"
                      error={errors.addresses?.[index]?.city?.message}
                      {...register(`addresses.${index}.city`, {
                        required: "City is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Street *"
                      placeholder="Enter your street"
                      error={errors.addresses?.[index]?.address?.message}
                      {...register(`addresses.${index}.address`, {
                        required: "Street is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Postal Code"
                      placeholder="Enter your postal code"
                      error={errors.addresses?.[index]?.postalCode?.message}
                      {...register(`addresses.${index}.postalCode`)}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Type *
                    </label>
                    <select
                      {...register(`addresses.${index}.type`, {
                        required: "Address type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={AddressType.Mailing}>Mailing</option>
                      <option value={AddressType.Work}>Work</option>
                    </select>
                    {errors.addresses?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.addresses?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendAddress({
                    country: "",
                    city: "",
                    address: "",
                    postalCode: "",
                    type: AddressType.Work,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Address</span>
              </Button>
            </div>
          </div>
          {/* Email Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Emails
            </h3>
            {emailFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Email #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Email Address *"
                      placeholder="Enter your email"
                      error={errors.emails?.[index]?.email?.message}
                      {...register(`emails.${index}.email`, {
                        required: "Email is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Type *
                    </label>
                    <select
                      {...register(`emails.${index}.type`, {
                        required: "Email type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={ContactType.Personal}>Personal</option>
                      <option value={ContactType.Work}>Work</option>
                    </select>
                    {errors.emails?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.emails?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Preferred *
                    </label>
                    <select
                      {...register(`emails.${index}.preferred`)}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    {errors.emails?.[index]?.preferred?.message && (
                      <small className="text-red-600 my-2">
                        {errors.emails?.[index]?.preferred?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendEmail({
                    email: "",
                    type: ContactType.Work,
                    preferred: true,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Email</span>
              </Button>
            </div>
          </div>
          {/* Phone Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Phones
            </h3>
            {phoneFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Phone #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePhone(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Phone Number *"
                      type="tel"
                      placeholder="Enter your phone number"
                      error={errors.phones?.[index]?.phone?.message}
                      {...register(`phones.${index}.phone`, {
                        required: "Phone number is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Type *
                    </label>
                    <select
                      {...register(`phones.${index}.type`, {
                        required: "Phone type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={ContactType.Personal}>Personal</option>
                      <option value={ContactType.Work}>Work</option>
                    </select>
                    {errors.phones?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.phones?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Preferred *
                    </label>
                    <select
                      {...register(`phones.${index}.preferred`)}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    {errors.phones?.[index]?.preferred?.message && (
                      <small className="text-red-600 my-2">
                        {errors.phones?.[index]?.preferred?.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendPhone({
                    phone: "",
                    type: ContactType.Work,
                    preferred: true,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Phone</span>
              </Button>
            </div>
          </div>
          {/* Identification Documents Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Identification Documents
            </h3>
            {identificationDocumentFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Documents #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeIdentificationDocument(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Type *
                    </label>
                    <select
                      {...register(`identityProfiles.${index}.type`, {
                        required: "Identification type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={IdentificationType.Passport}>
                        Passport
                      </option>
                      <option value={IdentificationType.NationalIdCard}>
                        National Id Card
                      </option>
                      <option value={IdentificationType.DriverLicense}>
                        Driver License
                      </option>
                    </select>
                    {errors.identityProfiles?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.identityProfiles?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="lg:col-span-1 my-2">
                    <Input
                      label="Expire Date"
                      type="date"
                      error={
                        errors.identityProfiles?.[index]?.expireDate?.message
                      }
                      {...register(`identityProfiles.${index}.expireDate`, {
                        required: "Expire date is required",
                      })}
                    />
                  </div>
                  <div className="md:col-span-1 my-2">
                    <FileInput
                      label="Upload Document"
                      accept="image/png, application/pdf"
                      error={errors.identityProfiles?.[index]?.file?.message}
                      {...register(`identityProfiles.${index}.file`, {
                        required: "Upload document is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendIdentificationDocument({
                    type: ContactType.Work,
                    expireDate: "",
                    file: new File([], ""),
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Document</span>
              </Button>
            </div>
          </div>
          {/* Occupation Documents Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Occupations
            </h3>
            {occupationFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Documents #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeOccupation(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">
                      Occupation *
                    </label>
                    <select
                      {...register(`occupations.${index}.role`, {
                        required: "Occupation role is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={OccupationRole.Unemployed}>
                        Unemployed
                      </option>
                      <option value={OccupationRole.Engineer}>Engineer</option>
                      <option value={OccupationRole.Marketing}>
                        Marketing
                      </option>
                    </select>
                    {errors.occupations?.[index]?.role?.message && (
                      <small className="text-red-600 my-2">
                        {errors.occupations?.[index]?.role?.message}
                      </small>
                    )}
                  </div>
                  <div className="lg:col-span-1 my-2">
                    <Input
                      label="From Date"
                      type="date"
                      error={errors.occupations?.[index]?.fromDate?.message}
                      {...register(`occupations.${index}.fromDate`, {
                        required: "From date is required",
                      })}
                    />
                  </div>
                  <div className="lg:col-span-1 my-2">
                    <Input
                      label="To Date"
                      type="date"
                      error={errors.occupations?.[index]?.toDate?.message}
                      {...register(`occupations.${index}.toDate`, {
                        required: "To date is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendOccupation({
                    role: OccupationRole.Unemployed,
                    fromDate: "",
                    toDate: "",
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Occupation</span>
              </Button>
            </div>
          </div>
          {/* Income Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Incomes (A)
            </h3>
            {incomeSourcesFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Income #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeIncomeSource(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">Type</label>
                    <select
                      {...register(`incomeSources.${index}.type`, {
                        required: "Income type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={IncomeType.Salary}>Salary</option>
                      <option value={IncomeType.Investment}>Investment</option>
                      <option value={IncomeType.Others}>Others</option>
                    </select>
                    {errors.incomeSources?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.incomeSources?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Amount (Currency)"
                      type="number"
                      placeholder="Enter Amount"
                      error={errors.incomeSources?.[index]?.amount?.message}
                      {...register(`incomeSources.${index}.amount`, {
                        required: "Amount is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendIncomeSource({
                    type: IncomeType.Salary,
                    amount: 0,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Income</span>
              </Button>
            </div>
          </div>
          {/* Asset Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Assets (B)
            </h3>
            {assetSourcesFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Asset #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAssetSource(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">Type</label>
                    <select
                      {...register(`assetSources.${index}.type`, {
                        required: "Asset type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={AssetType.Bond}>Bond</option>
                      <option value={AssetType.Liquidity}>Liquidity</option>
                      <option value={AssetType.RealEstate}>RealEstate</option>
                      <option value={AssetType.Others}>Others</option>
                    </select>
                    {errors.assetSources?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.assetSources?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Amount (Currency)"
                      type="number"
                      placeholder="Enter Amount"
                      error={errors.assetSources?.[index]?.amount?.message}
                      {...register(`assetSources.${index}.amount`, {
                        required: "Amount is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendAssetSource({
                    type: AssetType.Bond,
                    amount: 0,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Asset</span>
              </Button>
            </div>
          </div>
          {/* Liability Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Liabilities (C)
            </h3>
            {liabilitySourcesFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Income #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLiabilitySource(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">Type</label>
                    <select
                      {...register(`liabilitySources.${index}.type`, {
                        required: "Liability type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={LiabilityType.PersonalLoan}>
                        PersonalLoan
                      </option>
                      <option value={LiabilityType.RealEstateLoan}>
                        RealEstateLoan
                      </option>
                      <option value={LiabilityType.Others}>Others</option>
                    </select>
                    {errors.liabilitySources?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.liabilitySources?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Amount (Currency)"
                      type="number"
                      placeholder="Enter Amount"
                      error={errors.liabilitySources?.[index]?.amount?.message}
                      {...register(`liabilitySources.${index}.amount`, {
                        required: "Amount is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Input
              label="Total Liabilities"
              type="number"
              placeholder=""
              value={totalLiabilities}
              disabled={true}
            />

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendLiabilitySource({
                    type: LiabilityType.PersonalLoan,
                    amount: 0,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces"> Add Liability</span>
              </Button>
            </div>
          </div>
          {/* Wealth Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2 mb-8">
              Source of Wealth (D)
            </h3>
            {wealthSourcesFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg border-gray-600  focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mx-2 my-8"
              >
                <div className="absolute border rounded-lg border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 translate-y-[-70%] bg-gray-50 dark:bg-gray-800 inline-flex font-semibold shadow-md">
                  <span className="whitespace-break-spaces inline-block">
                    Income #{index + 1}{" "}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeWealthSource(index)}
                      className="duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-red-500 hover:text-red-700 hover:bg-red-200 rounded-lg duration-300 ease-in-out"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>{" "}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-4">
                  <div className="lg:col-span-1 my-2">
                    <label className="block text-md font-semibold">Type</label>
                    <select
                      {...register(`wealthSources.${index}.type`, {
                        required: "Wealth type is required",
                      })}
                      className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                    >
                      <option value={WealthType.Inheritance}>
                        Inheritance
                      </option>
                      <option value={WealthType.Donation}>Donation</option>
                    </select>
                    {errors.wealthSources?.[index]?.type?.message && (
                      <small className="text-red-600 my-2">
                        {errors.wealthSources?.[index]?.type?.message}
                      </small>
                    )}
                  </div>
                  <div className="md:col-span-1 my-2">
                    <Input
                      label="Amount (Currency)"
                      type="number"
                      placeholder="Enter Amount"
                      error={errors.wealthSources?.[index]?.amount?.message}
                      {...register(`wealthSources.${index}.amount`, {
                        required: "Amount is required",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Input
              label="Total Source of Wealth"
              type="number"
              placeholder=""
              value={totalWealths}
              disabled={true}
            />

            <div className="flex flex-row gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  appendWealthSource({
                    type: WealthType.Inheritance,
                    amount: 0,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <span className="whitespace-break-spaces">
                  {" "}
                  Add Weath of Source
                </span>
              </Button>
            </div>
          </div>
          {/* Total Net Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200 py-2">
              Net Worth
            </h3>
            <Input
              label="Total"
              type="number"
              placeholder=""
              value={totalNet}
              disabled={true}
            />
          </div>

          {/* Investment Experience and Objectives Section */}
          <div
            className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        p-4 mt-4"
          >
            <h3 className="font-medium text-xl text-blue-900 dark:text-blue-200">
              Investment Experience and Objectives
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-4">
              <div className="lg:col-span-1 my-2">
                <label className="block text-md font-semibold">
                  Experience in Financial Markets
                </label>
                <select
                  {...register(`expInFinancialMarkets`)}
                  className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                >
                  <option value={ExpInFinancialMarket.LessThanFive}>
                    {"< 5 years"}
                  </option>
                  <option value={ExpInFinancialMarket.FromFiveToTen}>
                    {"5 - 10 years"}
                  </option>
                  <option value={ExpInFinancialMarket.AboveTen}>
                    {"> 10 years"}
                  </option>
                </select>
              </div>
              <div className="lg:col-span-1 my-2">
                <label className="block text-md font-semibold">
                  Risk Tolerance
                </label>
                <select
                  {...register(`riskTolerance`)}
                  className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
                >
                  <option value={RiskTolerance.TenPercent}>10%</option>
                  <option value={RiskTolerance.ThirtyPercent}>30%</option>
                  <option value={RiskTolerance.FiftyPercent}>50%</option>
                  <option value={RiskTolerance.AllIn}>100%</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full relative right-0 mt-4">
            <Button isLoading={isPending}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              <span className="whitespace-break-spaces"> &nbsp; Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateKYCSubmissionPage;
