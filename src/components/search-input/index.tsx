const SearchInput = () => {
  return (
    <div className="relative w-full max-w-xl">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="fill-gray-500 dark:fill-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
            fill=""
          />
        </svg>
      </span>
      <input
        id="search-input"
        type="text"
        placeholder="Search or type command..."
        className="
            w-full h-11 rounded-lg lg:w-full-lg
            bg-transparent dark:bg-gray-900/40
            border border-gray-200 dark:border-gray-800
            pl-12 pr-14 py-2.5
            text-sm text-gray-800 dark:text-gray-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500

            focus:outline-hidden
            focus:ring-2 focus:ring-brand-500/20
            focus:border-brand-300 dark:focus:border-brand-800"
      />
    </div>
  );
};

export default SearchInput;
