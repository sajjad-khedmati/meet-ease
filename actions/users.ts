"use server";
import { clerkClient } from "@clerk/nextjs/server";

export async function getUser(emailAddress?: string) {
	const { data } = await clerkClient.users.getUserList({
		emailAddress: emailAddress ? [emailAddress] : undefined,
		orderBy: "+created_at",
	});

	if (data.length > 0)
		return {
			success: true,
			data: JSON.parse(JSON.stringify(data)),
		};

	return {
		success: true,
		data: [],
	};
}
