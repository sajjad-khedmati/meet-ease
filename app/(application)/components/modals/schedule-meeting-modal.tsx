"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { MeetOptions } from "../meeting-options";
import {
	Button,
	cn,
	DatePicker,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Switch,
	Textarea,
} from "@nextui-org/react";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";
import { useUser } from "@clerk/nextjs";
import {
	Call,
	MemberRequest,
	useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { CheckCircle2Icon, User2Icon, UserX2Icon } from "lucide-react";
import UsersList, { getPrimaryEmail } from "../user-list";
import { User } from "@clerk/nextjs/server";

interface ScheduleMeetingModalProps {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

export interface ScheduleMeetingInstance {
	dateTime: ZonedDateTime;
	description: string;
	link: string;
	members: User[];
	isPrivate: boolean;
}

enum Steps {
	create = "create",
	copy = "copy",
}

export default function ScheduleMeetingModal({
	isOpen,
	setOption,
}: ScheduleMeetingModalProps) {
	const defaultValues: ScheduleMeetingInstance = {
		dateTime: now(getLocalTimeZone()),
		description: "Schedule meeting instant",
		link: "",
		members: [],
		isPrivate: false,
	};
	const { user } = useUser();
	const client = useStreamVideoClient();

	const [values, setValues] = useState<ScheduleMeetingInstance>(defaultValues);

	const [callDetails, setCallDetails] = useState<Call>();
	const [step, setStep] = useState<Steps>(Steps.create);
	const [isInvalidDate, setIsInvalidDate] = useState<boolean>(false);

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

			let membersReq: MemberRequest[] = [];
			if (values.isPrivate)
				membersReq = values.members.map((member): MemberRequest => {
					return { user_id: member.id };
				});

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
					members: membersReq,
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
			onOpenChange={() => {
				setOption(MeetOptions.none);
				setStep(Steps.create);
				setValues(defaultValues);
			}}
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
							errorMessage={(value) => {
								if (value.isInvalid) {
									setIsInvalidDate(true);
									return "Please select an valid date and time";
								} else {
									setIsInvalidDate(false);
								}
							}}
							minValue={now(getLocalTimeZone())}
							onChange={(value) =>
								setValues({
									...values,
									dateTime: value,
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
									...values,
									description: value,
								})
							}
						/>

						<Switch
							isSelected={values.isPrivate}
							size="sm"
							startContent={<User2Icon size={32} />}
							endContent={<UserX2Icon size={32} />}
							onChange={(e) =>
								setValues({
									isPrivate: e.target.checked,
									dateTime: values.dateTime,
									description: values.description,
									link: values.link,
									members: values.members,
								})
							}
							classNames={{
								base: cn(
									"w-full flex w-full max-w-lg px-2 rounded-xl dark:bg-background-primary/50 bg-slate-100 border-slate-200 border-2 dark:border-background-primary py-4",
								),
							}}
						>
							<div className="flex flex-col flex-1 gap-1">
								<p className="text-sm">Private Meeting</p>
								<p className="text-tiny text-default-400">
									Start an instance meeting by choose some pepoles in private
									mode
								</p>
							</div>
						</Switch>

						{values.isPrivate && (
							<UsersList values={values} setValues={setValues} />
						)}

						{values.isPrivate ? (
							values.members.length > 0 ? (
								<div className="">
									<p className="mb-1 font-semibold">with</p>
									<div className="flex flex-wrap items-center text-xs font-semibold gap-1">
										<p className="py-2 px-4 bg-gray-800 rounded-xl flex items-center gap-2">
											<User2Icon size={18} />
											{getPrimaryEmail(values.members[0].emailAddresses)}
										</p>
										{values.members.length > 1 &&
											`and ${values.members.length - 1} others`}
									</div>
								</div>
							) : (
								<p className="text-rose-500 font-light text-xs">
									Please select at least one user
								</p>
							)
						) : null}
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
						<Button
							disabled={
								values.isPrivate
									? values.members.length === 0
										? true
										: isInvalidDate
									: isInvalidDate
							}
							onClick={scheduleMeeting}
							color="primary"
							className="disabled:bg-blue-900"
						>
							Schedule
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
}
