"use client";
import { MemberRequest, MemberResponse } from "@stream-io/video-react-sdk";
import { useEffect, useState, startTransition, useTransition } from "react";

const rateLimit = <T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
): T => {
	let lastCall = 0;
	return ((...args: Parameters<T>): ReturnType<T> | undefined => {
		const now = Date.now();
		if (now - lastCall >= delay) {
			lastCall = now;
			return fn(...args);
		}
	}) as T;
};

const retryWithBackoff = async <T>(
	fn: () => Promise<T>,
	retries = 3,
	delay = 1000,
): Promise<T> => {
	try {
		return await fn();
	} catch (error: any) {
		if (retries > 0 && error.response && error.response.status === 429) {
			await new Promise((res) => setTimeout(res, delay));
			return retryWithBackoff(fn, retries - 1, delay * 2); // Exponential backoff
		} else {
			throw new Error(error);
		}
	}
};

const useMembers = (members: Promise<MemberResponse[]> | []) => {
	const [memberItems, setMemberItems] = useState<MemberResponse[] | []>([]);
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		const fetchMembers = async () => {
			const res = await members;
			if (res.length > 0) setMemberItems(res);
		};

		const limitedFetchMembers = rateLimit(fetchMembers, 100_000); // Adjust delay as needed

		startTransition(() => {
			retryWithBackoff(limitedFetchMembers)
				.then((res) => {
					// Optional: Handle successful response if needed
				})
				.catch((error) => {
					throw new Error(error);
				});
		});
	}, [members]);

	return { memberItems, isPending };
};

export default useMembers;
