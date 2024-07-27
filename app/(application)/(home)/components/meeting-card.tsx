"use client";

import Image from "next/image";

import {
	Avatar,
	AvatarGroup,
	Badge,
	Button,
	cn,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton,
} from "@nextui-org/react";
import { toast } from "sonner";
import { avatarImages } from "@/constants/avatar-images";
import { MemberResponse } from "@stream-io/video-react-sdk";
import { useEffect, useState, useTransition } from "react";
import { getPrimaryEmail } from "../../components/user-list";
import { formatDistanceToNowStrict } from "date-fns";
import useMembers from "@/hooks/useMember";

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
	const { memberItems, isPending } = useMembers(members);

	return (
		<section className="flex min-h-[258px] w-full flex-col justify-between gap-4 rounded-[14px] dark:bg-gray-800/60 bg-gray-100 px-5 py-8 xl:max-w-[568px]">
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
						<h1 className="text-lg md:text-xl font-semibold">{title}</h1>
						<p className="text-sm font-normal">{date}</p>
					</div>
				</div>
			</article>
			<article
				className={cn(
					"flex flex-col md:flex-row gap-y-4 gap-x-2 md:justify-center relative",
					{},
				)}
			>
				<div className="w-full">
					{isPending ? (
						<div className="relative flex w-full">
							{Array.from(new Array(3)).map((_, index) => (
								<Skeleton
									key={index}
									className={cn("size-10 rounded-full", {
										absolute: index > 0,
									})}
									style={{ top: 0, left: index * 28 }}
								/>
							))}
						</div>
					) : memberItems.length > 0 ? (
						<AvatarGroup isBordered max={3}>
							{memberItems.slice(0, 3).map((member) => (
								<Popover
									showArrow
									offset={10}
									placement="top"
									backdrop="opaque"
									key={member.user_id}
								>
									<PopoverTrigger>
										<Avatar
											isBordered
											color={member.user.online ? "success" : "default"}
											src={member.user.image as string}
										/>
									</PopoverTrigger>
									<PopoverContent className="px-6 py-3">
										<div className="flex flex-col gap-4">
											<div className="flex items-center gap-4">
												<Avatar src={member.user.image as string} />
												<aside>
													<h3>{member.user.name}</h3>
													<span className="text-sm text-gray-500">
														{member.user.role}
													</span>
												</aside>
											</div>

											<p className="text-sm">
												The last activity was{" "}
												{formatDistanceToNowStrict(
													member.user.last_active as string,
												)}{" "}
												ago
											</p>

											<p>{}</p>
										</div>
									</PopoverContent>
								</Popover>
							))}
						</AvatarGroup>
					) : (
						<Button
							disabled
							color="success"
							variant="faded"
							className="px-4 py-2 text-xs font-semibold w-max rounded-xl"
						>
							Public meeting
						</Button>
					)}
				</div>
				{!isPreviousMeeting && (
					<div className="flex items-center gap-2">
						<Button
							color="primary"
							className="px-6 flex-1 md:flex-initial"
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
