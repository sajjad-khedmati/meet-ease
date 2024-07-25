import React, { Dispatch, SetStateAction } from "react";
import { User } from "@clerk/nextjs/server";

import { ScheduleMeetingInstance } from "../modals/schedule-meeting-modal";
import { getPrimaryEmail } from ".";
import { Avatar, Checkbox } from "@nextui-org/react";
import { formatDistanceToNowStrict } from "date-fns";

interface UserItemProps {
	user: User;
	values: ScheduleMeetingInstance;
	setValues: Dispatch<SetStateAction<ScheduleMeetingInstance>>;
}

export default function UserItem({ user, values, setValues }: UserItemProps) {
	return (
		<Checkbox
			key={user.id}
			value={user.id}
			onClick={() => {
				const membersTemp = values.members;
				// Toggle selected users
				const index = values.members.findIndex((item) => item.id === user.id);

				if (index === -1) {
					membersTemp?.push(user);
				} else {
					membersTemp.splice(index, 1);
				}
				setValues({ ...values, members: membersTemp });
			}}
		>
			<div className="flex items-center flex-1 gap-4">
				<Avatar src={user.imageUrl} radius="md" isBordered size="sm" />
				<div className="flex flex-1 justify-between flex-col">
					<p className="text-sm font-medium">
						{getPrimaryEmail(user.emailAddresses)}
					</p>
					<p className="text-xs text-gray-400">
						Active{" "}
						{user.lastActiveAt && formatDistanceToNowStrict(user.lastActiveAt)}{" "}
						ago
					</p>
				</div>
			</div>
		</Checkbox>
	);
}
