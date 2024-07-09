import type { Metadata } from "next";
// Global fonts
import { Poppins } from "next/font/google";
// Global styles
import "./globals.css";

// Providers
import { UiProviders } from "./providers/next-ui";
import { cn } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
		<ClerkProvider
			appearance={{
				layout: {
					logoImageUrl: "/icons/logo.svg",
					socialButtonsVariant: "iconButton",
				},
				variables: {
					colorPrimary: "#0E78F9",
				},
			}}
		>
			<html lang="en">
				<body className={cn("font-poppins antialiased", poppins.variable)}>
					<UiProviders>{children}</UiProviders>
					<Toaster position="top-center" closeButton richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}
