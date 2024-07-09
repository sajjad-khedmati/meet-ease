"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

export function UiProviders({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();
	return (
		<NextUIProvider>
			<ThemeProvider attribute="class" defaultTheme="dark">
				{children}
			</ThemeProvider>
		</NextUIProvider>
	);
}
