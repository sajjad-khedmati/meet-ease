import { ThemeSwitcher } from "./components/theme-switcher";

export default function Home() {
	return (
		<main>
			<h1 className="font-semibold text-xl">Hello friends</h1>
			<ThemeSwitcher />
		</main>
	);
}
