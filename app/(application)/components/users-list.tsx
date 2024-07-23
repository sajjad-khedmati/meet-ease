"use client";
import { getUsers } from "@/actions/users";
import { clerkClient, EmailAddress, User } from "@clerk/nextjs/server";
import {
	Badge,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";
import { ScheduleMeetingInstance } from "./modals/schedule-meeting-modal";
interface UserListProps {
	values: ScheduleMeetingInstance;
	setValues: Dispatch<SetStateAction<ScheduleMeetingInstance>>;
}

function getPrimaryEmail(emails: EmailAddress[]): string {
	return emails.flatMap((items) => items.emailAddress)[0];
}

export default function UsersList({ values, setValues }: UserListProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<Error>();
	const [emailAddress, setEmailAddress] = useState<string>("");
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			const users = await getUsers(emailAddress);
			setUsers(users.data);
		});
	}, [emailAddress]);

	return (
		<>
			<Button onPress={onOpen}>Users</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onclose) => (
						<>
							<ModalHeader>Users list</ModalHeader>
							<ModalBody>
								<Input
									label="Email Address"
									value={emailAddress}
									onChange={(e) => setEmailAddress(e.target.value)}
								/>

								{values.members.length > 0 && (
									<div className="flex items-center flex-wrap gap-1">
										{values.members?.map((member) => (
											<p key={member.user_id} className="text-xs p-1">
												{getPrimaryEmail(
													users.find((user) => user.id === member.user_id)
														?.emailAddresses!,
												)}
											</p>
										))}
									</div>
								)}

								{isPending ? (
									<p>loading...</p>
								) : (
									users.map((user) => (
										<p
											key={user.id}
											onClick={() => {
												const membersTemp = values.members;

												// Toggle selected users
												const index = values.members.findIndex(
													(item) => item.user_id === user.id,
												);

												if (index === -1) {
													membersTemp?.push({
														user_id: user.id,
													});
												} else {
													membersTemp.splice(index, 1);
												}
												setValues({ ...values, members: membersTemp });
											}}
										>
											{getPrimaryEmail(user.emailAddresses)}
										</p>
									))
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
