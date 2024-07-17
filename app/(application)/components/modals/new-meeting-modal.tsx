"use client";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MeetOptions } from "../meeting-options";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewMeetingModal {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

export default function NewMeetingModal({
	isOpen,
	setOption,
}: NewMeetingModal) {
	const router = useRouter();
	const { user } = useUser();
	const client = useStreamVideoClient();

	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});

	const startMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast.error("Please select a date and time");
				return;
			}

			const id = crypto.randomUUID();

			const call = client.call("default", id);

			if (!call) throw new Error("Faild to create call");

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || "Instant meeting";

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}

			toast.success("Meeting Created");
		} catch (error) {
			toast.error("Failed to create meeting");
		}
	};
	return (
		<Modal
			backdrop="blur"
			size="lg"
			placement="center"
			isOpen={isOpen}
			onOpenChange={() => setOption(MeetOptions.none)}
		>
			<ModalContent>
				<ModalHeader>Start An Instant Meeting</ModalHeader>
				<ModalBody className="pb-6">
					<Button color="primary" onClick={startMeeting}>
						Start Meeting
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
