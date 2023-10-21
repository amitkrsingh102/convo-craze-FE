import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../utils/config";
import logo from "../assets/logo/convocraze-logo-zip-file/png/logo-no-background.png";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
	const [errorMessage, errorMessageSet] = useState("");
	const [, cookieSet] = useCookies(["authToken"]);
	const [loading, loadingSet] = useState(false);
	const navigate = useNavigate();
	const { authState, authDispatch } = useAuthContext();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const input = e.target as HTMLFormElement;
		const email = (input[0] as HTMLInputElement).value;
		const password = (input[1] as HTMLInputElement).value;

		try {
			loadingSet(true);
			const response = await axios.post(`${BACKEND_URL}/auth/login`, {
				email,
				password,
			});
			// console.log(response.data.user);
			authDispatch({
				type: "LOGIN",
				payload: { user: response.data.user },
			});
			cookieSet("authToken", response.data.authToken);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			loadingSet(false);
			navigate("/");
		} catch (err) {
			loadingSet(false);
			if (err instanceof AxiosError) {
				// console.error(err.response?.data.message as string);
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
						<div className="p-6 space-y-4 sm:p-8">
							<div className="flex items-center justify-center -mb-2 -mt-4">
								<img
									src={logo}
									alt="cc"
									className="h-20 w-20"
								/>
							</div>
							<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
								Sign in to your account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit}
							>
								{/* Email Input */}
								<div>
									<span className="block mb-2 text-sm font-medium text-white">
										Your email
									</span>
									<input
										type="email"
										name="email"
										className=" border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none "
										placeholder="for testing : adam@convocraze.com"
										autoComplete="email"
										required
									/>
								</div>
								{/* Password Input */}
								<div>
									<span className="block mb-2 text-sm font-medium text-gray-50">
										Password
									</span>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="test password : admin1234"
										className=" border border-gray-600 text-gray-50 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 outline-none"
										required
										autoComplete="password"
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
								{/*Forget Password */}
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-blue-500 hover:underline">
										Forgot password?
									</span>
								</div>
								{/* Sign In button */}
								<button
									type="submit"
									className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
								>
									Sign in
								</button>
								{/* Navigation */}
								<p className="text-sm font-light text-gray-400">
									Don’t have an account yet?{"  "}
									<Link
										to="/register"
										className="font-medium text-blue-600 hover:underline "
									>
										Sign up
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

export default Login;
