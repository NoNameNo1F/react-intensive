import { Outlet } from "react-router";
import { Footer } from "../../components/footer";
import Header from "../../components/header";
import { Sidebar } from "../../components/sidebar";

const SharedLayout = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] pl-4 md:p-0 gap-4">
        <Sidebar />
        <div className="mt-4 w-full min-w-0">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
