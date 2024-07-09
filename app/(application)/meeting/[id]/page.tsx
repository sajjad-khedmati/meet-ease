"use client";

import { useParams } from "next/navigation";

export default function MeetingRoom() {
	const { id } = useParams();
	return <div>MeetingRoom - {id}</div>;
}
