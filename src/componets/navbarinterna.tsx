"use client";
import React from "react";
import { eliminarToken } from "../utils/auth";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
  QueueListIcon,
  PencilSquareIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";

import Link from "next/link";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "About us",
    // description: "Learn about our story and our mission statement.",
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "Press",
    // description: "News and writings, press releases, and resources",
  },
  {
    color: "green",
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        Careers{" "}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="We're hiring!"
          className="capitalize"
        />
      </div>
    ),
    // description: "We are always looking for talented people. Join us!",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Legal",
    // description: "All the stuff that we dan from legal made us add.",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Products",
    // description: "Checkout our products that helps a startup running.",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "Usuarios",
    // description: "Set of beautiful icons that you can use in your project.",
  },
  {
    color: "cyan",
    icon: PencilSquareIcon,
    title: "Listado de Firmas",
    // description: "High quality UI Kits helps you to 2x faster.",
  },
  {
    color: "red",
    icon: GiftIcon,
    title: "Open Source",
    // description: "List of all our open-source projects, it's all free.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [showNavList2, setShowNavList2] = React.useState(false);

  const router = useRouter(); // Obtén el router
  /* const handleNavigation = (route) => {
    setIsMobileMenuOpen(false);
    setShowNavList2(false);
    setIsMenuOpen(false);
    router.push(route); // Navega a la ruta
  }; */
  const handleNavigation = (route: string) => {
    setIsMobileMenuOpen(false);
    setShowNavList2(false);
    setIsMenuOpen(false);
    router.push(route); // Navega a la ruta
  };
  /* const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      // <a href="#" key={key}>
      <div
        key={key}
        onClick={() => {
          if (title === "Usuarios") {
            handleNavigation("/pages/userstablas");
          } else if (title === "Listado de Firmas") {
            handleNavigation("/page/listadopagos");
          }
        }}
      >
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </div>
      //</a>
    )
  ); */
  const renderItems = navListMenuItems.map(({ icon, title, color }, key) => (
    // <a href="#" key={key}>
    <div
      key={key}
      onClick={() => {
        if (title === "Usuarios") {
          handleNavigation("/pages/userstablas");
        } else if (title === "Listado de Firmas") {
          handleNavigation("/page/listadopagos");
        }
      }}
    >
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div
          className={`rounded-lg p-5 ${colors[color as keyof typeof colors]}`}
        >
          {React.createElement(icon, {
            strokeWidth: 2,
            className: "h-6 w-6",
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </div>
    //</a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-normal text-blue-900"
          >
            <ListItem
              className="flex items-center  gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuOpen((cur) => !cur);
                setShowNavList2(!showNavList2);
              }}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Administracion
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block  ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2 text-blue-900">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        {/* <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse> */}
        <Collapse open={isMobileMenuOpen}>
          {showNavList2 ? renderItems : null}
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const handleLogout = async () => {
    eliminarToken();
    window.location.href = "/";
  };
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <Link href="/page/listapagos">
          <ListItem className="flex  items-center gap-2 py-2 pr-4">
            <QueueListIcon className="h-5 w-5" />
            Listado de Pago
          </ListItem>
        </Link>
      </Typography>

      <NavListMenu />
      <Typography
        as="a"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <a onClick={handleLogout}>
          <ListItem className="flex text-red-600 items-center gap-2 py-2 pr-4">
            <ArrowUturnLeftIcon className="h-5 w-5" />
            Salir
          </ListItem>
        </a>
      </Typography>
    </List>
  );
}

export default function NavbarInterna() {
  const [openNav, setOpenNav] = React.useState(false);
  const [showNavList, setShowNavList] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 text-blue-900">
      <div className=" flex items-center justify-between text-blue-900">
        <div></div>
        <div className="hidden  lg:block">
          <NavList />
        </div>
        <div></div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => {
            setOpenNav(!openNav);
            setShowNavList(!showNavList);
          }}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>{showNavList && <NavList />}</Collapse>
    </Navbar>
  );
}
