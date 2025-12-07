import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";

type Props = {
  label?: string;
  error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, onChange, ...rest }, ref) => {
    const [fileName, setFileName] = useState<string>("No file chosen");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFileName(files[0].name);
      } else {
        setFileName("No file chosen");
      }
      onChange?.(e);
    };

    useEffect(() => {
      if (inputRef.current) {
        if (!inputRef.current.value) {
          setFileName("No file chosen");
        }
      }
    }, [rest.value]);

    return (
      <div>
        {label && (
          <label className="block text-md font-semibold mb-2">{label}</label>
        )}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-950 dark:hover:bg-gray-700 rounded-lg px-4 py-2 font-semibold cursor-pointer transition-colors duration-200 text-nowrap">
            Choose File
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              {...rest}
            />
          </label>
          <span className="truncate text-gray-600 dark:text-gray-400 font-medium text">
            {fileName}
          </span>
        </div>
        {error && <small className="text-red-600 my-2 block">{error}</small>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
