"use client";
import { getUser } from "@/actions/users";
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
	SetStateAction,
	useEffect,
	useState,
	useTransition,
} from "react";
import { ScheduleMeetingInstance } from "../modals/schedule-meeting-modal";
import UserItem from "./user-item";
interface UserListProps {
	values: ScheduleMeetingInstance;
	setValues: Dispatch<SetStateAction<ScheduleMeetingInstance>>;
}

export function getPrimaryEmail(emails: EmailAddress[]): string {
	return emails?.flatMap((items) => items.emailAddress)[0];
}

export default function UsersList({ values, setValues }: UserListProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<Error>();
	const [emailAddress, setEmailAddress] = useState<string>("");
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			const users = await getUser(emailAddress);
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
							<ModalBody className="pb-6">
								<Input
									label="Email Address"
									description="Enter an email of the user you want to meet"
									value={emailAddress}
									onChange={(e) => setEmailAddress(e.target.value)}
								/>

								{values.members.length > 0 && (
									<div className="flex items-center flex-wrap gap-1">
										{values.members?.map((member) => (
											<p key={member.id} className="text-xs p-1">
												{getPrimaryEmail(member.emailAddresses)}
											</p>
										))}
									</div>
								)}

								{isPending ? (
									<p>loading...</p>
								) : users.length === 0 ? (
									<p>User was not found!</p>
								) : (
									users.map((user) => (
										<UserItem
											key={user.id}
											user={user}
											values={values}
											setValues={setValues}
										/>
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
