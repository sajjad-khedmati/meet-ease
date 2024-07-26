"use client";

import Image from "next/image";

import { Button, cn } from "@nextui-org/react";
import { toast } from "sonner";
import { avatarImages } from "@/constants/avatar-images";
import { MemberResponse } from "@stream-io/video-react-sdk";
import { useEffect, useState, useTransition } from "react";

interface MeetingCardProps {
	title: string;
	date: string;
	icon: string;
	isPreviousMeeting?: boolean;
	buttonIcon1?: string;
	buttonText?: string;
	handleClick: () => void;
	link: string;
	members?: Promise<MemberResponse[]> | [];
}

const MeetingCard = ({
	icon,
	title,
	date,
	isPreviousMeeting,
	buttonIcon1,
	handleClick,
	link,
	buttonText,
	members = [],
}: MeetingCardProps) => {
	const [isPending, startTransition] = useTransition();
	const [memberItems, setMemberItems] = useState<MemberResponse[] | []>([]);

	useEffect(() => {
		startTransition(async () => {
			const res = await members;
			console.log(res);

			if (res.length > 0) setMemberItems(res);
		});
	}, [members]);

	return (
		<section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] dark:bg-gray-800 bg-gray-100 px-5 py-8 xl:max-w-[568px]">
			<article className="flex flex-col gap-5">
				<Image
					src={icon}
					alt="upcoming"
					width={28}
					height={28}
					className="dark:invert-0 invert"
				/>
				<div className="flex justify-between">
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">{title}</h1>
						<p className="text-base font-normal">{date}</p>
					</div>
				</div>
			</article>
			<article className={cn("flex justify-center relative", {})}>
				<div className="relative flex w-full max-sm:hidden">
					{!isPending && memberItems.length > 0 ? (
						memberItems
							.slice(0, 3)
							.map((member, index) => (
								<Image
									key={member.user_id}
									src={member.user.image as string}
									alt="attendees"
									width={40}
									height={40}
									className={cn("rounded-full", { absolute: index > 0 })}
									style={{ top: 0, left: index * 28 }}
								/>
							))
					) : (
						<p>Public meeting</p>
					)}

					{!isPending && memberItems.length >= 4 && (
						<div className="flex-center absolute left-[136px] size-10 rounded-full border-2 bg-gray-200 border-gray-300 dark:border-gray-600 dark:bg-gray-700">
							+{memberItems.length - 3}
						</div>
					)}
				</div>
				{!isPreviousMeeting && (
					<div className="flex gap-2">
						<Button
							color="primary"
							className="px-6"
							startContent={
								buttonIcon1 && (
									<Image
										src={buttonIcon1}
										alt="feature"
										width={20}
										height={20}
									/>
								)
							}
							onClick={handleClick}
						>
							{buttonText}
						</Button>
						<Button
							color="secondary"
							onClick={() => {
								navigator.clipboard.writeText(link);
								toast.success("Link Copied");
							}}
							className="px-6"
						>
							<Image
								src="/icons/copy.svg"
								alt="feature"
								width={20}
								height={20}
							/>
							&nbsp; Copy Link
						</Button>
					</div>
				)}
			</article>
		</section>
	);
};

export default MeetingCard;
