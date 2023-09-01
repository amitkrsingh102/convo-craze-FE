import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../utils/config";

type ChangeUserModalProps = {
	openSet: (args: boolean) => void;
};
const ChangeUserNameModal = ({ openSet }: ChangeUserModalProps) => {
	const { authState } = useAuthContext();
	const [errorMessage, errorMessageSet] = useState("");
	const [cookies] = useCookies(["authToken"]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const input = e.target as HTMLFormElement;
		const userName = (input[0] as HTMLInputElement).value;

		if (userName === authState.user?.userName) {
			errorMessageSet("Cannot set old username as new username");
			return;
		}

		try {
			await axios.put(
				`${BACKEND_URL}/user/update/username`,
				{
					email: authState.user?.email,
					newUsername: userName,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.authToken}`,
					},
				}
			);
			window.location.reload();
			openSet(false);
		} catch (err) {
			if (err instanceof AxiosError) {
				errorMessageSet(err.response?.data.message as string);
			} else {
				console.error(err);
			}
		}
	};

	return (
		<div className="w-screen h-screen bg-[rgba(0,0,0,0.8)] absolute z-20 items-center flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<div className="w-1/4 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
				<div className="p-6 space-y-4 sm:p-8">
					<div className="flex justify-between">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
							Change Username
						</h1>
						<button
							className="ml-auto px-2 py-2 rounded-full hover:bg-red-700 transition-colors duration-200 outline-none focus-within:bg-red-700"
							onClick={() => {
								openSet(false);
							}}
						>
							<IoMdClose />
						</button>
					</div>
					<form
						className="space-y-4 md:space-y-6"
						onSubmit={(e) => handleSubmit(e)}
					>
						<div>
							<span className="block mb-2 text-sm font-medium text-white">
								New username :
							</span>
							<input
								type="text"
								name="text"
								className=" border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none "
								placeholder="username"
								autoComplete="username"
								required
							/>
						</div>
						{errorMessage && (
							<div
								className={`px-3 py-1 rounded-md bg-red-950 text-[calc(12px)] text-red-500 flex justify-center`}
							>
								<span>{errorMessage}</span>
							</div>
						)}
						<button
							type="submit"
							className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
						>
							Change
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangeUserNameModal;
