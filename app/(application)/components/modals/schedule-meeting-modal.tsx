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
import { getLocalTimeZone, now } from "@internationalized/date";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { CheckCircle2Icon } from "lucide-react";

interface ScheduleMeetingModalProps {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

enum Steps {
	create = "create",
	copy = "copy",
}

export default function ScheduleMeetingModal({
	isOpen,
	setOption,
}: ScheduleMeetingModalProps) {
	const defaultValues = {
		dateTime: now(getLocalTimeZone()),
		description: "Schedule meeting instant",
		link: "",
	};
	const { user } = useUser();
	const client = useStreamVideoClient();

	const [values, setValues] = useState(defaultValues);

	const [callDetails, setCallDetails] = useState<Call>();
	const [step, setStep] = useState<Steps>(Steps.create);

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
			setValues(defaultValues);
			setStep(Steps.copy);

			toast.success("Meeting Successfully Scheduled");
		} catch (error) {
			if (error instanceof Error) return toast.error(error.message);
			setStep(Steps.create);
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
				{step === Steps.create ? (
					<ModalHeader>Schedule An Instant Meeting</ModalHeader>
				) : (
					<ModalHeader>Meeting Created</ModalHeader>
				)}
				{step === Steps.create ? (
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
				) : (
					<ModalBody className="pb-6">
						<div className="flex gap-2">
							<CheckCircle2Icon size={40} />
							<div className="space-y-1">
								<h2 className="text-sm font-medium">
									Your Meeting was scheduled and you can see it on the upcomings
								</h2>
								<p className="text-xs text-gray-300">
									you can share your meeting links with anothers
								</p>
							</div>
						</div>

						<Button color="primary" className="mt-2">
							Copy link
						</Button>
					</ModalBody>
				)}

				{step === Steps.create && (
					<ModalFooter>
						<Button onClick={() => setOption(MeetOptions.none)}>Cancle</Button>
						<Button onClick={scheduleMeeting} color="primary">
							Schedule
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
}
