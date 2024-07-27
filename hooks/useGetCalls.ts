import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { isAfter } from "date-fns";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
	const [calls, setCalls] = useState<Call[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const client = useStreamVideoClient();
	const { user } = useUser();

	useEffect(() => {
		const getCalls = async () => {
			if (!client || !user?.id) return;

			setIsLoading(true);

			try {
				const { calls } = await client.queryCalls({
					sort: [{ field: "starts_at", direction: -1 }],
					watch: true,
					filter_conditions: {
						starts_at: { $exists: true },
						$or: [
							{
								created_by_user_id: user.id,
							},
							{
								members: { $in: [user.id] },
							},
						],
					},
				});

				setCalls(calls);
			} catch (error) {
				if (error instanceof Error) throw new Error(error.message);
				throw new Error("Somthing was wrong when we trying to fetch calls");
			} finally {
				setIsLoading(false);
			}
		};

		getCalls();
	}, [client, user?.id]);

	const now = new Date();

	const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
		return (startsAt && new Date(startsAt) < now) || !!endedAt;
	});

	const upcomingCalls = calls
		.filter(({ state: { startsAt } }: Call) => {
			return startsAt && new Date(startsAt) > now;
		})
		.sort((a: Call, b: Call) =>
			isAfter(a.state.startsAt!, b.state.startsAt!) ? 1 : -1,
		);

	return {
		endedCalls,
		upcomingCalls,
		recordingCalls: calls,
		isLoading,
	};
};
