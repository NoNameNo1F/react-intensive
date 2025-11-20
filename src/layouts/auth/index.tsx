import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-full max-w-md flex items-center justify-center rounded-lg">
        <img
          className="bg-none"
          src="/assets/logo-kyc.png"
          alt="Logo"
          height={48}
          width={48}
        />
        <div className="font-semibold text-2xl">
          &nbsp; Simple KYC Authentication{" "}
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
