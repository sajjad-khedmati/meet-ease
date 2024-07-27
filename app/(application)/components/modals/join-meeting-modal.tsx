"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { MeetOptions } from "../meeting-options";
import { useRouter } from "next/navigation";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@nextui-org/react";
import { Link2Icon } from "lucide-react";

interface JoinMeetingModalProps {
	isOpen: boolean;
	setOption: Dispatch<SetStateAction<MeetOptions>>;
}

export default function JoinMeetingModal({
	isOpen,
	setOption,
}: JoinMeetingModalProps) {
	const router = useRouter();

	const [joinLink, setJoinLink] = useState<string>("");

	return (
		<Modal
			backdrop="blur"
			size="lg"
			placement="center"
			isOpen={isOpen}
			onOpenChange={() => setOption(MeetOptions.none)}
		>
			<ModalContent>
				<ModalHeader>Join To Instance Meeting</ModalHeader>
				<ModalBody className="pb-6">
					<Input
						startContent={<Link2Icon size={16} />}
						label="Meeting link"
						value={joinLink}
						onChange={(e) => setJoinLink(e.target.value)}
					/>
					<Button
						disabled={joinLink.trim() === ""}
						color="primary"
						className="disabled:bg-blue-700/60"
						onClick={() => router.push(joinLink)}
					>
						Join now
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
