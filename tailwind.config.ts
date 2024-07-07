import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"background-primary": "#161925",
				secondary: "#1C1F2E",
			},
			fontFamily: {
				poppins: ["var(--font-poppins)"],
			},
			backgroundImage: {
				hero: "url('/images/hero-background.png')",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			prefix: "nextui",
			defaultTheme: "light",
			defaultExtendTheme: "light",
			themes: {
				dark: {
					colors: {
						background: "#161925",
					},
				},
			},
		}),
	],
};
export default config;
