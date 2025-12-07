import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";

export type InputType = Exclude<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["type"],
  "checkbox" | "radio"
>;

type Props = {
  label?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, disabled = false, error, ...rest } = props;

  return (
    <>
      {label && <label className="block text-md font-semibold">{label}</label>}
      <input
        ref={ref}
        className="w-full border rounded-lg border-gray-600 bg-gray-200 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 py-2 mt-2"
        disabled={disabled}
        {...rest}
      />
      {error && <small className="text-red-600 my-2">{error}</small>}
    </>
  );
});

Input.displayName = "Input";

export default Input;
