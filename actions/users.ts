"use server";
import { clerkClient, EmailAddress } from "@clerk/nextjs/server";

export async function getUsers(emailAddress?: string) {
	const { data } = await clerkClient.users.getUserList({
		emailAddress: emailAddress ? [emailAddress] : undefined,
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
