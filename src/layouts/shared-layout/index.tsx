import { Outlet } from "react-router";
import { Footer } from "../../components/footer";
import Header from "../../components/header";
import { Sidebar } from "../../components/sidebar";

const SharedLayout = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen grid grid-cols-[220px_1fr] gap-4">
        <Sidebar />
        <div className="grid grid-rows-[1fr_auto] mt-4">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
