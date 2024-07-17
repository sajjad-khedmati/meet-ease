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

interface ScheduleMeetingModalProps {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

export default function ScheduleMeetingModal({
	isOpen,
	setOption,
}: ScheduleMeetingModalProps) {
	const [values, setValues] = useState({
		dateTime: now(getLocalTimeZone()),
		description: "Schedule meeting instant",
		link: "",
	});

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
					<Button color="primary">Schedule</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
