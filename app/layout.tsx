import type { Metadata } from "next";
// Global fonts
import { Poppins } from "next/font/google";
// Global styles
import "./globals.css";

// Providers
import { UiProviders } from "./providers/next-ui";
import { cn } from "@nextui-org/react";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Meet Ease",
	description: "Easally start meeting",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("font-poppins antialiased", poppins.variable)}>
				<UiProviders>{children}</UiProviders>
			</body>
		</html>
	);
}
