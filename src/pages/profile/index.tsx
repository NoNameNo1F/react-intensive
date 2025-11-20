const ProfilePage = () => {
  return (
    <div
      className="
        flex flex-col justify-start gap-2
        border border-gray-400 dark:border-gray-700 rounded-lg shadow-md 
        bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-gray-200
      mr-4 p-4"
    >
      <h1 className="w-full m-2 font-bold text-2xl">Profile</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-gray-900 border-none rounded-lg">
            <tr>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    NAME
                  </p>
                </div>
              </th>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    STATUS
                  </p>
                </div>
              </th>
              <th className="px-5 py-3 sm:px-6">
                <div className="flex items-center">
                  <p className="font-bold text-gray-800 text-theme-xs dark:text-gray-400">
                    DATE
                  </p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr className="px-5 py-4 sm:px-6">
              <td className="px-5 py-4 sm:px-6">
                <div className="flex items-center">
                  <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                    The Sliding Mr. Bones (Next Stop, Pottersville)
                  </p>
                </div>
              </td>
              <td className="px-5 py-4 sm:px-6">
                <div className="flex items-center">
                  <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                    Active
                  </p>
                </div>
              </td>
              <td className="px-5 py-4 sm:px-6">
                <div className="flex items-center">
                  <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                    2025/11/20
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end space-2">
        <a
          href="/"
          className="inline-flex items-center text-body bg-neutral-secondary-medium border-none hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:underline ease-in-out duration-300"
        >
          <svg
            className="w-4 h-4 me-1.5 -ms-0.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          Previous
        </a>

        <a
          href="/"
          className="inline-flex items-center text-body bg-neutral-secondary-medium border-none  hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:underline ease-in-out duration-300"
        >
          Next
          <svg
            className="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;
