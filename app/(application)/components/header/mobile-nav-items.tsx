"use client";
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import { sidebarLinks } from "@/constants/sidebar-links";
import { cn, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Link2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function MobileNavItems({
	setIsMenuOpen,
}: {
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const { theme } = useTheme();
	return (
		<NavbarMenu className="py-4 flex flex-col justify-between">
			<div className="">
				<div className="flex gap-1 items-center mb-1">
					<Link2Icon className="size-4" />
					<span className="text-sm font-medium">Links</span>
				</div>
				{sidebarLinks.map((link) => (
					<NavbarMenuItem
						onClick={() => {
							setIsMenuOpen(false);
						}}
						key={link.route}
						className="flex items-center gap-2 py-3"
					>
						<Image
							src={link.imgURL}
							width={20}
							height={20}
							alt="icon"
							className={cn(theme === "light" && "invert")}
						/>
						<Link href={link.route}>{link.label}</Link>
					</NavbarMenuItem>
				))}
			</div>

			<ThemeSwitcher />
		</NavbarMenu>
	);
}
