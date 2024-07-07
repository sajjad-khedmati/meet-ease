import Hero from "./components/hero";

export default function Home() {
	return (
		<main className="flex size-full flex-col gap-10 custom_container">
			<Hero currentTime={Date.now()} />
		</main>
	);
}
