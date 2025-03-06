/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  List,
  Avatar,
  Menu,
  Tooltip,
} from "@material-tailwind/react";
import {
  Archive,
  Community,
  Globe,
  GridPlus,
  Hashtag,
  HeadsetHelp,
  JournalPage,
  LogOut,
  Menu as MenuIcon,
  MultiplePages,
  NavArrowDown,
  Phone,
  Post,
  ProfileCircle,
  SelectFace3d,
  Settings,
  SunLight,
  UserCircle,
  Xmark,
} from "iconoir-react";

const LINKS = [
  {
    icon: ProfileCircle,
    title: "Account",
    href: "#",
  },
  {
    icon: SelectFace3d,
    title: "Blocks",
    href: "#",
  },
  {
    icon: Archive,
    title: "Docs",
    href: "#",
  },
];

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: GridPlus,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: Community,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Post,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunLight,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: Globe,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: Phone,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: JournalPage,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SelectFace3d,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: Hashtag,
  },
];

function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href }) => (
        <List.Item key={title} as="a" href={href} className="dark:text-slate-400 dark:hover:bg-slate-600 focus:dark:bg-slate-600">
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

function ProfileMenu() {
  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg"
        alt="profile-picture"
        size="sm"
        className="border border-primary p-0.5 lg:ml-auto "
      />
      <Menu.Content className="dark:bg-slate-800 ">
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-slate-600">
          <UserCircle className="mr-2 h-[18px] w-[18px] " /> My Profile
        </Menu.Item>
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-slate-600">
          <Settings className="mr-2 h-[18px] w-[18px]" /> Edit Profile
        </Menu.Item >
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-slate-600">
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="!my-1 -mx-1 border-secondary-dark" />
        <Menu.Item className="text-error hover:bg-error-light hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error">
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

const MenuItem = React.forwardRef<
  typeof Menu.Item,
  {
    title: string;
    description: string;
    icon?: React.ElementType;
  }
>(({ title, description, icon: Icon, ...rest }, ref:any) => {
  return (
    <List.Item ref={ref} as="a" href="#" className="p-1.5 dark:text-white dark:bg-slate-600 dark:hover:bg-slate-400" {...rest}>
      {Icon && (
        <List.ItemStart>
          <div className="flex items-center justify-center rounded-[5px] bg-surface-light p-2 dark:bg-slate-500">
            <Icon className="h-6 w-6 text-black dark:text-white" />
          </div>
        </List.ItemStart>
      )}
      <div className="leading-none">
        <Typography color="default" className="mb-0.5 text-sm font-semibold">
          {title}
        </Typography>
        <Typography type="small" className="text-xs text-foreground dark:text-slate-800">
          {description}
        </Typography>
      </div>
    </List.Item>
  );
});

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <MenuItem key={key} title={title} description={description} icon={icon} />
    ),
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
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
                <List.Item className="dark:text-slate-400 dark:hover:bg-slate-600 focus:dark:bg-slate-600">
                  <List.ItemStart className="me-1.5">
                    <MultiplePages className="h-4 w-4" />
                  </List.ItemStart>
                  <Typography type="small" >Pages</Typography>
                  <List.ItemEnd className="ps-1">
                    <NavArrowDown className="h-3.5 w-3.5 group-data-[open=true]:rotate-180" />
                  </List.ItemEnd>
                </List.Item>
              </Tooltip.Trigger>
              <Tooltip.Content className="z-[100000] grid max-w-screen-xl rounded-lg border border-surface bg-background p-2 shadow-xl shadow-surface/10 dark:border-surface dark:bg-slate-600">
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
        <ProfileMenu />
      </div>
      <Collapse open={openNav}>
        <ul className="grid grid-cols-1 gap-y-2 md:grid-cols-2 ">
          {renderItems}
        </ul>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
