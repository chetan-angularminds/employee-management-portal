import { Avatar, Menu } from "@material-tailwind/react";
import { HeadsetHelp, LogOut, Settings, UserCircle } from "iconoir-react";
import authService from "../../core/services/auth.service";

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
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700">
          <UserCircle className="mr-2 h-[18px] w-[18px] " /> My Profile
        </Menu.Item>
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700">
          <Settings className="mr-2 h-[18px] w-[18px]" /> Edit Profile
        </Menu.Item>
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700">
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="!my-1 -mx-1 border-secondary-dark" />
        <Menu.Item
          onClick={() => {
            authService.logout();
          }}
          className="text-error hover:bg-error-light hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error"
        >
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
}

export default ProfileMenu;
