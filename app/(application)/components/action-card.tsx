import { cn } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface ActionCardProps {
	iconSrc: string;
	title: string;
	description: string;
	classNames?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
	iconSrc,
	title,
	description,
	classNames,
}) => {
	return (
		<div
			className={cn(
				"md:h-[260px] flex flex-col justify-between gap-6 p-4 bg-slate-100 dark:bg-gray-600 rounded-xl cursor-pointer overflow-hidden ",
				classNames,
			)}
		>
			<div className="flex-center glassmorphism p-2 rounded-xl size-12">
				<Image src={iconSrc} alt="icon" width={25} height={25} />
			</div>

			<div className="text-white">
				<p className="text-md md:text-lg lg:text-xl xl:text-2xl font-semibold capitalize">
					{title}
				</p>
				<p className="text-sm md:text-base text-[##ECF0FF]">{description}</p>
			</div>
		</div>
	);
};

export default ActionCard;
