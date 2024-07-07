"use client";
import { SignUp } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

export default function SignUpPage() {
	const { theme } = useTheme();
	return (
		<main className="flex-center full-screen">
			<SignUp
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
