import React, { FC, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import useUser from "src/hooks/useUser";
import { PrimaryButton } from "./Button";
import { logout } from "lib/userApi";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  MenuPopover,
  MenuButton,
  useMenuButtonContext,
  MenuLink,
  MenuItems,
} from "@reach/menu-button";
import Close from "./icons/Close";
import Hamburger from "./icons/Hamburger";

type Route = {
  path: string;
  label: string;
  primary?: boolean;
};

const ROUTES: Route[] = [
  {
    path: "/petitions",
    label: "Browse Petitions",
  },
];

const ANONYMOUS_ROUTES: Route[] = [
  {
    path: "/signup",
    label: "Sign Up / Sign In",
    primary: true,
  },
];

const PROTECTED_ROUTES: Route[] = [
  {
    path: "/my-petitions",
    label: "My Petitions",
  },
  {
    path: "/create-petition",
    label: "Create Petition",
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

const MobileMenuList: FC = () => {
  const { isExpanded } = useMenuButtonContext();

  const { loggedIn, mutate } = useUser();

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 1rem)`, // 1.75rem from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: "block" }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "linear",
            }}
            className="flex h-full flex-col overflow-y-scroll border-t border-gray-dark bg-white duration-500 w-screen"
          >
            <MenuItems className="flex flex-col b-0">
              <Link href={"/"}>
                <MenuLink
                  as={"a"}
                  className="text-gray-dark duration-100 hover:cursor-pointer hover:bg-gray-light no-underline p-4 border-b border-gray-dark"
                >
                  Resolu
                </MenuLink>
              </Link>

              {ROUTES.map((route) => (
                <Link key={route.path} href={route.path}>
                  <MenuLink
                    as={"a"}
                    className="text-gray-dark duration-100 hover:cursor-pointer hover:bg-gray-light no-underline p-4 border-b border-gray-dark"
                  >
                    {route.label}
                  </MenuLink>
                </Link>
              ))}

              {!loggedIn &&
                ANONYMOUS_ROUTES.map((route, index) => (
                  <Link key={route.path} href={route.path}>
                    <MenuLink
                      as={"a"}
                      className="text-gray-dark duration-100 hover:cursor-pointer hover:bg-gray-light no-underline p-4 border-b border-gray-dark"
                    >
                      {route.label}
                    </MenuLink>
                  </Link>
                ))}

              {loggedIn &&
                PROTECTED_ROUTES.map((route, index) => (
                  <Link key={route.path} href={route.path}>
                    <MenuLink
                      as={"a"}
                      className="text-gray-dark duration-100 hover:cursor-pointer hover:bg-gray-light no-underline p-4 border-b border-gray-dark"
                    >
                      {route.label}
                    </MenuLink>
                  </Link>
                ))}

              {loggedIn && (
                <PrimaryButton
                  className="text-sm font-semibold w-[90vw] mx-auto mt-5"
                  onClick={() => {
                    logout().then(() => mutate(null));
                  }}
                >
                  Sign Out
                </PrimaryButton>
              )}

              {/* {LINKS.map((link) => (
                <Link href={link.to} key={link.to}>
                  <MenuLink as={"a"} className="">
                    {link.name}
                  </MenuLink>
                </Link>
              ))} */}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

const MobileMenu: FC = () => (
  <Menu>
    {({ isExpanded }) => (
      <>
        <MenuButton>
          {isExpanded ? (
            <Close className="w-8 h-8 fill-primary" />
          ) : (
            // eslint-disable-next-line react/jsx-no-undef
            <Hamburger className="w-10 h-10 fill-primary" />
          )}
        </MenuButton>
        <MobileMenuList />
      </>
    )}
  </Menu>
);

const DesktopBar: FC = () => {
  const { loggedIn, mutate } = useUser();
  return (
    <div className="hidden lg:flex child:ml-5 first:m-0 justify-end py-5 pr-5">
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
              : "bg-white border-2 border-black !text-black hover:bg-gray-light"
          }
        >
          {route.label}
        </NavItem>
      ))}

      {!loggedIn &&
        ANONYMOUS_ROUTES.map((route, index) => (
          <NavItem
            key={route.path}
            to={route.path}
            className={
              route.primary
                ? "bg-orange !text-white hover:bg-darkOrange"
                : "bg-white border-2 border-black !text-black hover:bg-gray-light"
            }
          >
            {route.label}
          </NavItem>
        ))}

      {loggedIn &&
        PROTECTED_ROUTES.map((route, index) => (
          <NavItem
            key={route.path}
            to={route.path}
            className={
              route.primary
                ? "bg-orange !text-white hover:bg-darkOrange"
                : "bg-white border-2 border-black !text-black hover:bg-gray-light"
            }
          >
            {route.label}
          </NavItem>
        ))}

      {loggedIn && (
        <PrimaryButton
          className="text-xs lg:text-sm font-semibold"
          onClick={() => {
            logout().then(() => mutate(null));
          }}
        >
          Sign Out
        </PrimaryButton>
      )}
    </div>
  );
};
export default function Navbar() {
  const { loggedIn, mutate } = useUser();

  return (
    <header>
      <nav>
        <DesktopBar />
        <div className="flex items-end justify-end w-screen">
          <div className="flex items-end lg:hidden mt-4 mr-4">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
