"use client";
import { Spinner } from "@nextui-org/react";

export default function Loader() {
	return (
		<div className="size-full flex items-center justify-center">
			<Spinner size="lg" color="primary" />
		</div>
	);
}
