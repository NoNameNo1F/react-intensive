import Breadcrumb from "../../components/breadcrumb";
import UserCard from "../../features/user-profile/components/user-card";
import { getUserSessionFromToken } from "../../utils/token-utils";

const DashboardPage = () => {
  const user = getUserSessionFromToken();
  return (
    <div
      className="
        flex flex-col justify-start gap-4
        text-gray-950 dark:text-gray-200"
    >
      <Breadcrumb page="Dashboard" />
      <h1 className="font-bold text-2xl">
        Dashboard, Welcome {user?.firstName}
      </h1>

      <div
        className="
        max-w-full border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
        mr-4 p-4"
      >
        <UserCard url={"https://i.pravatar.cc"} />
      </div>
    </div>
  );
};

export default DashboardPage;
