"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MeetOptions } from "../meeting-options";
import {
	Button,
	DatePicker,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
} from "@nextui-org/react";
import {
	CalendarDate,
	getLocalTimeZone,
	now,
	parseDate,
	parseDateTime,
	parseDuration,
	today,
} from "@internationalized/date";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

interface ScheduleMeetingModalProps {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

export default function ScheduleMeetingModal({
	isOpen,
	setOption,
}: ScheduleMeetingModalProps) {
	const { user } = useUser();
	const client = useStreamVideoClient();

	const [values, setValues] = useState({
		dateTime: now(getLocalTimeZone()),
		description: "Schedule meeting instant",
		link: "",
	});

	const [callDetails, setCallDetails] = useState<Call>();
	const scheduleMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast.error("Please select a date and time");
				return;
			}

			const id = crypto.randomUUID();

			const call = client.call("default", id);

			if (!call) throw new Error("Faild to create call");

			const startsAt = new Date(values.dateTime.toDate()).toISOString();
			const description = values.description;

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			toast.success("Meeting Successfully Scheduled");
		} catch (error) {
			if (error instanceof Error) return toast.error(error.message);
			toast.error("Failed to schedule instant meeting");
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
				<ModalHeader>Schedule An Instant Meeting</ModalHeader>
				<ModalBody className="pb-6">
					<DatePicker
						label="Schedule Date Time"
						hideTimeZone
						showMonthAndYearPickers
						value={values.dateTime}
						minValue={now(getLocalTimeZone())}
						onChange={(value) =>
							setValues({
								dateTime: value,
								description: values.description,
								link: values.link,
							})
						}
					/>

					<Textarea
						label="Meeting Description"
						placeholder="Enter your description here"
						value={values.description}
						isRequired
						errorMessage="Description is required"
						isInvalid={values.description.length === 0}
						onValueChange={(value) =>
							setValues({
								description: value,
								dateTime: values.dateTime,
								link: values.link,
							})
						}
					/>
				</ModalBody>
				<ModalFooter>
					<Button onClick={() => setOption(MeetOptions.none)}>Cancle</Button>
					<Button onClick={scheduleMeeting} color="primary">
						Schedule
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
