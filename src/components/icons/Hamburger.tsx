import clsx from "clsx";
import { FC } from "react";
import { IIconProps } from "./types";

const Hamburger: FC<IIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 80"
      width="40"
      height="30"
      className={clsx(className)}
    >
      <rect width="80" height="5" rx="2" />
      <rect y="25" width="80" height="5" rx="2" />
      <rect y="50" width="80" height="5" rx="2" />
    </svg>
  );
};

export default Hamburger;
