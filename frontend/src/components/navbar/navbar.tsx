import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Tooltip,
  Button,
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
  const [isLoading, setisLoading] = React.useState(false)
  React.useEffect(() => {
    console.log("heloo")
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
    authService.isAuthenticated().then((res)=>{
      console.log(res);
      
    })
  }, []);

  return (
    <Navbar className="mx-auto w-full my-2 max-w-screen-xl dark:text-white dark:bg-slate-600 dark:border-none">
      <div className="flex items-center">
        <Typography
          as="a"
          href="#"
          type="small"
          className="ml-2 mr-2 block py-1 font-semibold"
        >
          Staff Mosaic
        </Typography>
        <hr className="mx-1 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
        <div className="hidden lg:block">
          <List className="mt-4 flex flex-col gap-1 lg:mt-0 lg:flex-row lg:items-center ">
            <Tooltip placement="bottom" interactive>
              <Tooltip.Trigger>
                <List.Item className="dark:text-purple-300 dark:hover:bg-purple-700 focus:dark:bg-purple-700">
                  <List.ItemStart className="me-1.5">
                    <MultiplePages className="h-4 w-4" />
                  </List.ItemStart>
                  <Typography type="small">Pages</Typography>
                  <List.ItemEnd className="ps-1">
                    <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className="z-[100000] grid max-w-screen-xl rounded-lg border border-purple-300 bg-background p-2 shadow-xl shadow-surface/10 dark:border-purple-500 dark:bg-purple-700">
                <ul className="grid grid-cols-3 gap-y-2">{renderItems}</ul>
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

        {!isLoading ? isAuthenticated  ? (
          <ProfileMenu />
        ) : (
          <Button
            size="sm"
            className="hidden border-none lg:ml-auto lg:inline-block text-white bg-purple-600 hover:bg-purple-800"
            onClick={() => {
              Navigate("/auth/sign-in");
            }}
          >
            Sign In
          </Button>
        ): <></>}
      </div>
      <Collapse open={openNav}>
        <ul className="grid grid-cols-1 gap-y-2 md:grid-cols-2 ">
          {renderItems}
        </ul>
        <NavList />
        {!isLoading && !isAuthenticated && <Button
          isFullWidth
          size="sm"
          className="mt-4"
          onClick={() => {
            setOpenNav(!openNav)
            Navigate("/auth/sign-in");
          }}
        >
          Sign In
        </Button>}
      </Collapse>
    </Navbar>
  );
}
