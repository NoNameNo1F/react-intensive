import { useLocation } from "react-router";
import SidebarItem from "./sidebar-item";

const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const SubmissionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 14.25h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75"
    />
  </svg>
);

const sidebarItems = [
  {
    label: "My Profile",
    href: "/profile",
    icon: ProfileIcon,
  },
  {
    label: "My Submissions",
    href: "/dashboard/my-submissions",
    icon: SubmissionIcon,
  },
  {
    label: "Submissions Reviews",
    href: "/dashboard/submissions",
    icon: SubmissionIcon,
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname.startsWith(path);
  return (
    <div
      className="
            hidden md:block bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-300
            border-r border-gray-400 dark:border-gray-700 shadow-lg"
    >
      <div className="w-full flex flex-col overflow-y-auto no-scrollbar not-first:gap-2 items-start m-2">
        <ul className="flex flex-col gap-4 mb-6">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(item.href)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
