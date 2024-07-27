"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Avatar, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { CopyCheck } from "lucide-react";

const Table = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="flex flex-col items-start gap-2 xl:flex-row">
			<h1 className="text-base font-medium text-sky-400 xl:min-w-32">
				{title}:
			</h1>
			<h1 className="truncate text-sm font-bold max-sm:max-w-[320px]">
				{description}
			</h1>
		</div>
	);
};

const PersonalRoom = () => {
	const router = useRouter();
	const { user } = useUser();
	const client = useStreamVideoClient();

	const meetingId = user?.id;

	const { call } = useGetCallById(meetingId!);

	const startRoom = async () => {
		if (!client || !user) return;

		const newCall = client.call("default", meetingId!);

		if (!call) {
			await newCall.getOrCreate({
				data: {
					starts_at: new Date().toISOString(),
				},
			});
		}

		router.push(`/meeting/${meetingId}?personal=true`);
	};

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

	return (
		<section className="flex size-full flex-col gap-6 custom_container overflow-x-hidden">
			<h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>

			<div className="flex gap-4">
				<Avatar src={user?.imageUrl} size="lg" radius="md" />
				<div className="flex-1 flex-col items-center gap-2">
					<p className="text-lg font-semibold">{user?.fullName}</p>
					<span className="text-sm text-gray-400">
						{user?.primaryEmailAddress?.emailAddress}
					</span>
				</div>
			</div>

			<p className="text-sm md:text-base">
				This is your personal meeting room informations, you can share your link
				with others to start new meeting
			</p>

			<div className="flex w-full flex-col gap-2 xl:max-w-[900px]">
				<Table title="Topic" description={`${user?.username}'s Meeting Room`} />
				<Table title="Meeting ID" description={meetingId!} />
				<Table title="Invite Link" description={meetingLink} />
			</div>
			<div className="flex gap-5">
				<Button color="primary" className="px-12" onClick={startRoom}>
					Start Meeting
				</Button>
				<Button
					onClick={async () => {
						try {
							await navigator.clipboard.writeText(meetingLink);
							toast.success("Link copied to clipboard");
						} catch (err) {
							toast.error("Failed to copy link");
						}
					}}
				>
					Copy Invitation
				</Button>
			</div>
		</section>
	);
};

export default PersonalRoom;
