"use client";
import { SignedIn, SignInButton, UserProfile } from "@clerk/clerk-react";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import MobileNavItems from "./mobile-nav-items";
import { useState } from "react";

export default function Header() {
	const { theme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	return (
		<Navbar
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			maxWidth="full"
			className="dark:bg-secondary bg-slate-50"
		>
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
			<NavbarContent justify="end">
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton
						userProfileProps={{
							appearance: {
								baseTheme: theme === "dark" ? dark : experimental__simple,
							},
						}}
						appearance={{
							variables: {
								colorPrimary: "#0E78F9",
							},
							baseTheme: theme === "dark" ? dark : experimental__simple,
						}}
					/>
				</SignedIn>
			</NavbarContent>
			<MobileNavItems setIsMenuOpen={setIsMenuOpen} />
		</Navbar>
	);
}
