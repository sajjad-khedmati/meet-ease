import type { Metadata } from "next";
// Global fonts
import { Poppins } from "next/font/google";
// Global styles
import "./globals.css";

// Providers
import { UiProviders } from "./providers/next-ui";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
			<body className={poppins.className}>
				<UiProviders>{children}</UiProviders>
			</body>
		</html>
	);
}
