import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { type UserParams } from "../../../../apis/user";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import { useEditUserMutation } from "../../../../hooks/use-user";
import { formatDateForInput } from "../../../../utils/datetime-helper";

type EditUserDetailForm = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  organization: string;
  department: string;
  postalCode: string;
  role: string;
};

const UserDetail = ({ userData }: { userData?: UserParams }) => {
  const [editable, setEditable] = useState(false);

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleCancel = () => {
    reset();
    setEditable(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<EditUserDetailForm>({
    defaultValues: {
      id: userData?.id,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      country: userData?.address?.country,
      postalCode: userData?.address?.postalCode,
      city: userData?.address?.city,
      address: userData?.address?.address,
      email: userData?.email,
      phone: userData?.phone,
      birthDate: userData?.birthDate,
      organization: userData?.company?.name,
      department: userData?.company?.department,
      role: userData?.company?.title,
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        id: userData?.id,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        country: userData?.address?.country,
        postalCode: userData?.address?.postalCode,
        city: userData?.address?.city,
        address: userData?.address?.address,
        email: userData?.email,
        phone: userData?.phone,
        birthDate: formatDateForInput(userData?.birthDate),
        organization: userData?.company?.name,
        department: userData?.company?.department,
        role: userData?.company?.title,
      });
    }
  }, [userData, reset]);

  const { mutate: editUser, isPending, error } = useEditUserMutation();

  const onSubmit = async (data: EditUserDetailForm) => {
    try {
      editUser({
        userId: data.id,
        params: {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: formatDateForInput(data.birthDate),
          address: {
            address: data.address,
            country: data.country,
            city: data.city,
            postalCode: data.postalCode,
          },
          company: {
            name: data.organization,
            department: data.department,
            title: data.role,
          },
        },
      });
    } catch (err) {
      console.error("Edit user failed:", err);
    }
  };

  watch(() => {
    if (error?.message) reset();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="text-2xl font-semibold dark:text-gray-50">
        General Information
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="md:col-span-1 my-2">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register("firstName", {
              required: "First name is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Last Name"
            required
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register("lastName", {
              required: "Last name is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="City"
            placeholder="Enter your city"
            error={errors.city?.message}
            {...register("city", {
              required: "City is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Country"
            placeholder="Enter your country"
            error={errors.country?.message}
            {...register("country", {
              required: "Country is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Address"
            placeholder="Enter your address"
            error={errors.address?.message}
            {...register("address", {
              required: "Address is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Phone number"
            type="tel"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Phone is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Birthday"
            type="date"
            placeholder="Enter your birthDate"
            error={errors.birthDate?.message}
            {...register("birthDate", {
              required: "BirthDate is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Organization"
            type="text"
            error={errors.organization?.message}
            {...register("organization", {
              required: "Organization is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Role"
            type="text"
            {...register("role", {
              required: "Organization is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Department"
            type="text"
            error={errors.department?.message}
            {...register("department", {
              required: "Department is required",
            })}
            disabled={!editable}
          />
        </div>
        <div className="md:col-span-1 my-2">
          <Input
            label="Zip/postal code"
            type="number"
            {...register("postalCode")}
            disabled={!editable}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 mt-2">
        {editable ? (
          <>
            <Button onClick={handleCancel}>
              <span className="whitespace-break-spaces">Cancel</span>
            </Button>
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

              <span className="whitespace-break-spaces"> &nbsp; Save</span>
            </Button>
          </>
        ) : (
          <Button onClick={handleEditClick}>
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

            <span className="whitespace-break-spaces">&nbsp; Edit</span>
          </Button>
        )}
        <Button disabled={isPending}>
          <span className="whitespace-break-spaces">
            <Link to="/profile/kyc">KYC</Link>
          </span>
        </Button>
        <div className="rounded-lg bg-gray-300  hover:bg-gray-500 font-semibold"></div>
      </div>
    </form>
  );
};

export default UserDetail;
