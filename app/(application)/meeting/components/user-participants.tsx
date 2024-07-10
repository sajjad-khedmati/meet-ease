"use client";

import { Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface UserParticipantsProps {
	setShowParticipants: Dispatch<SetStateAction<boolean>>;
}

export default function UserParticipants({
	setShowParticipants,
}: UserParticipantsProps) {
	return (
		<button onClick={() => setShowParticipants((prev) => !prev)}>
			<div className="size-[36px] flex-center cursor-pointer rounded-full bg-[#19232d] hover:bg-[#323B44]  ">
				<Users size={18} className="text-white" />
			</div>
		</button>
	);
}
