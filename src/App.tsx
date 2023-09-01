import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./hooks/useAuthContext";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import SelectAvatar from "./pages/Avatar";
import NotFound from "./pages/404";

const ENDPOINT = "http://localhost:5001";
// eslint-disable-next-line react-refresh/only-export-components
export let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

function App() {
	const { authState, authDispatch } = useAuthContext();
	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("setup", authState.user);

		socket.on("connect", () => console.log("connected..."));
		socket.on("connect_error", () => {
			setTimeout(() => socket.connect(), 5000);
		});

		socket.on("disconnect", () => console.log("server disconnected"));
	}, []);

	useEffect(() => {
		socket.on("userData", (data) => {
			authDispatch({ type: "LOGIN", payload: { user: data } });
		});
	});

	return (
		<main className="bg-slate-900 h-screen w-screen overflow-clip fixed">
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/avatar" element={<SelectAvatar />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</main>
	);
}

export default App;
