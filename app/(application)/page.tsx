import ActionCard from "./components/action-card";
import Hero from "./components/hero";

export default function Home() {
	return (
		<main className="flex size-full flex-col gap-4 custom_container">
			<Hero currentTime={Date.now()} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
				<ActionCard
					iconSrc="/icons/add-personal.svg"
					title="new meeting"
					description="Setup a new recording"
					classNames="bg-gradient-to-b from-orange-600 to-orange-500"
				/>

				<ActionCard
					iconSrc="/icons/join-meeting.svg"
					title="join meeting"
					description="Via invitation link"
					classNames="bg-gradient-to-b from-blue-600 to-blue-500"
				/>

				<ActionCard
					iconSrc="/icons/schedule.svg"
					title="schedule meeting"
					description="Plan your meeting"
					classNames="bg-[#830EF9] dark:bg-[#830EF9]"
				/>

				<ActionCard
					iconSrc="/icons/video.svg"
					title="view recording"
					description="Meeting recordings"
					classNames="bg-[#F9A90E] dark:bg-[#F9A90E]"
				/>
			</div>
		</main>
	);
}
