"use client";
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";

import { getUser } from "@/actions/users";

import { EmailAddress, User } from "@clerk/nextjs/server";

import {
	Badge,
	Button,
	CheckboxGroup,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Skeleton,
	useDisclosure,
} from "@nextui-org/react";

import UserItem from "./user-item";
import UserSelectedList from "./user-selected-list";
import { ScheduleMeetingInstance } from "../modals/schedule-meeting-modal";
import { useDebounceCallback } from "usehooks-ts";
import UserItemSkeleton from "./user-item-skeleton";
import { CopyCheck, CopyIcon, UserRoundXIcon, UserX } from "lucide-react";
import { toast } from "sonner";

interface UserListProps {
	values: ScheduleMeetingInstance;
	setValues: Dispatch<SetStateAction<ScheduleMeetingInstance>>;
}

// this main function uses in user-list components , recieve an emails array from user object and return an email from that user as string
export function getPrimaryEmail(emails: EmailAddress[] | undefined): string {
	if (!emails) return "";
	return emails?.flatMap((items) => items.emailAddress)[0];
}

export default function UsersList({ values, setValues }: UserListProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [groupSelected, setGroupSelected] = useState<string[]>(
		values.members?.map((member) => member.id),
	);

	const [users, setUsers] = useState<User[]>([]);

	const [emailAddress, setEmailAddress] = useState<string>("");
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		// after 1 second that user are not typing anything , search query is started
		const debounceFn = setTimeout(() => {
			startTransition(async () => {
				const users = await getUser(emailAddress);
				setUsers(users.data);
			});
		}, 1000);

		return () => clearInterval(debounceFn);
	}, [emailAddress]);

	return (
		<>
			<Button onPress={onOpen}>Select Users</Button>
			<Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onclose) => (
						<>
							<ModalHeader>Users list</ModalHeader>
							<ModalBody className="pb-6">
								<Input
									label="Email Address"
									description="Enter an email of the user you want to meet"
									value={emailAddress}
									onChange={(e) => setEmailAddress(e.target.value)}
								/>

								{values.members.length > 0 && (
									<UserSelectedList values={values} />
								)}

								{isPending ? (
									emailAddress === "" ? (
										Array.from(Array(3).keys()).map((key) => (
											<UserItemSkeleton key={key} />
										))
									) : (
										<UserItemSkeleton />
									)
								) : users.length === 0 ? (
									<div className="space-y-5">
										<div className="space-y-1 flex gap-4 items-center">
											<UserRoundXIcon size={30} />
											<div className="flex flex-1 flex-col justify-between gap-1">
												<h3 className="flex-1 text-xs">
													Sorry, it seems that the user you are looking for has
													not joined us yet
												</h3>
												<p className="text-xs text-gray-400">
													Share the link below and enjoy meet-ease
												</p>
											</div>
										</div>

										<Button
											startContent={<CopyIcon size={20} />}
											color="success"
											variant="faded"
											className="w-full"
											onClick={() => {
												navigator.clipboard.writeText(
													process.env.NEXT_PUBLIC_BASE_URL!,
												);

												toast.success("Link Copied!", {
													position: "bottom-right",
													description:
														"You can share this link with friends to join us",
													icon: <CopyCheck size={20} />,
												});
											}}
										>
											Copy Link
										</Button>
									</div>
								) : (
									<section className="space-y-4 mt-2">
										{users.length > 1 && (
											<div className="space-y-1">
												<h2 className="text-sm font-semibold">
													Last 5 users that joined us
												</h2>
												<p className="text-xs text-gray-400">
													If you are looking for someone else, please enter
													their email address
												</p>
											</div>
										)}
										<CheckboxGroup
											value={groupSelected}
											onChange={setGroupSelected}
										>
											<div className="flex flex-col gap-4">
												{users.map((user) => (
													<UserItem
														key={user.id}
														user={user}
														values={values}
														setValues={setValues}
													/>
												))}
											</div>
										</CheckboxGroup>
									</section>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
