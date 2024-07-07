"use client";
import { SignIn } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

export default function SignInPage() {
	const { theme } = useTheme();
	return (
		<main className="flex-center full-screen">
			<SignIn
				appearance={{
					variables: {
						colorPrimary: "#0E78F9",
					},
					baseTheme: theme === "dark" ? dark : experimental__simple,
				}}
			/>
		</main>
	);
}
