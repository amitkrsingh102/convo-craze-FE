import { useEffect, useState } from "react";
import ProfileImage from "../components/ProfileImage";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../utils/config";
import { RotatingLines } from "react-loader-spinner";

type AvatarProps = {
	img: number;
	selectAvatar: (args: number) => void;
	style: number;
};

const Avatar = ({ img, selectAvatar, style }: AvatarProps) => {
	return (
		<div
			className={`p-1 h-28 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:border hover:border-slate-600 gap-2 ${
				style === img
					? "border bg-slate-800 border-slate-600 hover:bg-slate-900 hover:border-slate-200"
					: ""
			}`}
			onClick={() => {
				selectAvatar(img);
			}}
		>
			<ProfileImage src={img} xl={true} />
			{img === 30 && (
				<span className="text-gray-400 text-sm">Default</span>
			)}
		</div>
	);
};

const SelectAvatar = () => {
	const { authState } = useAuthContext();
	const navigate = useNavigate();
	const [cookies] = useCookies(["authToken"]);
	const [selectedAvatar, selectedAvatarSet] = useState(30);
	const [loading, loadingSet] = useState(false);
	const avatarArr: number[] = [];
	for (let i = 0; i <= 30; i++) {
		avatarArr.push(i);
	}
	const selectAvatar = (args: number) => {
		selectedAvatarSet(args);
	};

	const updateUser = async () => {
		try {
			loadingSet(true);
			await axios.put(
				`${BACKEND_URL}/user/update/avatar`,
				{
					email: authState.user?.email,
					imageNumber: selectedAvatar,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.authToken}`,
					},
				}
			);
			loadingSet(false);
			navigate("/home");
			window.location.reload();
		} catch (err) {
			loadingSet(false);
			if (err instanceof AxiosError) {
				console.error(err.response?.data.message as string);
			} else {
				console.error(err);
			}
		}
	};

	useEffect(() => {
		if (!authState.user) {
			navigate("/login");
		}
	}, [authState.user, navigate]);

	return loading ? (
		<div className="h-screen flex items-center justify-center">
			<RotatingLines
				width="100"
				strokeColor="rgba(54,98,227,1)"
				strokeWidth="3"
				animationDuration="1"
				ariaLabel="loading"
			/>
		</div>
	) : (
		<div className="flex flex-col overflow-scroll overflow-y-scroll scroll-smooth">
			<div className="py-2 flex justify-between items-center px-5">
				<span className="text-3xl text-gray-500">
					Select your Avatar
				</span>
				{selectedAvatar === 30 ? (
					<button
						className="text-gray-400 border border-slate-600 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-slate-300 focus:bg-slate-700 outline-none"
						onClick={() => {
							navigate("/");
						}}
					>
						{"SKIP "}
					</button>
				) : (
					<button
						className="text-gray-400 border border-slate-600 px-2 py-1 rounded-md hover:bg-slate-700 hover:text-slate-300 focus:bg-slate-700 outline-none"
						onClick={() => {
							updateUser();
						}}
					>
						{"NEXT "}
					</button>
				)}
			</div>
			<div className="grid grid-cols-6">
				{avatarArr.map((item) => (
					<Avatar
						img={item}
						key={item}
						selectAvatar={selectAvatar}
						style={selectedAvatar}
					/>
				))}
			</div>
		</div>
	);
};

export default SelectAvatar;
