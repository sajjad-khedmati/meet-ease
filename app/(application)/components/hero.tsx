"use client";

import { useTimer } from "@/hooks/useTimer";

export default function Hero({ currentTime }: { currentTime: number }) {
	const { time, date, isAfternoon } = useTimer(currentTime);

	return (
		<div
			className="h-[300px] w-full rounded-[20px] bg-hero bg-cover flex flex-col justify-between
			lg:p-8 p-6 gap-6"
		>
			<p className="glassmorphism px-4 py-2 rounded-xl w-max font-medium text-white text-xs md:text-sm lg:text-base">
				Upcoming Meeting at: 12:30 PM
			</p>

			<div className="flex flex-col leading-tight text-white">
				<p className="md:text-[75px] text-[50px] font-semibold">
					{time}{" "}
					<span className="text-3xl font-medium">
						{isAfternoon ? "PM" : "AM"}
					</span>
				</p>
				<span className="text-blue-100 md:text-xl text-lg font-light">
					{date}
				</span>
			</div>
		</div>
	);
}
