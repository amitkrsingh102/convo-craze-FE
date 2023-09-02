import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserGlobalStateContext } from "../hooks/useUserGlobalState";
import { socket } from "../App";
import { useCookies } from "react-cookie";
import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { BACKEND_URL } from "../utils/config";
import { Oval } from "react-loader-spinner";

const MessageInput = () => {
	const [cookies] = useCookies(["authToken"]);
	const [messageText, messageTextSet] = useState("");
	const [openEmojiBar, openEmojiBarSet] = useState(false);
	const { authState } = useAuthContext();
	const { globalState } = useUserGlobalStateContext();
	const [loading, loadingSet] = useState(false);

	const onEmojiPick = (emojiObject: EmojiClickData) => {
		messageTextSet((prev) => prev + emojiObject.emoji);
		// openEmojiBarSet(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loadingSet(true);
		await axios.post(
			`${BACKEND_URL}/user/send`,
			{
				fromEmail: authState.user?.email,
				toEmail: globalState.selectedUser?.email,
				text: messageText,
			},
			{
				headers: {
					Authorization: `Bearer ${cookies.authToken}`,
				},
			}
		);
		loadingSet(false);
		messageTextSet("");
		// socket.emit("setup", authState.user);
	};
	useEffect(() => {
		socket.emit("setup", authState.user);
	});
	return (
		<form
			className="flex justify-between h-[calc(9vh+4px)] bg-slate-800 items-center p-3 gap-2"
			onSubmit={handleSubmit}
		>
			<div
				className="rounded-md hover:bg-slate-600 focus:bg-slate-800 transition-colors duration-200"
				onClick={() => openEmojiBarSet(!openEmojiBar)}
			>
				<div className="p-2.5 rounded-md hover:bg-slate-600 focus:bg-slate-800 transition-colors duration-200">
					<IoMdAdd
						style={{
							width: "22px",
							height: "22px",
							color: "white",
						}}
					/>
				</div>
			</div>
			<div className="fixed top-60">
				{openEmojiBar && (
					<Picker
						onEmojiClick={onEmojiPick}
						theme={"dark" as Theme}
						skinTonesDisabled={true}
					/>
				)}
			</div>
			<textarea
				placeholder="Type a Message..."
				className="w-full px-6 p-2.5 h-[calc(6.1vh)] rounded-md resize-none bg-slate-900 text-white placeholder:items-center outline-none"
				onChange={(e) => {
					messageTextSet(e.target.value);
				}}
				value={messageText}
				onClick={() => openEmojiBarSet(false)}
			/>
			<button
				type="submit"
				className="w-20 py-2.5 bg-blue-800 text-white hover:border hover:border-slate-500 hover:bg-blue-700 rounded-lg"
			>
				{loading ? (
					<div className="flex items-center justify-center">
						<Oval
							width="25"
							height="25"
							strokeWidth="7"
							color="rgb(54,98,227)"
							secondaryColor="rbg(18,24,38)"
						/>
					</div>
				) : (
					<span>Send</span>
				)}
			</button>
		</form>
	);
};

export default MessageInput;
