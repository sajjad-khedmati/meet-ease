"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ActionCard from "./action-card";
import NewMeetingModal from "./modals/new-meeting-modal";
import ScheduleMeetingModal from "./modals/schedule-meeting-modal";
import JoinMeetingModal from "./modals/join-meeting-modal";

export enum MeetOptions {
	newMeeting = "newMeeting",
	joinMeeting = "joinMeeting",
	scheduleMeeting = "scheduleMeeting",
	none = "none",
}

export default function MeetingOptions() {
	const router = useRouter();
	const [option, setOption] = useState<MeetOptions>(MeetOptions.none);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
			<ActionCard
				iconSrc="/icons/add-personal.svg"
				title="new meeting"
				description="Setup a new recording"
				classNames="bg-gradient-to-b from-orange-600 to-orange-500"
				onClick={() => setOption(MeetOptions.newMeeting)}
			/>

			<ActionCard
				iconSrc="/icons/join-meeting.svg"
				title="join meeting"
				description="Via invitation link"
				classNames="bg-gradient-to-b from-blue-600 to-blue-500"
				onClick={() => setOption(MeetOptions.joinMeeting)}
			/>

			<ActionCard
				iconSrc="/icons/schedule.svg"
				title="schedule meeting"
				description="Plan your meeting"
				classNames="bg-[#830EF9] dark:bg-[#830EF9]"
				onClick={() => setOption(MeetOptions.scheduleMeeting)}
			/>

			<ActionCard
				iconSrc="/icons/video.svg"
				title="view recording"
				description="Meeting recordings"
				classNames="bg-[#F9A90E] dark:bg-[#F9A90E]"
				onClick={() => router.push("/recordings")}
			/>

			<NewMeetingModal
				isOpen={option === MeetOptions.newMeeting}
				setOption={setOption}
			/>

			<ScheduleMeetingModal
				isOpen={option === MeetOptions.scheduleMeeting}
				setOption={setOption}
			/>

			<JoinMeetingModal
				isOpen={option === MeetOptions.joinMeeting}
				setOption={setOption}
			/>
		</div>
	);
}
