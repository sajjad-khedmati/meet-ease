"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function getUser(emailAddress?: string) {
	const user = await currentUser();

	const { data } = await clerkClient.users.getUserList({
		emailAddress: emailAddress ? [emailAddress] : undefined,
		orderBy: "-created_at",
		limit: 5,
	});

	const result = data.filter((u) => u.id !== user?.id);

	if (data.length > 0)
		return {
			success: true,
			data: JSON.parse(JSON.stringify(result)),
		};

	return {
		success: true,
		data: [],
	};
}
