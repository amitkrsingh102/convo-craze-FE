import { useAuthContext } from "../hooks/useAuthContext";
import ChatSearch from "./ChatSearch";
import Contacts from "./Contacts";
import ProfileImage from "./ProfileImage";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import DropDown from "./DropDown";
import ChangeUserNameModal from "./ChangeUserNameModal";

const Chats = () => {
	const { authState } = useAuthContext();
	const [openDropDown, openDropDownSet] = useState(false);
	const [openChangeUserNameModal, openChangeUserNameModalSet] =
		useState(false);

	const open = (args: boolean) => {
		openDropDownSet(args);
	};
	const openModal = (args: boolean) => {
		openChangeUserNameModalSet(args);
	};

	return (
		<div className="flex flex-col h-screen text-slate-50 w-1/4 bg-gray-900">
			{openChangeUserNameModal && (
				<ChangeUserNameModal openSet={openModal} />
			)}
			<section className="flex items-center justify-between border-b-2 px-4 py-2.5 border-gray-700">
				<div className="flex items-center gap-2">
					<ProfileImage src={authState.user?.avatarImage as number} />
					<span className="flex flex-col">
						<span className="hover:underline cursor-pointer">
							{authState.user
								? authState.user.userName
								: "username"}
						</span>
						<span>
							{authState.user?.onlineStatus
								? "online"
								: "offline"}
						</span>
					</span>
				</div>
				<div className="overflow-visible z-10 h-10">
					{openDropDown ? (
						<DropDown open={open} openModal={openModal} />
					) : (
						<button
							className="px-2 py-2 rounded-full hover:bg-slate-600 transition-colors duration-200 outline-none focus-within:bg-slate-600"
							onClick={() => {
								open(true);
							}}
						>
							<SlOptions />
						</button>
					)}
				</div>
			</section>
			<section className="px-2 py-4">
				<ChatSearch />
				<Contacts />
			</section>
		</div>
	);
};

export default Chats;
