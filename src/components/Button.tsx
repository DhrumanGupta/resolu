import clsx from "clsx";
import * as React from "react";

export interface IButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  children?: React.ReactNode;
  className?: string;
}

function BaseButton(props: IButtonProps) {
  const className = clsx("p-5 rounded-md duration-100", props.className);
  return (
    <button onClick={props.onClick} className={className}>
      {props.children}
    </button>
  );
}

function SecondaryButton(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(
        "bg-white border-2 border-black !text-black hover:bg-gray-light",
        props.className
      )}
    >
      {props.children}
    </BaseButton>
  );
}

function PrimaryButton(props: IButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(
        "text-white bg-orange hover:bg-darkOrange",
        props.className
      )}
    >
      {props.children}
    </BaseButton>
  );
}

export { PrimaryButton, SecondaryButton };
