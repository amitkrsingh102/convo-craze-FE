import { useAuthContext } from "../hooks/useAuthContext";
import { useUserGlobalStateContext } from "../hooks/useUserGlobalState";
import { MessageType, UserType } from "../utils/authReducer";
import { compareTimeStrings, convertToTime } from "../utils/timeEval";
import ProfileImage from "./ProfileImage";

type ProfileProps = {
	user: UserType;
	messageStatus?: boolean;
};
const Profiles = ({ messageStatus = false, user }: ProfileProps) => {
	const { authState } = useAuthContext();
	const { globalDispatch } = useUserGlobalStateContext();
	const textColor = messageStatus ? "text-slate-400" : "text-slate-50";
	const msgArray =
		authState.user &&
		[
			...(authState.user.receivedMessages?.filter(
				(f) => f.sender?.email === user.email
			) as MessageType[]),
			...(authState.user.sentMessages?.filter(
				(f) => f.receiver?.email === user.email
			) as MessageType[]),
		].sort((a, b) => compareTimeStrings(b.sendAt, a.sendAt));
	return (
		<div
			className={`border-b border-gray-700 px-1.5 py-3 flex items-center cursor-pointer gap-2 ${textColor} hover:bg-gray-700 transition-color duration-200 rounded-sm`}
			onClick={() => {
				globalDispatch({
					type: "SELECT_USER",
					payload: { user: user },
				});
			}}
		>
			<ProfileImage src={user.avatarImage as number} large={false} />
			<div className=" w-3/4 flex justify-between items-center gap-3">
				<span className="p-1 overflow-hidden text-clip whitespace-nowrap flex flex-col">
					<span>{user.userName}</span>
					<span
						className={`text-sm text-slate-400 ${
							msgArray?.[0].receiver?.email === user.email
								? ""
								: "font-bold text-slate-300"
						}`}
					>
						{user ? msgArray?.[0].text : "unknown"}
					</span>
				</span>
				<span className="-ml-2 -mr-8 text-slate-400 text-[calc(8px)]">
					{user
						? convertToTime(msgArray?.[0].sendAt as string)
								.split("2023-")
								.join("")
						: "unknown"}
				</span>
			</div>
		</div>
	);
};

const Contacts = () => {
	const { authState } = useAuthContext();

	const generateContactArray = () => {
		const uniqueUsersMap = new Map<
			string,
			{ user: UserType; latestMessageTime: string }
		>();

		authState.user &&
			authState.user.receivedMessages?.forEach((message) => {
				uniqueUsersMap.set(message.sender?.email as string, {
					user: message.sender as UserType,
					latestMessageTime: message.sendAt as string,
				});
			});

		authState.user &&
			authState.user.sentMessages?.forEach((message) => {
				uniqueUsersMap.set(message.receiver?.email as string, {
					user: message.receiver as UserType,
					latestMessageTime: message.sendAt as string,
				});
			});

		return Array.from(uniqueUsersMap);
	};

	const contactsArray = generateContactArray().sort((a, b) =>
		compareTimeStrings(b[1].latestMessageTime, a[1].latestMessageTime)
	);

	return (
		<div className="h-[calc(100vh-50px)] overflow-y-scroll scroll-smooth">
			{contactsArray.map((contact, idx) => (
				<Profiles key={idx} user={contact[1].user} />
			))}
		</div>
	);
};

export default Contacts;
