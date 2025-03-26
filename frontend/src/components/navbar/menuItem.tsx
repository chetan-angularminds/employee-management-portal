/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { Typography, List, type Menu } from "@material-tailwind/react"
import { Community, Globe, GridPlus, Hashtag, JournalPage, Phone, Post, SelectFace3d, SunLight } from "iconoir-react"

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
]

const MenuItem = React.forwardRef<
  typeof Menu.Item,
  {
    title: string
    description: string
    icon?: React.ElementType
  }
>(({ title, description, icon: Icon, ...rest }, ref: any) => {
  return (
    <List.Item
      ref={ref}
      as="a"
      href="#"
      className="p-2 dark:text-white dark:bg-slate-800 dark:hover:bg-purple-600 transition-colors duration-200 rounded-md hover:shadow-sm"
      {...rest}
    >
      {Icon && (
        <List.ItemStart>
          <div className="flex items-center justify-center rounded-lg bg-surface-light p-2.5 dark:bg-purple-800 shadow-sm">
            <Icon className="h-5 w-5 text-black dark:text-white" />
          </div>
        </List.ItemStart>
      )}
      <div className="leading-tight ml-2">
        <Typography color="default" className="mb-1 text-sm font-semibold">
          {title}
        </Typography>
        <Typography type="small" className="text-xs text-foreground/80 dark:text-slate-200">
          {description}
        </Typography>
      </div>
    </List.Item>
  )
})

const renderItems = navListMenuItems.map(({ icon, title, description }, key) => (
  <MenuItem key={key} title={title} description={description} icon={icon} />
))

export default renderItems

