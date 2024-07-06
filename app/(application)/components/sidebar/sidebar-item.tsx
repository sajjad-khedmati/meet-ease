"use client";
import { cn } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
	label: string;
	icon: string;
	route: string;
}

export default function SidebarItem({ label, icon, route }: SidebarItemProps) {
	const pathname = usePathname();

	const isActive = pathname === route || pathname.startsWith(`${route}/`);

	return (
		<Link
			href={route}
			className={cn(
				"px-5 py-3 rounded-xl flex items-center gap-4 transition hover:bg-blue-50 dark:hover:bg-gray-600",
				isActive &&
					"bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500",
			)}
		>
			<Image
				src={icon}
				alt={label}
				width={20}
				height={20}
				className={cn("invert dark:invert-0", isActive && "invert-0")}
			/>
			<p className="text-sm font-medium">{label}</p>
		</Link>
	);
}
