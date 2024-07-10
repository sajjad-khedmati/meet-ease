import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export function UiProviders({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<ThemeProvider attribute="class" defaultTheme="dark">
				{children}
			</ThemeProvider>
		</NextUIProvider>
	);
}
