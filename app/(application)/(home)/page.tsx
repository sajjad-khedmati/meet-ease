import Hero from "../components/hero";
import MeetingOptions from "../components/meeting-options";

export default function Home() {
	return (
		<main className="flex size-full flex-col gap-4 custom_container">
			<Hero currentTime={Date.now()} />
			<MeetingOptions />
		</main>
	);
}
