import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserGlobalStateContext } from "../hooks/useUserGlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
type DropDownProps = {
	open: (arg: boolean) => void;
	openModal: (arg: boolean) => void;
};
const DropDown = ({ open, openModal }: DropDownProps) => {
	const [, , removeCookie] = useCookies(["authToken"]);
	const { authState, authDispatch } = useAuthContext();
	const { globalDispatch } = useUserGlobalStateContext();
	const navigate = useNavigate();
	const logout = async () => {
		await axios.put(`${BACKEND_URL}/auth/logout`, {
			email: authState.user?.email,
			currentStatus: false,
		});
		globalDispatch({ type: "REMOVE_USER" });
		authDispatch({ type: "LOGOUT" });
		removeCookie("authToken");
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className="flex flex-col border border-slate-500 rounded-md w-56 h-68 p-1 bg-gray-900 shadow-2xl">
			<div className="flex p-2 border-b">
				<span className="text-lg">Options</span>
				<button
					className="ml-auto px-2 py-2 rounded-full hover:bg-slate-600 transition-colors duration-200 outline-none focus-within:bg-slate-600"
					onClick={() => {
						open(false);
					}}
				>
					<IoMdClose />
				</button>
			</div>
			<div
				className="mt-1 p-4 rounded-md hover:bg-blue-700 transition-colors duration-200 outline-none focus-within:bg-blue-700"
				onClick={() => {
					openModal(true);
				}}
			>
				Change username
			</div>
			<div
				className="p-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus-within:bg-blue-700"
				onClick={() => {
					navigate("/avatar");
				}}
			>
				Change avatar
			</div>
			<div
				className="flex items-center justify-between p-4 rounded-md hover:bg-red-800 transition-colors duration-200 focus-within:bg-red-800"
				onClick={() => {
					logout();
				}}
			>
				<span>Logout</span>
				<IoLogOutOutline />
			</div>
		</div>
	);
};

export default DropDown;
