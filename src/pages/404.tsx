import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/convocraze-logo-zip-file/png/logo-no-background.png";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<main className="bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
					<div className="p-6 space-y-4 sm:p-8">
						<div className="flex items-center justify-center -mb-2 -mt-4">
							<img src={logo} alt="cc" className="h-20 w-20" />
						</div>
						<h1 className="flex flex-col text-5xl text-center text-white p-4">
							<span>404</span>
							<span>Page not found !</span>
						</h1>
						<button
							className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
							onClick={() => navigate("/home")}
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
