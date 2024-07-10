"use client";
import { ReactNode } from "react";
import { StreamClientProvider } from "../providers/stream-client-provider";

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default RootLayout;
