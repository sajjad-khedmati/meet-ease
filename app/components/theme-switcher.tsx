"use client";

import { MoonIcon } from "@/public/icons/MoonIcon";
import { SunIcon } from "@/public/icons/SunIcon";
import { cn, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Switch
			isSelected={theme === "dark"}
			size="sm"
			startContent={<SunIcon />}
			endContent={<MoonIcon />}
			onValueChange={() => {
				setTheme(theme === "dark" ? "light" : "dark");
			}}
			classNames={{
				base: cn(
					"w-full inline-flex w-full max-w-lg px-2 rounded-xl dark:bg-background-primary/50 bg-slate-100 border-slate-200 border-2 dark:border-background-primary py-4",
				),
			}}
		>
			<div className="flex flex-col gap-1">
				<p className="text-sm">Dark mode</p>
				<p className="text-tiny text-default-400">
					switch to {theme === "dark" ? "light" : "dark"} mode
				</p>
			</div>
		</Switch>
	);
}
