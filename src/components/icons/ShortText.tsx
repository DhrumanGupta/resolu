import clsx from "clsx";
import * as React from "react";
import { IIconProps } from "./types";

export default function ShortText(props: IIconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      className={clsx(props.className)}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z"></path>
    </svg>
  );
}
