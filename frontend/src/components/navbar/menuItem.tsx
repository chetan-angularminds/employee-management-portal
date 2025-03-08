/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Typography, List, Menu } from "@material-tailwind/react";
import {
  Community,
  Globe,
  GridPlus,
  Hashtag,
  JournalPage,
  Phone,
  Post,
  SelectFace3d,
  SunLight,
} from "iconoir-react";

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

const MenuItem = React.forwardRef<
  typeof Menu.Item,
  {
    title: string;
    description: string;
    icon?: React.ElementType;
  }
>(({ title, description, icon: Icon, ...rest }, ref: any) => {
  return (
    <List.Item
      ref={ref}
      as="a"
      href="#"
      className="p-1.5 dark:text-white dark:bg-purple-700 dark:hover:bg-purple-500"
      {...rest}
    >
      {Icon && (
        <List.ItemStart>
          <div className="flex items-center justify-center rounded-[5px] bg-surface-light p-2 dark:bg-purple-800">
            <Icon className="h-6 w-6 text-black dark:text-white" />
          </div>
        </List.ItemStart>
      )}
      <div className="leading-none">
        <Typography color="default" className="mb-0.5 text-sm font-semibold">
          {title}
        </Typography>
        <Typography
          type="small"
          className="text-xs text-foreground dark:text-slate-800"
        >
          {description}
        </Typography>
      </div>
    </List.Item>
  );
});

const renderItems = navListMenuItems.map(
  ({ icon, title, description }, key) => (
    <MenuItem key={key} title={title} description={description} icon={icon} />
  )
);

export default renderItems;
