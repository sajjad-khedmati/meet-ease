"use client";

import Loader from "@/app/components/loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./meeting-card";
import { Pagination } from "@nextui-org/react";
const PAGE_SIZE = 4;
export default function CallList({
	type,
}: {
	type: "ended" | "upcoming" | "recording";
}) {
	const router = useRouter();
	const { endedCalls, recordingCalls, upcomingCalls, isLoading } =
		useGetCalls();

	const [recordings, setRecordings] = useState<CallRecording[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const getCalls = () => {
		switch (type) {
			case "ended":
				return endedCalls;
			case "recording":
				return recordings;
			case "upcoming":
				return upcomingCalls;
			default:
				return [];
		}
	};

	const getNoCallsMessage = () => {
		switch (type) {
			case "ended":
				return "No Previous Calls";
			case "upcoming":
				return "No Upcoming Calls";
			case "recording":
				return "No Recordings";
			default:
				return "";
		}
	};

	useEffect(() => {
		const fetchRecordings = async () => {
			const callData = await Promise.all(
				recordingCalls?.map((meeting) => meeting.queryRecordings()) ?? [],
			);

			const recordings = callData
				.filter((call) => call.recordings.length > 0)
				.flatMap((call) => call.recordings);

			setRecordings(recordings);
		};

		if (type === "recording") {
			fetchRecordings();
		}
	}, [type, recordingCalls]);

	if (isLoading) return <Loader />;

	const calls = getCalls();
	const noCallsMessage = getNoCallsMessage();

	return (
		<>
			{calls && calls.length > 0 ? (
				<div className="flex flex-col gap-6">
					<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
						{(type === "recording" ? recordings : calls)
							.slice((currentPage - 1) * PAGE_SIZE, PAGE_SIZE * currentPage)
							.map((meeting: Call | CallRecording) => (
								<MeetingCard
									members={(meeting as Call)
										.queryMembers()
										.then((res) => res.members)}
									key={(meeting as Call).id}
									icon={
										type === "ended"
											? "/icons/previous.svg"
											: type === "upcoming"
											? "/icons/upcoming.svg"
											: "/icons/recordings.svg"
									}
									title={
										(meeting as Call).state?.custom?.description ||
										(meeting as CallRecording).filename?.substring(0, 20) ||
										"No Description"
									}
									date={
										(meeting as Call).state?.startsAt?.toLocaleString() ||
										(meeting as CallRecording).start_time?.toLocaleString()
									}
									isPreviousMeeting={type === "ended"}
									link={
										type === "recording"
											? (meeting as CallRecording).url
											: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
													(meeting as Call).id
											  }`
									}
									buttonIcon1={
										type === "recording" ? "/icons/play.svg" : undefined
									}
									buttonText={type === "recording" ? "Play" : "Start"}
									handleClick={
										type === "recording"
											? () => router.push(`${(meeting as CallRecording).url}`)
											: () => router.push(`/meeting/${(meeting as Call).id}`)
									}
								/>
							))}
					</div>

					<div className="flex justify-between items-center flex-wrap gap-x-8 gap-y-2">
						<p className="text-sm font-medium">
							<span className="font-semibold text-base">{calls.length}</span>{" "}
							Calls was founded!
						</p>
						{calls.length > PAGE_SIZE && (
							<Pagination
								showControls
								showShadow
								total={Math.ceil(calls.length / PAGE_SIZE)}
								page={currentPage}
								onChange={setCurrentPage}
							/>
						)}
					</div>
				</div>
			) : (
				<h1>{noCallsMessage}</h1>
			)}
		</>
	);
}
