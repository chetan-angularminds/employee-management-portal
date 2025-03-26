"use client";

import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Tooltip,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  Xmark,
} from "iconoir-react";
import NavList from "./navlist";
import ProfileMenu from "./profileMenu";
import renderItems from "./menuItem";
import { useNavigate } from "react-router-dom";
import authService from "../../core/services/auth.service";

export default function NavbarWithMegaMenu() {
  const Navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [isLoading, setisLoading] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    authService.isUserAuthenticated$.subscribe((value: boolean) => {
      setIsAuthenticated(value);
    });
    authService.isLoading$.subscribe((value: boolean) => {
      setisLoading(value);
    });
    authService.isAuthenticated().then((res) => {
      console.log(res);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <Navbar className="mx-auto w-full my-2 max-w-screen-xl dark:text-white dark:bg-slate-700 dark:border-none shadow-md">
      <div className="flex items-center">
        <Typography
          as="a"
          href="#"
          type="small"
          className="ml-2 mr-2 block py-1 font-bold text-lg"
        >
          Staff Mosaic
        </Typography>
        <hr className="mx-2 hidden h-6 w-px border-l border-t-0 border-secondary-dark/70 lg:block" />
        <div className="hidden lg:block">
          <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center">
            <Tooltip placement="bottom" interactive>
              <Tooltip.Trigger>
                <List.Item className="dark:text-purple-300 dark:hover:bg-purple-700 focus:dark:bg-purple-700 transition-colors duration-200 flex items-center px-3 py-2 rounded-md">
                  <List.ItemStart className="me-1.5">
                    <MultiplePages className="h-4 w-4" />
                  </List.ItemStart>
                  <Typography type="small" className="font-medium">
                    Pages
                  </Typography>
                  <List.ItemEnd className="ps-1">
                    <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180 transition-transform duration-200" />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className="z-[100000] grid max-w-screen-xl rounded-lg border border-purple-300 bg-background p-3 shadow-xl shadow-surface/10 dark:border-purple-500 dark:bg-slate-700">
                <ul className="grid grid-cols-3 gap-3">{renderItems}</ul>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip>
            <NavList />
          </List>
        </div>
        <IconButton
          size="sm"
          variant="ghost"
          color="secondary"
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto mr-2 grid lg:hidden"
        >
          {openNav ? (
            <Xmark className="h-4 w-4" />
          ) : (
            <MenuIcon className="h-4 w-4" />
          )}
        </IconButton>

        {isAuthenticated ? (
          <ProfileMenu />
        ) : (
          <Button
            size="sm"
            className="hidden border-none lg:ml-auto lg:inline-block text-white bg-purple-600 hover:bg-purple-800 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => {
              Navigate("/auth/sign-in");
            }}
          >
            Sign In
          </Button>
        )}
      </div>
      <Collapse open={openNav}>
        <div className="mt-3 border-t dark:border-purple-600/30 pt-3">
          <ul className="grid grid-cols-1 gap-y-2 md:grid-cols-2">
            {renderItems}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <NavList />
          </div>
          {!isAuthenticated && (
            <Button
              isFullWidth
              size="sm"
              className="mt-4 bg-purple-600 hover:bg-purple-800 transition-colors duration-200"
              onClick={() => {
                setOpenNav(!openNav);
                Navigate("/auth/sign-in");
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
