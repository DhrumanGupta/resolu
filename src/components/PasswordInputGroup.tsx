import { ReactNode } from "react";
import EyeHidden from "./icons/EyeHidden";
import EyeVisible from "./icons/EyeVisible";

interface IProps<T> {
  placeholder?: string;
  label: string;
  value: T;
  hidden: boolean;
  setHidden: (value: boolean) => void;
  setValue: (value: T) => void;
}

const PasswordInputGroup = <T extends unknown>({
  label,
  value,
  setValue,
  placeholder,
  hidden,
  setHidden,
}: IProps<T> & { children?: ReactNode }) => {
  return (
    <>
      <label htmlFor={label} className="mt-4 mb-1 font-semibold">
        {label}
      </label>
      <span className="flex bg-gray-light rounded text-md">
        <input
          placeholder={placeholder}
          type={hidden ? "password" : "text"}
          id={label}
          value={value as any}
          className="p-2 bg-gray-light flex-grow rounded"
          onChange={(e) => setValue(e.target.value as any)}
        />
        <i
          className="p-0 m-2 mt-3 hover:cursor-pointer"
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          {hidden ? (
            <EyeHidden className="w-4 h-auto" />
          ) : (
            <EyeVisible className="w-4 h-auto" />
          )}
        </i>
      </span>
    </>
  );
};

export default PasswordInputGroup;
