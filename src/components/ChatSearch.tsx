import axios, { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { UserType } from "../utils/authReducer";
import { useUserGlobalStateContext } from "../hooks/useUserGlobalState";
import { useCookies } from "react-cookie";
import ProfileImage from "./ProfileImage";
import { useAuthContext } from "../hooks/useAuthContext";
import { BACKEND_URL } from "../utils/config";
import { Oval } from "react-loader-spinner";

type FoundUserCardProps = {
	user: UserType;
	className: string;
	closeCard: () => void;
};

const ChatSearch = () => {
	const [cookies] = useCookies(["authToken"]);
	const { authState } = useAuthContext();
	const [inputValue, inputValueSet] = useState("");
	const [foundUser, foundUserSet] = useState<UserType>();
	const [errorMessage, errorMessageSet] = useState("");
	const [loading, loadingSet] = useState(false);

	const closeCard = () => {
		foundUserSet(undefined);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue === authState.user?.email) {
			inputValueSet("");
			errorMessageSet("Use options to see your own profile");
			setTimeout(() => {
				errorMessageSet("");
			}, 2500);
			return;
		}
		try {
			loadingSet(true);
			const response = await axios.get(
				`${BACKEND_URL}/user/find/${inputValue}`,
				{
					headers: {
						Authorization: `Bearer ${cookies.authToken}`,
					},
				}
			);
			foundUserSet(response.data);
			loadingSet(false);
			console.log(response.data);
		} catch (err) {
			loadingSet(false);
			if (err instanceof AxiosError) {
				errorMessageSet(err.response?.data.message as string);
				setTimeout(() => {
					errorMessageSet("");
				}, 3000);
			} else {
				console.error(err);
			}
		}
		inputValueSet("");
	};
	return (
		<div className="flex flex-col">
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					onChange={(e) => {
						inputValueSet(e.target.value);
					}}
					placeholder="Search chats..."
					value={inputValue}
					className="px-2 py-1.5 border-b-2 border-gray-600 bg-inherit outline-none hover:bg-slate-600 focus-within:bg-slate-600 w-full rounded transition-colors duration-200 mb-2"
				/>
			</form>
			{loading && (
				<div className="flex items-center justify-center">
					<Oval
						width="25"
						height="25"
						strokeWidth="7"
						color="rgb(54,98,227)"
						secondaryColor="rbg(18,24,38)"
					/>
				</div>
			)}
			{foundUser && (
				<FoundUserCard
					user={foundUser}
					className=""
					closeCard={closeCard}
				/>
			)}
			{errorMessage && (
				<div
					className={`px-3 py-1 rounded-md bg-red-950 text-[calc(12px)] text-red-500 flex justify-center`}
				>
					<span>{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

const FoundUserCard = ({ user, className, closeCard }: FoundUserCardProps) => {
	const { globalDispatch } = useUserGlobalStateContext();
	return (
		<div
			className={`p-2 border border-slate-600 rounded-md ${className} flex items-center justify-between cursor-pointer hover:bg-slate-700`}
			onClick={() => {
				globalDispatch({
					type: "SELECT_USER",
					payload: { user: user },
				});
				closeCard();
			}}
		>
			<div className="flex gap-5 items-center">
				<ProfileImage src={user.avatarImage as number} />
				<div className="flex flex-col">
					<div className="text-lg hover:underline">
						{user.userName}
					</div>
					<div className="text-sm hover:underline">{user.email}</div>
				</div>
			</div>
			<button
				className="px-2 py-2 rounded-full hover:bg-slate-600"
				onClick={() => {
					closeCard();
				}}
			>
				<IoMdClose />
			</button>
		</div>
	);
};

export default ChatSearch;
