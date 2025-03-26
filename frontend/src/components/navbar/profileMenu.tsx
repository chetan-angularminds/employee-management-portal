"use client"

import { Avatar, Menu } from "@material-tailwind/react"
import { HeadsetHelp, LogOut, Settings, UserCircle } from "iconoir-react"
import authService from "../../core/services/auth.service"

function ProfileMenu() {
  return (
    <Menu>
      <Menu.Trigger
        as={Avatar}
        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg"
        alt="profile-picture"
        size="sm"
        className="border-2 border-primary p-0.5 lg:ml-auto cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
      />
      <Menu.Content className="dark:bg-slate-800 min-w-[180px] p-1 shadow-lg">
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700 flex items-center py-2 transition-colors duration-200">
          <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
        </Menu.Item>
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700 flex items-center py-2 transition-colors duration-200">
          <Settings className="mr-2 h-[18px] w-[18px]" /> Edit Profile
        </Menu.Item>
        <Menu.Item className="dark:text-slate-300 dark:hover:bg-purple-700 flex items-center py-2 transition-colors duration-200">
          <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
        </Menu.Item>
        <hr className="my-1.5 mx-1 border-secondary-dark opacity-50" />
        <Menu.Item
          onClick={() => {
            authService.logout()
          }}
          className="text-error hover:bg-error-light hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error flex items-center py-2 transition-colors duration-200"
        >
          <LogOut className="mr-2 h-[18px] w-[18px]" />
          Logout
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

export default ProfileMenu

