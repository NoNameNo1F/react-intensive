import Breadcrumb from "../../components/breadcrumb";
import UserCard from "../../features/user-profile/components/user-card";
import UserDetail from "../../features/user-profile/components/user-detail";
import { useGetUserQuery } from "../../hooks/use-user";

const ProfilePage = () => {
  const { data: userData } = useGetUserQuery();

  return (
    <div
      className="
        flex flex-col justify-start gap-4
        text-gray-950 dark:text-gray-200"
    >
      <Breadcrumb paths={["User"]} page="Personal Information" />
      <h1 className="font-bold text-2xl">Personal Information</h1>

      <div
        className="
        border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        mr-4 p-4"
      >
        <UserCard url={userData?.image} />
      </div>
      <div
        className="
        border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
      mr-4 p-4"
      >
        <UserDetail userData={userData} />
      </div>
    </div>
  );
};

export default ProfilePage;
