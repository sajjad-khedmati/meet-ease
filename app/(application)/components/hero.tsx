"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { formatDistanceToNowStrict } from "date-fns";
import TimerHero from "./timer-hero";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";

export default function Hero({ currentTime }: { currentTime: number }) {
	const { isLoading, upcomingCalls } = useGetCalls();

	return (
		<div
			className="h-[300px] w-full rounded-[20px] bg-hero bg-cover flex flex-col justify-between
			lg:p-8 p-6 gap-6"
		>
			{isLoading ? (
				<div className="flex">
					<Spinner color="white" />
				</div>
			) : upcomingCalls.length > 0 ? (
				<Link
					href={"/upcoming"}
					className="glassmorphism px-4 py-2 rounded-xl w-max font-medium text-white text-xs md:text-sm lg:text-base"
				>
					Upcoming Meeting at{" "}
					{formatDistanceToNowStrict(
						new Date(upcomingCalls[0].state.startsAt!),
					)}{" "}
					later
				</Link>
			) : null}

			<TimerHero currentTime={currentTime} />
		</div>
	);
}
