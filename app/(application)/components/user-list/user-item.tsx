import { User } from "@clerk/nextjs/server";
import React, { Dispatch, SetStateAction } from "react";
import { ScheduleMeetingInstance } from "../modals/schedule-meeting-modal";
import { getPrimaryEmail } from ".";

interface UserItemProps {
	user: User;
	values: ScheduleMeetingInstance;
	setValues: Dispatch<SetStateAction<ScheduleMeetingInstance>>;
}

export default function UserItem({ user, values, setValues }: UserItemProps) {
	return (
		<p
			key={user.id}
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
			{getPrimaryEmail(user.emailAddresses)}
		</p>
	);
}
