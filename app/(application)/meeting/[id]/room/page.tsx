"use client";
import Loader from "@/app/components/loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import {
	CallControls,
	PaginatedGridLayout,
	StreamCall,
	StreamTheme,
} from "@stream-io/video-react-sdk";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Room() {
	const router = useRouter();
	const pathname = usePathname();
	const { isLoaded } = useUser();

	const id = pathname.split("/").slice(-2, -1)[0];
	const { call, isCallLoading } = useGetCallById(id);

	if (!isLoaded || isCallLoading) return <Loader />;

	if (!call) router.push(`/meeting/${id}`);

	return (
		<div className="w-screen h-screen">
			<StreamCall call={call}>
				<StreamTheme>
					<div className="w-screen h-screen">
						<PaginatedGridLayout />
					</div>
					<CallControls />
				</StreamTheme>
			</StreamCall>
		</div>
	);
}
