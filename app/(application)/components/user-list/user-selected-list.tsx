import { ScheduleMeetingInstance } from "../modals/schedule-meeting-modal";
import { getPrimaryEmail } from ".";

interface UserSelectedListProps {
	values: ScheduleMeetingInstance;
}

export default function UserSelectedList({ values }: UserSelectedListProps) {
	return (
		<div className="flex items-center flex-wrap gap-1">
			{values.members?.map((member) => (
				<p key={member.id} className="text-xs p-1">
					{getPrimaryEmail(member.emailAddresses)}
				</p>
			))}
		</div>
	);
}
