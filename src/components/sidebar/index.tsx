import { useState } from "react";

export const Sidebar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="
            bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-300
            border-r border-gray-400 dark:border-gray-700 shadow-lg"
    >
      <div className="w-full flex flex-col overflow-y-auto no-scrollbar not-first:gap-2 items-start m-2">
        <ul className="flex flex-col gap-4 mb-6">
          <li>
            <a href="/profile">
              <div
                className={` 
            flex items-center gap-4
            border-none rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700
            ease-in-out duration-300
            px-4 py-2 cursor-pointer ${
              isActive ? "shadow-md bg-gray-300" : "bg-transparent"
            }
            `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 hover:fill-orange-100`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="text-lg font-semibold whitespace-nowrap">
                  My Profile
                </span>
              </div>
            </a>
          </li>
          <li>
            <a href="/submissions">
              <div
                className="
            flex items-center gap-4
            border-none rounded-sm bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700
            ease-in-out duration-300
            px-4 py-2 cursor-pointer
            "
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>

                <span className="text-lg font-semibold whitespace-nowrap">
                  My Submissions
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
