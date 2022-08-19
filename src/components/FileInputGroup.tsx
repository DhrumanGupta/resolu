import clsx from "clsx";
import { ReactNode } from "react";

interface IProps<T> {
  placeholder?: string;
  label: string;
  setValue: (value: T) => void;
  labelClassName?: string;
  inputClassName?: string;
  accept?: string;
  [key: string]: any;
}

const FileInputGroup = <T extends unknown>({
  label,
  setValue,
  placeholder,
  inputClassName,
  labelClassName,
  children,
  ...props
}: IProps<T> & { children?: ReactNode }) => {
  return (
    <>
      <label
        htmlFor={label}
        className={clsx("mt-4 mb-1 font-semibold w-full", labelClassName)}
      >
        {label}
      </label>
      <input
        {...props}
        placeholder={placeholder}
        id={label}
        type="file"
        className={clsx(
          "bg-gray-light text-md p-2 rounded w-full",
          inputClassName
        )}
        onChange={(e) => setValue(e.target.files as any)}
      />
    </>
  );
};

export default FileInputGroup;
