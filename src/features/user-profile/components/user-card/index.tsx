const UserCard = ({ url }: { url?: string }) => {
  return (
    <div className="flex justify-start gap-4 border-none rounded-lg p-2">
      <div className="flex items-center">
        <img
          src={url ?? "https://i.pravatar.cc"}
          className="h-32 rounded-xl border border-gray-400 shrink-0"
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col p-2 gap-2">
        <h2 className="text-xl font-bold dark:text-gray-50">Profile Picture</h2>
        <p className="text-gray-500">JPG, GIF, or PNG. Max size of 800KB</p>
        <div className="flex flex-row gap-2 mt-2">
          <label className="inline-flex bg-blue-800 text-white dark:bg-blue-400 dark:text-gray-950 hover:bg-blue-900 dark:hover:bg-blue-500 rounded-lg p-2 font-semibold cursor-pointer">
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
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            <span className="whitespace-break-spaces"> Upload picture</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
          <button className="inline-flex bg-gray-300 text-gray-500 hover:bg-gray-400 rounded-lg p-2 font-semibold">
            <span className="whitespace-break-spaces">Delete</span>
          </button>
          <div className="rounded-lg bg-gray-300  hover:bg-gray-500 font-semibold"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
