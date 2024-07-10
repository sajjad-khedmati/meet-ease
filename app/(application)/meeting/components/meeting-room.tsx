"use client";
import { useState } from "react";
import {
	CallControls,
	CallParticipantsList,
	CallStatsButton,
	CallingState,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { cn } from "@nextui-org/react";
import LayoutSelect from "./layout-select";
import UserParticipants from "./user-participants";
import EndCall from "./end-call";

export type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
	const router = useRouter();
	const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
	const [showParticipants, setShowParticipants] = useState(false);

	const { useCallCallingState } = useCallStateHooks();
	const callingState = useCallCallingState();
	if (callingState !== CallingState.JOINED) return <Loader />;

	const CallLayout = () => {
		switch (layout) {
			case "grid":
				return <PaginatedGridLayout />;
			case "speaker-right":
				return <SpeakerLayout participantsBarPosition="left" />;
			default:
				return <SpeakerLayout participantsBarPosition="right" />;
		}
	};

	return (
		<section className="relative h-screen w-full overflow-hidden pt-4 text-white">
			<div className="relative  size-full flex-center flex-wrap">
				<div className=" flex size-full max-w-[1000px] items-center">
					<CallLayout />
				</div>
				<div
					className={cn("h-[calc(100vh-86px)] hidden ml-2", {
						"show-block": showParticipants,
					})}
				>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
			</div>
			{/* video layout and call controls */}
			<div className="fixed bottom-2 md:bottom-0 flex w-full items-center justify-center gap-2 flex-wrap px-2">
				<CallControls onLeave={() => router.push(`/`)} />
				<LayoutSelect setLayout={setLayout} />
				<CallStatsButton />
				<UserParticipants setShowParticipants={setShowParticipants} />
				<EndCall />
			</div>
		</section>
	);
};

export default MeetingRoom;
