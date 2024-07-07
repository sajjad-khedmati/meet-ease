import { ReactNode } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

interface ApplicationLayoutProps {
	children: ReactNode;
}

export default function ApplicationLayout({
	children,
}: ApplicationLayoutProps) {
	return (
		<main className="w-screen h-screen flex flex-col overflow-hidden">
			<Header />
			<section className="flex h-1 flex-1">
				<Sidebar />
				<section className="flex-1 overflow-y-scroll">{children}</section>
			</section>
		</main>
	);
}
