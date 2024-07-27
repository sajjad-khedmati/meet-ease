"use client";

import { Button } from "@nextui-org/react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div>
			{error.message}
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
