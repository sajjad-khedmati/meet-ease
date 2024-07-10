"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { DoorClosedIcon } from "lucide-react";

import { useRouter } from "next/navigation";

const EndCall = () => {
	const call = useCall();
	const router = useRouter();

	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

	if (!call)
		throw new Error(
			"useStreamCall must be used within a StreamCall component.",
		);

	const { useLocalParticipant } = useCallStateHooks();
	const localParticipant = useLocalParticipant();

	const isMeetingOwner =
		localParticipant &&
		call.state.createdBy &&
		localParticipant.userId === call.state.createdBy.id;

	if (!isMeetingOwner) return null;

	const endCall = async () => {
		await call.endCall();
		router.push("/");
	};

	return (
		<>
			<Button
				size="sm"
				color="danger"
				onPress={onOpen}
				startContent={<DoorClosedIcon size={18} />}
				className="rounded-xl"
			>
				End call for everyone
			</Button>
			<Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Are you sure ?</ModalHeader>
							<ModalBody>
								The call was ended for everyone because you are creator of this
								room
								<br />
								are you sure to continue ?
							</ModalBody>
							<ModalFooter>
								<Button variant="faded" onPress={onClose}>
									Cancle
								</Button>
								<Button color="danger" onPress={endCall}>
									End Call
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default EndCall;
