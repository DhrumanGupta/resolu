import clsx from "clsx";
import { ReactNode } from "react";

interface IProps<T> {
  placeholder?: string;
  label: string;
  value: T;
  type?: string;
  setValue: (value: T) => void;
  labelClassName?: string;
  inputClassName?: string;
  accept?: string;
  [key: string]: any;
}

const InputGroup = <T extends unknown>({
  label,
  type,
  value,
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
        type={type ? type : typeof value}
        id={label}
        value={value as any}
        className={clsx(
          "bg-gray-light text-md p-2 rounded w-full",
          inputClassName
        )}
        onChange={(e) => setValue(e.target.value as any)}
      />
    </>
  );
};

export default InputGroup;
