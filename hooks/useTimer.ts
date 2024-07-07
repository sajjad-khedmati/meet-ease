import { useEffect, useState } from "react";

interface timerExportProps {
	time: string;
	date: string;
	isAfternoon: boolean;
}

export function useTimer(initial: number): timerExportProps {
	const now = new Date(initial);

	const temp_time = now.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h24",
	});

	const temp_date = new Intl.DateTimeFormat("en-US", {
		dateStyle: "full",
	}).format(now);
	const [timeData, setTimeData] = useState<timerExportProps>({
		time: temp_time,
		date: temp_date,
		isAfternoon: now.getHours() >= 12,
	});
	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date(initial);

			const temp_time = now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hourCycle: "h24",
			});

			const temp_date = new Intl.DateTimeFormat("en-US", {
				dateStyle: "full",
			}).format(now);

			setTimeData({
				time: temp_time,
				date: temp_date,
				isAfternoon: now.getHours() >= 12,
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);
	const time = timeData.time;
	const date = timeData.date;
	const isAfternoon = timeData.isAfternoon;
	return { time, date, isAfternoon };
}
