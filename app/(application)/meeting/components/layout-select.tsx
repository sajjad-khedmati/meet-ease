"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CallLayoutType } from "./meeting-room";
import { LayoutGrid, LayoutGridIcon, LayoutList } from "lucide-react";

interface LayoutSelectProps {
	setLayout: Dispatch<SetStateAction<CallLayoutType>>;
}

export default function LayoutSelect({ setLayout }: LayoutSelectProps) {
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
		new Set(["speaker-left"]),
	);
	return (
		<Dropdown backdrop="opaque">
			<DropdownTrigger className="size-[36px]">
				<div className="cursor-pointer bg-[#19232D] hover:bg-[#323B44] size-[36px] rounded-full flex-center">
					<LayoutList size={18} />
				</div>
			</DropdownTrigger>
			<DropdownMenu
				onAction={(key) => setLayout(key as CallLayoutType)}
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedKeys}
				onSelectionChange={setSelectedKeys as any}
			>
				<DropdownItem key={"grid"}>Grid Layout</DropdownItem>
				<DropdownItem key={"speaker-right"}>Speaker Right</DropdownItem>
				<DropdownItem key={"speaker-left"}>Speaker Left</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
