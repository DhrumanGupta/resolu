import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

const ROUTES = [
  {
    path: "/petitions",
    label: "Browse Petitions",
  },
  // {
  //   path: "/my-petitions",
  //   label: "My Petitions",
  // },
  {
    path: "/signup",
    label: "Sign Up / Sign In",
    primary: true,
  },
];

const NavItem = ({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={to}>
      <a
        className={clsx(
          "px-5 py-3 rounded-xl font-semibold duration-100 !no-underline text-xs lg:text-sm",
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="flex child:ml-5 first:m-0 justify-end py-5 pr-5">
        {/* <Image layout={"fill"} src /> */}

        <Link href="/">
          <a className="no-underline text-black text-2xl my-auto pl-2 mr-auto font-bold">
            Resolu
          </a>
        </Link>

        {ROUTES.map((route, index) => (
          <NavItem
            key={route.path}
            to={route.path}
            className={
              route.primary
                ? "bg-orange !text-white hover:bg-darkOrange"
                : "bg-white border-2 border-black !text-black hover:bg-lightGray"
            }
          >
            {route.label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
