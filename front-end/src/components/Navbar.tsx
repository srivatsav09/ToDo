import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
// import logo from '/todo.svg'
// import { Button } from "@nextui-org/button";
// import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
// import { Input } from "@nextui-org/input";

//import { link as linkStyles } from "@nextui-org/theme";

// import clsx from "clsx";


export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground">
                        Your TodoList
                    </Link>
                </NavbarItem>
            </NavbarContent>
		</NextUINavbar>
	);
};