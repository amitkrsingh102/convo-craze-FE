import ProfileImage from "./ProfileImage";
import { IoCallOutline } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";
import MessageInput from "./MessageInput";
import Message from "./Message";
import { MessageType, UserType } from "../utils/authReducer";
import { useAuthContext } from "../hooks/useAuthContext";
import { compareTimeStrings } from "../utils/timeEval";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

type ChatPropsType = { user: UserType | null };

const Chat = ({ user }: ChatPropsType) => {
	const { authState } = useAuthContext();
	const [openMoreFeaturesModal, openMoreFeaturesModalSet] = useState(false);
	const MessagesArray =
		user &&
		[
			...(authState.user?.receivedMessages?.filter(
				(f) => f.sender?.email === user.email
			) as MessageType[]),
			...(authState.user?.sentMessages?.filter(
				(f) => f.receiver?.email === user.email
			) as MessageType[]),
		].sort((a, b) => compareTimeStrings(b.sendAt, a.sendAt));

	return (
		<>
			{user ? (
				<div className="w-3/4 bg-[url(./src/assets/backgrounds/aug_9_01.jpg)] bg-cover">
					{openMoreFeaturesModal && (
						<div
							className="w-3/4  bg-[rgba(0,0,0,0.8)] absolute z-20 items-center flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
							onClick={() => {
								openMoreFeaturesModalSet(false);
							}}
						>
							<div className="flex items-center justify-center rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
								<div className="p-6 space-y-4 sm:p-8">
									<div className="flex justify-between gap-2">
										<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
											Feature Coming Soon
										</h1>
										<button
											className="ml-auto px-2 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 outline-none focus-within:bg-red-700 text-white"
											onClick={() => {
												openMoreFeaturesModalSet(false);
											}}
										>
											<IoMdClose />
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
					<header className="flex items-center justify-between gap-2 px-5 py-2.5 border-b-2 bg-slate-900">
						<div className="flex gap-3">
							<ProfileImage src={user.avatarImage as number} />
							<span className="flex flex-col text-white">
								<span className="text-2xl hover:underline cursor-pointer hover:text-slate-300">
									{user ? user.userName : "userName"}
								</span>
								{user.onlineStatus ? (
									<span className="text-green-600">
										online
									</span>
								) : (
									<span className="text-gray-400">
										offline
									</span>
								)}
								{user.onlineStatus}
							</span>
						</div>
						<div className="flex gap-2">
							<button
								className="p-3.5 rounded-full hover:bg-slate-800 focus:bg-slate-800 transition-colors duration-200 outline-none"
								onClick={() => {
									openMoreFeaturesModalSet(
										!openMoreFeaturesModal
									);
								}}
							>
								<IoCallOutline
									style={{
										width: "20px",
										height: "20px",
										color: "rgb(54,97,227)",
									}}
								/>
							</button>
							<button
								className="p-3.5 rounded-full hover:bg-slate-800 focus:bg-slate-800 transition-colors duration-200 outline-none"
								onClick={() => {
									openMoreFeaturesModalSet(
										!openMoreFeaturesModal
									);
								}}
							>
								<BsCameraVideo
									style={{
										width: "20px",
										height: "20px",
										color: "rgb(54,97,227)",
									}}
								/>
							</button>
						</div>
					</header>

					<div className="h-[calc(80vh)] overflow-y-scroll scroll-smooth flex flex-col-reverse pb-1 bg-[rgba(0,0,0,0.5)]">
						{MessagesArray?.map((message, idx) => (
							<Message
								key={idx}
								text={message.text}
								time={message.sendAt}
								sender={
									message.receiver?.email !== user?.email
										? true
										: false
								}
							/>
						))}
					</div>
					<MessageInput />
				</div>
			) : (
				<div
					className={`w-3/4 bg-[url(./src/assets/backgrounds/aug_9_01.jpg)] bg-cover`}
				>
					<div className="z-1 bg-[rgba(0,0,0,0.7)] w-full h-full flex flex-col items-center justify-center ">
						<h1 className="text-6xl text-slate-100">
							Welcome to ConvoCraze
						</h1>
						<span className="w-3/4 p-10 text-slate-100 text-m text-justify">
							Connect, chat, and collaborate seamlessly with
							friends, colleagues, and loved ones. Whether it's
							sharing ideas, planning events, or just having a
							friendly conversation, we're here to make your
							communication enjoyable and effortless. Feel free to
							start a new chat, join existing ones, and express
							yourself through text, images, and more. Our
							user-friendly interface and features are designed to
							enhance your chatting experience. Thank you for
							choosing ConvoCraze for your conversations. Let's
							start chatting and stay connected!
						</span>
					</div>
				</div>
			)}
		</>
	);
};
export default Chat;
