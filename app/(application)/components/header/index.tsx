import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<Navbar maxWidth="full" className="dark:bg-secondary bg-slate-50">
			<NavbarContent>
				<NavbarMenuToggle className="lg:hidden"></NavbarMenuToggle>
				<NavbarBrand>
					<Image
						src={"/icons/logo.svg"}
						alt="meet ease"
						width={42}
						height={42}
					/>
					<h1 className="font-semibold text-xl">Meet Ease</h1>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="end">profile</NavbarContent>
			<NavbarMenu>
				<NavbarMenuItem>
					<Link href={"/"}>Home</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
