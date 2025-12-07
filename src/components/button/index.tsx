import type { ButtonHTMLAttributes, ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  const { children, isLoading = false, ...rest } = props;

  return (
    <button
      type="submit"
      //   className="w-full flex items-center  justify-center px-4 py-2
      //   text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none
      //   focus:ring-2 focus:ring-blue-400 duration-300 ease-in-out"
      className="inline-flex bg-blue-800 text-white dark:bg-blue-400 dark:text-gray-950 hover:bg-blue-900 dark:hover:bg-blue-500 rounded-lg py-2 px-4 font-semibold cursor-pointer
        ease-in-out duration-300"
      {...rest}
    >
      {isLoading && (
        <div
          role="spinbutton"
          className="h-5 w-5 border-4 mr-3 border-white border-t-transparent rounded-full animate-spin"
        ></div>
      )}
      {children}
    </button>
  );
};

export default Button;
