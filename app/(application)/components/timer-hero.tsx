"use client";
import { useTimer } from "@/hooks/useTimer";
import React from "react";

export default function TimerHero({ currentTime }: { currentTime: number }) {
	const { time, date, isAfternoon } = useTimer(currentTime);
	return (
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
	);
}
