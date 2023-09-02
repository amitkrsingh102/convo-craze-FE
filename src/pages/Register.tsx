import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/logo/convocraze-logo-zip-file/png/logo-no-background.png";
import { BACKEND_URL } from "../utils/config";
import { RotatingLines } from "react-loader-spinner";

const Register = () => {
	const { authState } = useAuthContext();

	const [passwordMismatchStyle, passwordMismatchStyleSet] = useState("");
	const [errorMessage, errorMessageSet] = useState("");
	const [loading, loadingSet] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const input = e.target as HTMLFormElement;
		const username = (input[0] as HTMLInputElement).value;
		const email = (input[1] as HTMLInputElement).value;
		const password = (input[2] as HTMLInputElement).value;
		const confirmPassword = (input[3] as HTMLInputElement).value;

		if (password !== confirmPassword) {
			// alert("password does not match");
			passwordMismatchStyleSet("border-3 border-red-600");
			errorMessageSet("Password does not match");
			return;
		}

		try {
			loadingSet(true);
			await axios.post(`${BACKEND_URL}/auth/register`, {
				username,
				email,
				password,
			});
			loadingSet(false);
			navigate("/login");
		} catch (err) {
			loadingSet(false);
			if (err instanceof AxiosError) {
				errorMessageSet(err.response?.data.message as string);
			} else {
				console.error(err);
			}
		}
	};

	useEffect(() => {
		authState.user && navigate("/");
	}, [authState.user, navigate]);

	return (
		<main className="bg-gray-900">
			{loading ? (
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
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<div className="flex items-center justify-center -mb-2 -mt-4">
								<img
									src={logo}
									alt="cc"
									className="h-20 w-20"
								/>
							</div>
							<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
								Register your Account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit}
							>
								{/* UserName Input */}
								<div>
									<span className="block mb-2 text-sm font-medium text-white">
										Username
									</span>
									<input
										type="text"
										name="username"
										className=" border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none"
										placeholder="username"
										autoComplete="username"
										required
									/>
								</div>
								{/* Email Input */}
								<div>
									<span className="block mb-2 text-sm font-medium text-white">
										Your email
									</span>
									<input
										type="email"
										name="email"
										className=" border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none"
										placeholder="name@company.com"
										autoComplete="email"
										required
									/>
								</div>
								{/* Password Input */}
								<div>
									<span className="block mb-2 text-sm font-medium text-white">
										Password
									</span>
									<input
										type="password"
										name="password"
										placeholder="••••••••"
										className={` border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none ${passwordMismatchStyle}`}
										autoComplete="password"
										required
									/>
								</div>
								{/* Confirm Password */}
								<div>
									<span className="block mb-2 text-sm font-medium text-white">
										Confirm Password
									</span>
									<input
										type="password"
										name="confirm-password"
										placeholder="••••••••"
										className={` border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none ${passwordMismatchStyle}`}
										autoComplete="password"
										required
									/>
								</div>
								{/* Error message */}
								<div
									className={`px-3 py-1 rounded-md bg-red-950 text-[calc(12px)] text-red-500 flex justify-center ${
										errorMessage ? "" : "hidden"
									}`}
								>
									{errorMessage}
								</div>

								{/* Sign In button */}
								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
								>
									Sign up
								</button>
								<p className="text-sm font-light text-gray-400">
									Already have an account ?{"  "}
									<Link
										to="/login"
										className="font-medium text-blue-600 hover:underline "
									>
										Sign In
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default Register;
