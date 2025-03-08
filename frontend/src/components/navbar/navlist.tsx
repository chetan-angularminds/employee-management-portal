import { Typography, List } from "@material-tailwind/react";
import { Archive, ProfileCircle, SelectFace3d } from "iconoir-react";

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
function NavList() {
  return (
    <>
      {LINKS.map(({ icon: Icon, title, href }) => (
        <List.Item
          key={title}
          as="a"
          href={href}
          className="dark:text-purple-300 dark:hover:bg-purple-700 focus:dark:bg-purple-700"
        >
          <List.ItemStart className="mr-1.5">
            <Icon className="h-4 w-4" />
          </List.ItemStart>
          <Typography type="small">{title}</Typography>
        </List.Item>
      ))}
    </>
  );
}

export default NavList;
