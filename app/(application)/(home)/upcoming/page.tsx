import React from "react";
import CallList from "../components/call-list";

export default function Upcoming() {
	return (
		<div className="flex size-full flex-col gap-4 custom_container overflow-x-hidden">
			<CallList type="upcoming" />
		</div>
	);
}
