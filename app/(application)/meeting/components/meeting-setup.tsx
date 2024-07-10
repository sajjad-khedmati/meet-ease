"use client";
import { Button, Checkbox } from "@nextui-org/react";
import {
	CallControls,
	DeviceSelector,
	DeviceSelectorAudioInput,
	DeviceSelectorAudioOutput,
	DeviceSelectorVideo,
	DeviceSettings,
	useCall,
	VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface MeetingSetupProps {
	setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
}

export default function MeetingSetup({
	setIsSetupComplete,
}: MeetingSetupProps) {
	const [isMicCamToggleOn, setIsMicCamToggleOn] = useState<boolean>(false);
	const call = useCall();

	if (!call) throw new Error("Call instance is needed to start a connection");

	useEffect(() => {
		if (isMicCamToggleOn) {
			call?.camera.disable();
			call?.microphone.disable();
		} else {
			call?.camera.enable();
			call?.microphone.enable();
		}
	}, [isMicCamToggleOn, call?.microphone, call?.camera]);

	return (
		<div className="w-screen h-screen flex flex-col gap-4 justify-center items-center px-4 py-2">
			<h1 className="text-xl font-semibold">Setup</h1>

			<VideoPreview
				className="w-full h-full"
				NoCameraPreview={CustomNoCameraPreview}
				DisabledVideoPreview={CustomDisabledVideoPreview}
			/>

			<Checkbox
				isSelected={isMicCamToggleOn}
				onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
				className="mt-2"
			>
				Join with mic and camera off
			</Checkbox>

			<DeviceSettings />

			<Button
				onClick={() => {
					call
						.join()
						.then(() => {
							toast.success("You are joined to meet");
						})
						.catch((err) => {
							console.log(err);
							toast.error("Somthing was wrong");
						});
					setIsSetupComplete(true);
				}}
				size="md"
				color="success"
				className="sm:w-[350px] w-full"
			>
				Join Meeting
			</Button>
		</div>
	);
}

const CustomDisabledVideoPreview = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<p className="text-sm font-medium">Video is disabled</p>
		</div>
	);
};

const CustomNoCameraPreview = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<p className="text-sm font-medium">Camera was not founded</p>
		</div>
	);
};
