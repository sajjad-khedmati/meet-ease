"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import MeetingSetup from "../components/meeting-setup";
import MeetingRoom from "../components/meeting-room";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/app/components/loader";
import { useUser } from "@clerk/nextjs";

export default function MeetingRoomPage() {
	const { id } = useParams();
	const { user, isLoaded } = useUser();
	const { call, isCallLoading } = useGetCallById(id);
	const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);

	if (!isLoaded || isCallLoading) return <Loader />;

	if (!call)
		return (
			<div className="w-screen h-screen flex-center">
				<p className="text-center text-3xl font-bold text-white">
					Call Not Found
				</p>
			</div>
		);

	return (
		<div className="w-screen h-screen overflow-hidden bg-background-primary">
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? (
						<MeetingSetup setIsSetupComplete={setIsSetupComplete} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</div>
	);
}
